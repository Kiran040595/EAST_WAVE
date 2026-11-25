import type { Metadata } from "next";
import ContactExperience from "@/components/contact-experience";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Contact Us | EastWave Private Limited",
  description: "Start a project with EastWave across digital marketing, music and audio, podcast production, or print and merchandise.",
};

const steps = [
  { step: "01", title: "Share your brief", description: "Pick a division, select any optional focus areas, and describe what you are building." },
  { step: "02", title: "Discovery & scope", description: "We review your goals, timeline and deliverables—combining divisions where helpful." },
  { step: "03", title: "Kickoff & production", description: "Move smoothly into strategy, studio recording, post-production or print execution." },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="inner-page">
        <section className="container inner-hero">
          <p className="eyebrow">Let’s talk</p>
          <h1>Let’s create your next big <span>wave.</span></h1>
          <p className="inner-lead">Use the interactive mix builder below to combine divisions, or jump straight into your project brief.</p>
        </section>

        <ContactExperience />

        <section className="container section">
          <div className="section-heading">
            <h2>What happens next.</h2>
            <p>A straightforward path from your first message to creative production.</p>
          </div>
          <div className="other-divisions">
            {steps.map(item => (
              <div key={item.step} className="inner-card process-card">
                <span className="process-step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
