import { Award, ArrowUpRight } from "lucide-react";
import { certifications } from "@/lib/certifications";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "Credentials" });

export default function CredentialsPage() {
  return (
    <main className="container-main credentials-page">
      <div className="credentials-intro">
        <p className="section-label">CREDENTIALS</p>
        <h1>Training and certificates.</h1>
        <p>Formal training that complements the work shown in my projects.</p>
      </div>

      <div className="credentials-list">
        {certifications.map((certificate, index) => (
          <article key={certificate.title} className="credential-card">
            <div className="credential-number">0{index + 1}</div>
            <Award size={26} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <p className="credential-issuer">{certificate.issuer}</p>
              <h2>{certificate.title}</h2>
            </div>
            <a href={certificate.href} target="_blank" rel="noopener noreferrer" className="credential-link">
              View certificate <ArrowUpRight size={17} />
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
