export interface NoteSection {
  heading: string;
  paragraphs: string[];
  codeBlock?: {
    language: string;
    code: string;
    filename?: string;
  };
  callout?: string;
}

export interface Note {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  tags: string[];
  sections: NoteSection[];
  takeaways: string[];
}

export const notes: Note[] = [
  {
    slug: "sqlalchemy-transactions",
    title: "Understanding transaction boundaries in SQLAlchemy",
    summary:
      "Why transaction ownership matters, how flush differs from commit, and how to structure database operations around business workflows.",
    category: "Databases",
    readingTime: "8 min read",
    publishedAt: "2026-10",
    tags: ["Python", "SQLAlchemy", "PostgreSQL"],
    takeaways: [
      "Repositories must never call session.commit() — committing belongs strictly to the service layer.",
      "session.flush() writes SQL changes to the transaction buffer and populates generated IDs without committing.",
      "The Transactional Outbox pattern depends on saving business entities and outbox events within the exact same database transaction boundary.",
    ],
    sections: [
      {
        heading: "01 / The Motivation: Where does a transaction belong?",
        paragraphs: [
          "When starting out with SQLAlchemy, it is common to sprinkle session.commit() inside repository methods. A create_order method saves an order and commits. A reserve_inventory method updates stock and commits. However, this repository-level commit anti-pattern shatters transaction atomicity as soon as a multi-step business workflow emerges.",
          "In OrderFlow, creating an order involves validating item availability, decrementing inventory quantities, inserting the order row, creating order item line records, and writing an outbox event. If the inventory decrement succeeds and commits, but the outbox insert subsequently fails, the database is left in a corrupted, half-applied state.",
        ],
        callout:
          "Rule of thumb: A repository is an abstraction over a collection of records. Collections do not decide when an application transaction is complete; business workflows in the service layer do.",
      },
      {
        heading: "02 / The crucial difference: flush() vs commit()",
        paragraphs: [
          "Understanding the distinction between flush() and commit() is fundamental in SQLAlchemy. A flush communicates pending object state changes to the database by executing INSERT, UPDATE, and DELETE SQL statements within the active transaction. Crucially, it does NOT end the transaction.",
          "This means PostgreSQL assigns primary keys (e.g. SERIAL or UUID), generates timestamps, and evaluates foreign key constraints, while the changes remain completely invisible to other concurrent transactions (under Read Committed isolation).",
        ],
        codeBlock: {
          language: "python",
          filename: "services/order_service.py",
          code: `# Correct: Service-owned transaction boundary
class OrderService:
    def __init__(self, session: Session, order_repo: OrderRepository, outbox_repo: OutboxRepository):
        self.session = session
        self.order_repo = order_repo
        self.outbox_repo = outbox_repo

    def create_order(self, customer_id: str, items: list[OrderItemCreate]) -> Order:
        with self.session.begin():  # Manages BEGIN and COMMIT / ROLLBACK
            order = self.order_repo.add(customer_id=customer_id)
            self.session.flush()  # Flushes to DB: order.id is now generated and accessible!

            for item in items:
                self.order_repo.add_item(order_id=order.id, item=item)

            # Atomic outbox write within the same transaction
            self.outbox_repo.add_event(
                event_type="OrderCreated",
                payload={"order_id": str(order.id), "customer_id": customer_id}
            )
            # Transaction commits automatically at exit of context manager`,
        },
      },
      {
        heading: "03 / The debugging war story: Premature commit side effects",
        paragraphs: [
          "During early OrderFlow development, an intermittent bug occurred: orders were created with missing line items when downstream payment validation failed. Investigation revealed that an internal repository helper was committing after inserting the parent order.",
          "When the payment gateway validation threw an exception 50ms later, the subsequent rollback only rolled back the uncommitted line items, leaving an orphaned, empty order in the database. Refactoring all commits into the top-level service context manager resolved the bug completely.",
        ],
        callout:
          "Lesson learned: Always treat session.commit() as a rare, top-level operation. Repositories should only add, delete, and query.",
      },
    ],
  },
  {
    slug: "background-job-lifecycle",
    title: "Designing a background job lifecycle",
    summary:
      "How to model job state, track execution attempts, and handle worker failures in a distributed background processing system.",
    category: "Background Processing",
    readingTime: "7 min read",
    publishedAt: "2026-11",
    tags: ["Python", "Redis", "Architecture"],
    takeaways: [
      "In-memory task queues (like FastAPI BackgroundTasks) vanish during container restarts; durable state belongs in PostgreSQL.",
      "Redis is an exceptional, low-latency coordination broker, but should be treated as ephemeral queue transport.",
      "Distributed retries must track attempt counters and failure diagnostics to distinguish transient network blips from poison payloads.",
    ],
    sections: [
      {
        heading: "01 / The Vulnerability of In-Process Background Tasks",
        paragraphs: [
          "FastAPI provides a BackgroundTasks utility that executes functions after returning an HTTP response. While convenient for trivial tasks, relying on it for mission-critical jobs in cloud environments (like Cloud Run or Kubernetes) creates severe reliability risks.",
          "Because in-process tasks live entirely in application RAM, any autoscaling downscale, container restart, or unexpected unhandled exception immediately kills the task without a trace. The client receives a 200 OK, but the work never finishes.",
        ],
      },
      {
        heading: "02 / Modeling the Job State Machine in FlowForge",
        paragraphs: [
          "To solve this, FlowForge separates job tracking from job execution. The job state machine is explicitly modeled with discrete lifecycle stages: QUEUED, PROCESSING, COMPLETED, and FAILED.",
          "PostgreSQL stores the durable state machine record, execution attempts, timestamps, and error traces. Redis acts strictly as the high-throughput queue transport notifying workers of work to claim.",
        ],
        codeBlock: {
          language: "python",
          filename: "workers/execution_loop.py",
          code: `def process_next_job(redis_client: Redis, db_session: Session):
    # Blocking pop from Redis queue with 5-second timeout
    job_payload = redis_client.blpop("flowforge:job_queue", timeout=5)
    if not job_payload:
        return

    job_id = parse_job_id(job_payload)
    job = db_session.query(Job).filter(Job.id == job_id).with_for_update().first()

    try:
        job.status = JobStatus.PROCESSING
        job.attempts += 1
        job.started_at = datetime.utcnow()
        db_session.commit()

        # Execute isolated worker payload
        result = execute_task(job.task_name, job.parameters)

        job.status = JobStatus.COMPLETED
        job.result = result
        job.completed_at = datetime.utcnow()
        db_session.commit()
    except Exception as exc:
        db_session.rollback()
        handle_job_failure(job, exc, db_session, redis_client)`,
        },
      },
      {
        heading: "03 / Worker Heartbeats and Failure Recovery",
        paragraphs: [
          "What happens if a worker suffers a hard crash (e.g. OOM killed or SIGKILL) while processing a job? Without a recovery mechanism, the job would remain stuck in PROCESSING forever.",
          "FlowForge workers send periodic heartbeat signals to Redis with a 30-second TTL. A background supervisor checks for active jobs whose assigned worker heartbeat has expired, resetting the job status back to QUEUED and incrementing the retry counter.",
        ],
        callout:
          "Architecture trade-off: Heartbeat recovery provides at-least-once execution guarantees. Workers must ensure tasks are idempotent to prevent side-effects if a task is re-run after a timeout.",
      },
    ],
  },
  {
    slug: "spring-boot-testing",
    title: "Testing service and controller layers in Spring Boot",
    summary:
      "Using JUnit, Mockito, and MockMvc to write meaningful tests for Spring Boot applications without an overloaded test context.",
    category: "Java",
    readingTime: "6 min read",
    publishedAt: "2026-11",
    tags: ["Java", "Spring Boot", "Testing"],
    takeaways: [
      "Avoid annotating every test with @SpringBootTest; it starts the entire application context and slows test suites to a crawl.",
      "Use @WebMvcTest for controller validation and HTTP contract tests; use pure Mockito unit tests for service business rules.",
      "Automated testing of centralized @ControllerAdvice ensures error payloads conform strictly to RFC 7807 specifications.",
    ],
    sections: [
      {
        heading: "01 / The Performance Trap of @SpringBootTest",
        paragraphs: [
          "In many beginner Spring Boot codebases, developers slap @SpringBootTest on every test class. While this verifies the full Spring wiring, it means Hibernate connects to the database, Flyway runs migrations, and every bean is instantiated for even simple unit checks. As the application grows, test suites take minutes instead of seconds to run.",
          "In IncidentHub, testing was split into two focused, high-speed layers: pure Mockito unit tests for service-layer lifecycle rules, and targeted @WebMvcTest slice tests for HTTP endpoints.",
        ],
      },
      {
        heading: "02 / Verifying State Transitions with Mockito",
        paragraphs: [
          "Service tests should run in milliseconds without any Spring context overhead. By using MockitoExtension and @Mock annotations on the repository, we can verify that illegal status transitions are rejected before touching persistence.",
        ],
        codeBlock: {
          language: "java",
          filename: "src/test/java/IncidentServiceTest.java",
          code: `@ExtendWith(MockitoExtension.class)
class IncidentServiceTest {

    @Mock
    private IncidentRepository incidentRepository;

    @InjectMocks
    private IncidentService incidentService;

    @Test
    void shouldRejectInvalidStateTransition_FromNewToClosed() {
        // Arrange: Existing incident in NEW status
        UUID incidentId = UUID.randomUUID();
        Incident incident = new Incident("DB Outage", IncidentStatus.NEW);
        when(incidentRepository.findById(incidentId)).thenReturn(Optional.of(incident));

        // Act & Assert: Direct transition to CLOSED without resolution must throw
        IllegalStateTransitionException exception = assertThrows(
            IllegalStateTransitionException.class,
            () -> incidentService.updateStatus(incidentId, IncidentStatus.CLOSED)
        );

        assertEquals("Cannot transition from NEW directly to CLOSED", exception.getMessage());
        verify(incidentRepository, never()).save(any());
    }`,
        },
      },
      {
        heading: "03 / Testing HTTP Error Contracts with MockMvc",
        paragraphs: [
          "Using @WebMvcTest(IncidentController.class) loads only the web layer (Fast and lightweight). We test that @Valid triggers 400 Bad Request on invalid payloads, and that our @ControllerAdvice exception handler catches custom business exceptions to produce standardized JSON error responses.",
        ],
        callout:
          "Outcome: The complete IncidentHub test suite runs in under 3.5 seconds on local development machines, encouraging constant test execution during development.",
      },
    ],
  },
];

export function getNoteBySlug(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}
