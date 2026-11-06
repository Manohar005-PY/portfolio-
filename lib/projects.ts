export type ProjectStatus =
  | "functional"
  | "prototype"
  | "in-development"
  | "experiment"
  | "deployed";

export type ProjectCategory = "backend" | "fullstack" | "ml";

export interface TechDecision {
  decision: string;
  reasoning: string;
}

export interface FailureScenario {
  scenario: string;
  behaviour: string;
  verification: string;
}

export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  stack: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  githubUrl: string;
  liveUrl?: string;
  problem: string;
  problemConstraints: { constraint: string; focus: string }[];
  implementation: string[];
  decisions: TechDecision[];
  failureScenarios: FailureScenario[];
  limitations: string[];
  whatItDemonstrates: string;
}

export const projects: Project[] = [
  {
    id: "orderflow",
    slug: "orderflow",
    number: "01",
    title: "OrderFlow",
    tagline: "Transactional commerce & outbox backend",
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "RabbitMQ",
      "Redis",
      "SQLAlchemy",
      "Alembic",
      "Argon2",
    ],
    category: "backend",
    status: "functional",
    githubUrl: "https://github.com/Manohar005-PY/OrderFlow",
    problem:
      "Commerce applications involve multiple connected entities and operations. In distributed architectures, saving order data to PostgreSQL and publishing an event (OrderCreated) to a message broker are separate operations. If the database commits but broker communication fails, downstream services never receive the event—the fatal dual-write problem.",
    problemConstraints: [
      { constraint: "Dual-write atomicity", focus: "Transactional Outbox pattern" },
      { constraint: "Concurrent stock updates", focus: "Pessimistic locking / SKIP LOCKED" },
      { constraint: "Broker delivery guarantee", focus: "At-least-once with idempotent consumer" },
    ],
    implementation: [
      "Designed relational models for products, inventory, orders, order items, outbox events, and payments.",
      "Implemented Transactional Outbox pattern: order creation and event publication are saved in a single database transaction.",
      "Built a relay worker process polling the outbox table via SELECT ... FOR UPDATE SKIP LOCKED to prevent duplicate processing.",
      "Configured RabbitMQ exchange, consumer queues, TTL-backed retry queues, and dead-letter exchanges (DLX).",
      "Secured authentication workflows with Argon2 password hashing and JWT authorization.",
      "Managed versioned schema evolution with Alembic migrations.",
    ],
    decisions: [
      {
        decision: "Transactional Outbox",
        reasoning:
          "Guarantees message publishing atomicity with database writes, eliminating dual-write failure states.",
      },
      {
        decision: "SELECT ... FOR UPDATE SKIP LOCKED",
        reasoning:
          "Enables multiple outbox relay workers to poll pending events concurrently without table lock contention.",
      },
      {
        decision: "RabbitMQ Dead-Letter Exchange (DLX)",
        reasoning:
          "Routes permanently poisoned messages to a dead queue after exponential retry attempts without blocking healthy messages.",
      },
      {
        decision: "Service-level transactions",
        reasoning:
          "Repositories handle data queries only; transaction boundaries are explicitly owned by the service layer.",
      },
      {
        decision: "Argon2 password hashing",
        reasoning:
          "Memory-hard password hashing recommended by OWASP for superior resistance to GPU cracking.",
      },
    ],
    failureScenarios: [
      {
        scenario: "Broker disconnects during order creation",
        behaviour:
          "Order and outbox record commit atomically; relay worker publishes event once broker reconnects.",
        verification: "Outbox persistence test with mock broker outage",
      },
      {
        scenario: "Consumer throws unexpected exception",
        behaviour:
          "Message is routed to retry queue with TTL, then re-queued; sent to DLX if maximum attempts exceeded.",
        verification: "DLX routing test with simulated consumer crash",
      },
      {
        scenario: "Simultaneous purchase of final inventory unit",
        behaviour:
          "Row-level locks prevent overselling; second transaction fails with clean OutOfStockException.",
        verification: "Concurrent stock checkout test",
      },
    ],
    limitations: [
      "Provides at-least-once message delivery, requiring consumers to implement idempotency checks.",
      "Relay worker polling interval creates sub-second propagation latency compared to Change Data Capture (Debezium).",
      "Full distributed tracing (OpenTelemetry) is planned for future observability.",
    ],
    whatItDemonstrates:
      "Advanced distributed data consistency, transactional outbox pattern, message broker resilience, and relational data modeling.",
  },
  {
    id: "flowforge",
    slug: "flowforge",
    number: "02",
    title: "FlowForge",
    tagline: "Distributed background job processing platform",
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "SQLAlchemy"],
    category: "backend",
    status: "prototype",
    githubUrl: "https://github.com/Manohar005-PY/FlowForge",
    problem:
      "Monolithic API performance degrades rapidly when CPU-intensive or slow I/O tasks run synchronously inside the HTTP lifecycle. Built-in FastAPI BackgroundTasks vanish on server restarts because they run in-process memory. Applications require independent, decoupled worker processes backed by durable state.",
    problemConstraints: [
      { constraint: "HTTP request lifecycle limits", focus: "Decoupled async worker processes" },
      { constraint: "In-memory task loss risk", focus: "PostgreSQL persistent state record" },
      { constraint: "Worker crash during task", focus: "Heartbeat detection and retry engine" },
    ],
    implementation: [
      "Built clean REST APIs for asynchronous job submission, progress querying, and cancellation.",
      "Integrated Redis as a lightweight, low-latency task queue broker.",
      "Designed an independent worker loop that polls Redis and executes tasks isolated from the API process.",
      "Persisted job lifecycle states (QUEUED → PROCESSING → COMPLETED / FAILED) in PostgreSQL.",
      "Engineered worker heartbeat tracking to detect dead workers and re-queue abandoned jobs.",
      "Implemented exponential backoff retry handling with configurable attempt limits.",
    ],
    decisions: [
      {
        decision: "Dual storage: PostgreSQL + Redis",
        reasoning:
          "PostgreSQL provides an auditable, durable history of job states; Redis handles fast queue operations.",
      },
      {
        decision: "Independent worker daemon",
        reasoning:
          "Guarantees that long-running jobs never block the API event loop or consume HTTP worker threads.",
      },
      {
        decision: "Heartbeat mechanism",
        reasoning:
          "Workers update a Redis TTL key; absence of heartbeat marks worker offline and triggers job recovery.",
      },
      {
        decision: "Attempt tracking in PostgreSQL",
        reasoning:
          "Retains complete error diagnostics and stack traces across failed attempts for post-mortem analysis.",
      },
    ],
    failureScenarios: [
      {
        scenario: "Worker crashes mid-execution (SIGKILL)",
        behaviour:
          "Heartbeat timeout identifies unacknowledged job; supervisory loop resets job to QUEUED for retry.",
        verification: "Worker termination simulation test",
      },
      {
        scenario: "Job raises uncaught exception repeatedly",
        behaviour:
          "Attempt counter increments until max retries reached, then marks job permanently FAILED.",
        verification: "Retry exhaustion test",
      },
      {
        scenario: "Redis broker temporarily unavailable",
        behaviour:
          "FastAPI rejects submission with 503 Service Unavailable; existing database records remain intact.",
        verification: "Redis downtime injection test",
      },
    ],
    limitations: [
      "Delivery guarantee is at-least-once; tasks must be idempotent to tolerate edge-case duplicate execution.",
      "Heartbeat recovery window incurs a detection delay (configurable, default 30s).",
      "Dynamic worker autoscaling based on queue depth is not yet implemented.",
    ],
    whatItDemonstrates:
      "Asynchronous architecture, decoupled worker daemon design, queue management, and distributed failure recovery.",
  },
  {
    id: "incidenthub",
    slug: "incidenthub",
    number: "03",
    title: "IncidentHub",
    tagline: "Enterprise incident lifecycle REST API",
    stack: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "PostgreSQL",
      "Flyway",
      "JUnit",
      "Mockito",
      "MockMvc",
    ],
    category: "backend",
    status: "functional",
    githubUrl: "https://github.com/Manohar005-PY/IncidentHub",
    problem:
      "Enterprise APIs frequently suffer from fragmented error handling, resulting in inconsistent HTTP response structures that break client integrations, complicate debugging, and leak internal stack traces. Incident management requires strict, predictable state transitions and layered architectural separation.",
    problemConstraints: [
      { constraint: "Fragmented error responses", focus: "Centralized @ControllerAdvice handler" },
      { constraint: "Arbitrary state mutations", focus: "Enforced lifecycle state transitions" },
      { constraint: "Uncontrolled schema drift", focus: "Versioned Flyway database migrations" },
    ],
    implementation: [
      "Engineered an incident lifecycle REST API using Java 17 and Spring Boot 3.",
      "Enforced strict architectural boundaries: decoupled web controllers from service-layer business rules.",
      "Implemented deterministic status transition logic (NEW → INVESTIGATING → RESOLVED → CLOSED).",
      "Created centralized global exception handling via @ControllerAdvice producing uniform RFC 7807 error responses.",
      "Managed PostgreSQL schema evolution using versioned, auditable Flyway migrations.",
      "Built automated testing suites combining unit tests with Mockito and web-layer integration tests with MockMvc.",
    ],
    decisions: [
      {
        decision: "Spring Boot ecosystem",
        reasoning:
          "Standard enterprise backend platform; demonstrates proficiency with Java dependency injection and ORM.",
      },
      {
        decision: "Centralized @ControllerAdvice",
        reasoning:
          "Standardizes error response schemas across the entire API and sanitizes internal exception messages.",
      },
      {
        decision: "Explicit state transition machine",
        reasoning:
          "Prevents illegal mutations (e.g. CLOSED back to NEW without re-opening workflow).",
      },
      {
        decision: "Flyway versioned migrations",
        reasoning:
          "Eliminates manual database schema changes and provides automated verification on application boot.",
      },
    ],
    failureScenarios: [
      {
        scenario: "Client requests invalid status transition",
        behaviour:
          "Service rejects transition; returns 422 Unprocessable Entity with allowed target states.",
        verification: "Service unit test with Mockito",
      },
      {
        scenario: "Resource ID does not exist",
        behaviour:
          "Returns uniform 404 Not Found JSON object matching the standard API error contract.",
        verification: "MockMvc integration test",
      },
      {
        scenario: "Request body fails validation constraints",
        behaviour:
          "MethodArgumentNotValidException caught; returns 400 with specific field-level error messages.",
        verification: "Controller validation test",
      },
    ],
    limitations: [
      "Role-Based Access Control (RBAC) via Spring Security is currently in planning.",
      "Audit event publishing via Kafka or Spring ApplicationEvent is not yet integrated.",
      "Cursor-based pagination for large incident catalogs is planned for next iteration.",
    ],
    whatItDemonstrates:
      "Java backend architecture, Spring Boot conventions, REST API design, exception sanitization, and automated test-driven verification.",
  },
  {
    id: "kage",
    slug: "kage",
    number: "04",
    title: "KAGE",
    tagline: "Full-stack anime library & watch tracker",
    stack: [
      "Next.js",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Google Cloud Run",
      "Cloud SQL",
      "Argon2id",
    ],
    category: "fullstack",
    status: "deployed",
    githubUrl: "https://github.com/Manohar005-PY",
    liveUrl: "https://mykage.in/",
    problem:
      "Deploying a dynamic, data-heavy web application requires balancing infrastructure costs with performance and security. Serverless environments suffer from cold starts that degrade initial page loads. Furthermore, user authentication workflows require rigorous protection against modern web exploits.",
    problemConstraints: [
      { constraint: "Serverless container cold starts", focus: "Container layer optimization & slim base images" },
      { constraint: "Credential security", focus: "Argon2id memory-hard hashing & CSRF tokens" },
      { constraint: "Account hijacking", focus: "Single-use expiring email verification links" },
    ],
    implementation: [
      "Developed a responsive frontend interface using Next.js with server-side rendering and client state.",
      "Implemented a high-performance backend API using FastAPI and PostgreSQL.",
      "Containerized application components using multi-stage Dockerfiles for minimal image footprint.",
      "Deployed to production on Google Cloud Run with managed PostgreSQL on Cloud SQL and Artifact Registry.",
      "Implemented comprehensive security: CSRF middleware, Argon2id password hashing, and secure HTTP-only cookies.",
      "Engineered single-use, cryptographically signed email verification tokens with expiration enforcement.",
    ],
    decisions: [
      {
        decision: "Google Cloud Run serverless containers",
        reasoning:
          "Provides automated scaling, zero-cost idle state, and container portability without Kubernetes overhead.",
      },
      {
        decision: "Argon2id password hashing",
        reasoning:
          "Modern memory-hard hashing standard that protects against both side-channel and GPU-based brute-force attacks.",
      },
      {
        decision: "CSRF token validation on state mutations",
        reasoning:
          "Protects authenticated cookie-based sessions against Cross-Site Request Forgery exploits.",
      },
      {
        decision: "Multi-stage Docker builds",
        reasoning:
          "Reduces container image size by over 60%, drastically cutting Cloud Run cold-start latency.",
      },
    ],
    failureScenarios: [
      {
        scenario: "Expired or reused email verification link clicked",
        behaviour:
          "Single-use token lookup fails in database; user redirected to clean expired link notification.",
        verification: "Token expiration and single-use invalidation tests",
      },
      {
        scenario: "State-changing request submitted without CSRF token",
        behaviour:
          "Security middleware halts execution with 403 Forbidden before reaching business handlers.",
        verification: "Security test suite verifying CSRF enforcement",
      },
      {
        scenario: "Invalid authentication attempt",
        behaviour:
          "Constant-time comparison returns generic 401 Unauthorized to prevent username enumeration.",
        verification: "Authentication failure test",
      },
    ],
    limitations: [
      "Rate limiting on authentication routes is currently handled at application level rather than via Cloud Armor.",
      "Refresh token rotation mechanism is under development.",
    ],
    whatItDemonstrates:
      "Full-stack software engineering, production containerization, Google Cloud infrastructure, and web security defense in depth.",
  },
  {
    id: "supportdesk",
    slug: "supportdesk",
    number: "05",
    title: "SupportDesk",
    tagline: "NLP banking intent classification baseline",
    stack: [
      "Python",
      "Scikit-learn",
      "TF-IDF",
      "Logistic Regression",
      "NumPy",
      "Pandas",
    ],
    category: "ml",
    status: "experiment",
    githubUrl: "https://github.com/Manohar005-PY/SupportDesk",
    problem:
      "Customer support systems require automated triage to route queries effectively. While the industry frequently defaults to large language models (LLMs) or heavy transformers, these introduce high inference latency, high compute overhead, and deployment complexity for classification tasks that can be solved with lightweight baselines.",
    problemConstraints: [
      { constraint: "77 fine-grained banking intents", focus: "High class-overlap text classification" },
      { constraint: "Low-latency inference requirement", focus: "Sub-millisecond TF-IDF vectorization" },
      { constraint: "Model evaluation rigor", focus: "Macro & weighted F1 evaluation across all classes" },
    ],
    implementation: [
      "Trained on the Banking77 benchmark dataset containing 13,082 customer queries across 77 fine-grained intents.",
      "Engineered text feature extraction pipelines testing unigram vs. unigram + bigram representations.",
      "Trained and tuned L2-regularized Logistic Regression classifiers across multiple C values.",
      "Achieved 89.46% validation accuracy and a Macro F1 score of 0.8950, vastly exceeding the 1.3% random baseline.",
      "Conducted error analysis and confusion matrix evaluations across high-overlap intent pairs.",
      "Packaged the pipeline into a reproducible, documented evaluation script with serialized model artifacts.",
    ],
    decisions: [
      {
        decision: "TF-IDF with sublinear TF scaling",
        reasoning:
          "Dampens the effect of repetitive words while capturing domain terminology across financial queries.",
      },
      {
        decision: "Unigram + Bigram ngram_range=(1,2)",
        reasoning:
          "Captures essential two-word banking idioms (e.g., 'card lost', 'transfer pending') that unigrams miss.",
      },
      {
        decision: "Logistic Regression over heavy Neural Nets",
        reasoning:
          "Yields sub-5ms inference on CPU with 89.46% accuracy, proving an LLM is unnecessary for this tier of triage.",
      },
      {
        decision: "Macro-averaged F1 score metric",
        reasoning:
          "Prevents high-frequency classes from masking poor performance on tail intent categories.",
      },
    ],
    failureScenarios: [
      {
        scenario: "Out-of-vocabulary or misspelled domain terms",
        behaviour:
          "Sub-threshold classification confidence falls back to a human-review routing flag.",
        verification: "Confidence thresholding evaluation",
      },
    ],
    limitations: [
      "Linear TF-IDF models cannot understand negation context as effectively as bidirectional transformers.",
      "Performance degrades on queries that significantly deviate in phrasing from the Banking77 distribution.",
    ],
    whatItDemonstrates:
      "Pragmatic machine learning, text feature engineering, disciplined empirical evaluation, and sensible model selection.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const idx = projects.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
}
