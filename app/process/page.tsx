import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "@/components/site-chrome";
import { processPageContent, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Process | EastWave Private Limited",
  description: "See how EastWave moves from discovery and creative direction to studio production, digital growth and print delivery.",
};

export default function ProcessPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="inner-page">
        <section className="container inner-hero">
          <p className="eyebrow">{processPageContent.eyebrow}</p>
          <h1>{processPageContent.headline}</h1>
          <p className="inner-lead">{processPageContent.summary}</p>
          <div className="inner-actions">
            <Link className="button button-primary" href="/contact">Start a Project <ArrowRight size={17} /></Link>
            <Link className="button button-outline" href="/faq">Read FAQs</Link>
          </div>
        </section>

        <section className="container section">
          <div className="process-grid">
            {processPageContent.phases.map(phase => (
              <div key={phase.step} className="inner-card process-card">
                <span className="process-step">{phase.step}</span>
                <h3>{phase.title}</h3>
                <p>{phase.description}</p>
                <ul className="deliverable-items" style={{ marginTop: 12 }}>
                  {phase.outputs.map(out => (
                    <li key={out}><Check size={14} /><span>{out}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="container section">
          <div className="section-heading">
            <h2>Explore each division’s workflow.</h2>
            <p>Jump into any division for specific deliverables and FAQs.</p>
          </div>
          <div className="process-grid">
            {services.map(s => (
              <Link key={s.id} href={`/services/${s.slug}`} className="inner-card other-div-card">
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <span>View workflow <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
