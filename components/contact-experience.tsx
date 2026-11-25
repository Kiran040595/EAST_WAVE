"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/content";
import CreativeMix from "./creative-mix";
import EnquiryForm from "./enquiry-form";

export default function ContactExperience() {
  const [selectedService, setSelectedService] = useState("");
  const [initialMessage, setInitialMessage] = useState("");

  function handleApplyMix(serviceValue: string, summaryText: string) {
    setSelectedService(serviceValue);
    setInitialMessage(summaryText + "\n\nProject goals: ");
    document.getElementById("contact-brief")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <>
      <section className="container section">
        <CreativeMix onApplyMix={handleApplyMix} />
      </section>

      <section className="container contact-section" id="contact-brief">
        <div className="contact-intro">
          <p className="eyebrow">EastWave Private Limited</p>
          <h2>One creative partner across four divisions.</h2>
          <p>Select a service to reveal tailored focus areas, or choose multiple services if your project spans digital, audio, podcast and print.</p>
          <div className="contact-divisions">
            {services.map(s => (
              <Link key={s.id} href={`/services/${s.slug}`} className="contact-div-link">
                <span>{s.title}</span>
                <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
        <EnquiryForm initialService={selectedService} initialMessage={initialMessage} onServiceChange={setSelectedService} />
      </section>
    </>
  );
}
