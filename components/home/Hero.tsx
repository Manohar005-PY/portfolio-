import Link from "next/link";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { siteMetadata } from "@/lib/metadata";

const proofPoints = [
  { label: "ORDERFLOW", detail: "Keeps order writes and events in one transaction." },
  { label: "FLOWFORGE", detail: "Recovers work when a background worker disappears." },
  { label: "SUPPORTDESK", detail: "89.46% validation accuracy across 77 banking intents." },
];

export function Hero() {
  return (
    <section className="intro" aria-label="Introduction">
      <div className="container-main intro-wrap">
        <div className="intro-copy">
          <p className="intro-kicker"><span className="availability-dot" /> Backend developer · Bengaluru, India</p>
          <p className="intro-nameplate">MANOHAR</p>
          <h1>I build software that stays <em>useful</em> when things get complicated.</h1>
          <p className="intro-description">
            I&apos;m a Computer Science student focused on APIs, databases, background jobs, and the engineering decisions that make a system reliable in the real world.
          </p>
          <div className="intro-actions">
            <Link href="/projects" className="intro-primary-link">See my projects <ArrowUpRight size={17} strokeWidth={2.2} /></Link>
            <a href={`mailto:${siteMetadata.email}`} className="intro-email-link"><Mail size={15} /> Let&apos;s talk</a>
          </div>
        </div>

        <aside className="proof-panel" aria-label="Selected proof of work">
          <div className="proof-panel-heading"><span>WHAT I&apos;VE BEEN BUILDING</span><span>2026</span></div>
          {proofPoints.map((point, index) => (
            <div key={point.label} className="proof-point">
              <span>0{index + 1}</span>
              <div><strong>{point.label}</strong><p>{point.detail}</p></div>
            </div>
          ))}
          <Link href="#work" className="proof-more">Scroll for the details <ArrowDown size={15} /></Link>
        </aside>
      </div>
    </section>
  );
}
