import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { aboutContent, services } from "@/lib/content";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "About Us | EastWave Private Limited",
  description: "Learn about EastWave Private Limited — our mission, vision, approach, and four creative, digital, and media divisions.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="inner-page">
        <section className="container inner-hero">
          <p className="eyebrow">{aboutContent.eyebrow}</p>
          <h1>{aboutContent.headline}</h1>
          <p className="inner-lead">{aboutContent.summary}</p>
          <div className="about-story">
            {aboutContent.story.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="inner-actions">
            <Link className="button button-primary" href="/contact">Start a Project <ArrowRight size={17} /></Link>
            <Link className="button button-outline" href="/work">Explore Our Work</Link>
          </div>
        </section>

        <section className="container inner-grid-2">
          <div className="inner-card">
            <p className="eyebrow">Our mission</p>
            <h2>Strengthen brands, expand reach.</h2>
            <p>{aboutContent.mission}</p>
          </div>
          <div className="inner-card">
            <p className="eyebrow">Our vision</p>
            <h2>Trusted partner across markets.</h2>
            <p>{aboutContent.vision}</p>
          </div>
        </section>

        <section className="container section">
          <div className="section-heading">
            <h2>Why EastWave.</h2>
            <p>Where creativity meets digital growth across every touchpoint.</p>
          </div>
          <div className="process-grid">
            {aboutContent.pillars.map((pillar, i) => (
              <div key={pillar.title} className="inner-card process-card">
                <span className="process-step">{`0${i + 1}`}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container section">
          <div className="section-heading">
            <h2>Who we partner with.</h2>
            <p>From early-stage launches to established organisations in India and international markets.</p>
          </div>
          <div className="audience-grid">
            {aboutContent.audience.map(item => (
              <div key={item} className="audience-item">
                <Check size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="container section">
          <div className="section-heading">
            <h2>Four divisions under one roof.</h2>
            <p>Explore each division to see how strategy, studio production and print come together.</p>
          </div>
          <div className="services-grid">
            {services.map(s => (
              <Link className="service-card" key={s.id} href={`/services/${s.slug}`}>
                <div className="service-image">
                  <Image src={s.image} alt={s.title} fill sizes="(max-width: 700px) 28vw, (max-width: 1000px) 44vw, 23vw" />
                </div>
                <div className="service-body">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <ArrowRight className="service-arrow" size={22} />
                </div>
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
