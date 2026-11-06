import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

const spotlight = projects.slice(0, 3);
const moreProjects = projects.slice(3);

export function ProjectList() {
  return (
    <section id="work" className="work-section" aria-labelledby="work-heading">
      <div className="container-main">
        <div className="work-heading">
          <div><p className="section-label">SELECTED WORK</p><h2 id="work-heading">Projects with a real problem behind them.</h2></div>
          <p>I use projects to learn the difficult parts: failed messages, concurrent writes, worker crashes, validation, and trade-offs.</p>
        </div>

        <div className="spotlight-grid">
          {spotlight.map((project, index) => (
            <article key={project.id} className={`spotlight-card spotlight-card-${index + 1}`}>
              <div className="spotlight-topline"><span>{project.number} / {project.category}</span><span>{project.status.replace("-", " ")}</span></div>
              <h3>{project.title}</h3>
              <p className="spotlight-tagline">{project.tagline}</p>
              <div className="spotlight-content">
                <div><span className="mini-label">THE PROBLEM</span><p>{project.problemConstraints[0].constraint}</p></div>
                <div><span className="mini-label">WHAT I BUILT</span><p>{project.implementation[1]}</p></div>
              </div>
              <div className="spotlight-footer">
                <div className="stack-list">{project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div>
                <Link href={`/projects/${project.slug}`} aria-label={`Read ${project.title} case study`}>Read case study <ArrowUpRight size={17} /></Link>
              </div>
            </article>
          ))}
        </div>

        <div className="more-work">
          {moreProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="more-work-row">
              <span>{project.number}</span>
              <div><strong>{project.title}</strong><p>{project.tagline}</p></div>
              <span className="more-work-stack">{project.stack.slice(0, 3).join(" · ")}</span>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
