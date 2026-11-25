import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "@/components/site-chrome";
import WorkGrid from "@/components/work-grid";

export const metadata: Metadata = {
  title: "Our Work | EastWave Private Limited",
  description: "Explore illustrative creative concepts across digital marketing, music and audio, podcast production, and print and merchandise.",
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="inner-page">
        <section className="container inner-hero">
          <p className="eyebrow">Our portfolio</p>
          <h1>Ideas made <span>real.</span></h1>
          <p className="inner-lead">A look at creative possibilities across digital, audio, podcast and print. Filter by division or open any concept to explore the direction.</p>
        </section>

        <section className="container portfolio-section section">
          <WorkGrid />
        </section>

        <section className="container section">
          <div className="inner-card inner-cta-band">
            <div>
              <p className="eyebrow">Start your project</p>
              <h2>Ready to create something original?</h2>
            </div>
            <Link className="button button-primary" href="/contact">Let’s Talk <ArrowRight size={17} /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
