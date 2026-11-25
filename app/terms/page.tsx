import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Website Information | EastWave Private Limited",
  description: "Information regarding EastWave Private Limited’s website preview, illustrative concept imagery, and brand artwork.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="inner-page">
        <section className="container inner-hero">
          <p className="eyebrow">EastWave Private Limited</p>
          <h1>Website <span>information.</span></h1>
          <p className="inner-lead">Clarity on concept imagery, brand identity, and upcoming production media.</p>
        </section>

        <section className="container inner-grid-2">
          <div className="inner-card">
            <h2>Illustrative concepts</h2>
            <p>Studio photography, stationery renderings, and portfolio concept cards shown on this site are illustrative visual directions—not completed client case studies or photographs of physical premises—unless explicitly labeled otherwise.</p>
          </div>
          <div className="inner-card">
            <h2>Brand identity</h2>
            <p>The EastWave emblem, wordmark, and tagline (“Vision. Innovation. Impact.”) represent EastWave Private Limited’s official brand identity. Contact destinations and media samples are finalised prior to public launch.</p>
          </div>
        </section>

        <section className="container section">
          <Link className="button button-primary" href="/about">Learn more about EastWave <ArrowRight size={17} /></Link>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
