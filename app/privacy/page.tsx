import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Privacy | EastWave Private Limited",
  description: "How EastWave handles project enquiry details and website privacy.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="inner-page">
        <section className="container inner-hero">
          <p className="eyebrow">EastWave Private Limited</p>
          <h1>Your enquiry. Your <span>privacy.</span></h1>
          <p className="inner-lead">We collect only what is needed to respond to your project brief.</p>
        </section>

        <section className="container inner-grid-2">
          <div className="inner-card">
            <h2>Enquiry information</h2>
            <p>Our enquiry forms request your name, email address, selected division, optional focus areas, and project details solely to respond to your request. Please avoid sharing sensitive personal or financial information.</p>
          </div>
          <div className="inner-card">
            <h2>Tracking & delivery transparency</h2>
            <p>This website does not load third-party advertising trackers by default. Enquiry delivery requires a configured server destination; if delivery is not connected, the form notifies you clearly rather than claiming your message was sent.</p>
          </div>
        </section>

        <section className="container section">
          <Link className="button button-primary" href="/contact">Return to Contact <ArrowRight size={17} /></Link>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
