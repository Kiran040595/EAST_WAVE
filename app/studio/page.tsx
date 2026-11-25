import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Mic, Music } from "lucide-react";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "@/components/site-chrome";
import { studioPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Studio | EastWave Private Limited",
  description: "Explore EastWave’s audio and podcast production capabilities—video podcasts, vocal recording, mixing, mastering and brand jingles.",
};

export default function StudioPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="inner-page division-ambient" data-division="podcast">
        <section className="container service-detail-hero">
          <div className="service-detail-copy">
            <p className="eyebrow">{studioPageContent.eyebrow}</p>
            <h1>{studioPageContent.headline}</h1>
            <p className="inner-lead">{studioPageContent.summary}</p>
            <div className="inner-actions">
              <Link className="button button-primary" href="/services/podcast-production">
                <Mic size={16} /> Podcast Production <ArrowRight size={17} />
              </Link>
              <Link className="button button-outline" href="/services/music-audio">
                <Music size={16} /> Music & Audio
              </Link>
            </div>
          </div>
          <div className="service-detail-media">
            <Image src="/images/studio.webp" alt="Illustrative podcast studio with walnut acoustic panels and amber lighting" fill sizes="(max-width: 900px) 100vw, 48vw" priority />
            <span className="image-note">Illustrative studio concept</span>
          </div>
        </section>

        <section className="container section">
          <div className="section-heading">
            <h2>Session formats.</h2>
            <p>Tailored workflows for hosts, musicians, voice talent and brand teams.</p>
          </div>
          <div className="other-divisions">
            {studioPageContent.formats.map(format => (
              <div key={format.title} className="inner-card">
                <h3>{format.title}</h3>
                <p style={{ marginTop: 8, marginBottom: 14 }}>{format.description}</p>
                <ul className="deliverable-items">
                  {format.highlights.map(h => (
                    <li key={h}><Check size={15} /><span>{h}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="container section">
          <div className="section-heading">
            <h2>Production standards.</h2>
            <p>Every session is structured for clarity, consistency and multi-platform distribution.</p>
          </div>
          <div className="process-grid">
            {studioPageContent.standards.map((std, i) => (
              <div key={std.title} className="inner-card process-card">
                <span className="process-step">{`0${i + 1}`}</span>
                <h3>{std.title}</h3>
                <p>{std.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container section">
          <div className="inner-card inner-cta-band">
            <div>
              <p className="eyebrow">Plan a session</p>
              <h2>Ready to record your next episode or track?</h2>
            </div>
            <Link className="button button-primary" href="/contact">Book a discovery brief <ArrowRight size={17} /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat selectedService="podcast" />
    </>
  );
}
