import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FaqAccordion from "@/components/faq-accordion";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "FAQs | EastWave Private Limited",
  description: "Answers to common questions about EastWave’s digital marketing, music & audio, podcast production, and print & merchandise services.",
};

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="inner-page">
        <section className="container inner-hero">
          <p className="eyebrow">Questions & answers</p>
          <h1>Everything you might want to <span>ask.</span></h1>
          <p className="inner-lead">Filter by topic below, or reach out directly if your project combines multiple divisions.</p>
        </section>

        <section className="container section">
          <FaqAccordion />
        </section>

        <section className="container section">
          <div className="inner-card inner-cta-band">
            <div>
              <p className="eyebrow">Still have questions?</p>
              <h2>Tell us what you’re planning.</h2>
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
