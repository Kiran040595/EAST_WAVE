import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import DivisionSwitcher from "@/components/division-switcher";
import EnquiryForm from "@/components/enquiry-form";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "@/components/site-chrome";
import { services } from "@/lib/content";

export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  if (!service) return { title: "Service | EastWave Private Limited" };
  return {
    title: `${service.title} | EastWave Private Limited`,
    description: `${service.description} ${service.detail}`,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  if (!service) notFound();

  const others = services.filter(s => s.id !== service.id);

  return (
    <>
      <SiteHeader />
      <main id="main" className="inner-page division-ambient" data-division={service.id}>
        <div className="container division-switcher-wrap">
          <DivisionSwitcher activeSlug={service.slug} />
        </div>
        <section className="container service-detail-hero">
          <div className="service-detail-copy">
            <Link href="/#services" className="back-link"><ArrowLeft size={15} /> All services</Link>
            <p className="eyebrow">EastWave division</p>
            <h1>{service.title}</h1>
            <p className="inner-lead">{service.tagline}</p>
            <p className="service-overview">{service.overview}</p>
            <ul className="offering-list">
              {service.offerings.map(o => (
                <li key={o}><Check size={17} />{o}</li>
              ))}
            </ul>
            <a className="button button-primary" href="#service-enquiry">
              Start a {service.title} project <ArrowRight size={17} />
            </a>
          </div>
          <div className="service-detail-media">
            <Image src={service.image} alt={service.title} fill sizes="(max-width: 900px) 100vw, 48vw" priority />
            <span className="image-note">Illustrative concept</span>
          </div>
        </section>

        <section className="container section">
          <div className="section-heading">
            <h2>How we work.</h2>
            <p>A clear, four-step production workflow from initial brief to final delivery.</p>
          </div>
          <div className="process-grid">
            {service.process.map(item => (
              <div key={item.step} className="inner-card process-card">
                <span className="process-step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container section">
          <div className="section-heading">
            <h2>Deliverables & capabilities.</h2>
            <p>Everything structured cleanly so your team knows exactly what is produced.</p>
          </div>
          <div className="deliverables-grid">
            {service.deliverables.map(group => (
              <div key={group.title} className="inner-card">
                <h3>{group.title}</h3>
                <ul className="deliverable-items">
                  {group.items.map(item => (
                    <li key={item}><Check size={15} /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="container inner-grid-2">
          <div className="inner-card">
            <p className="eyebrow">Ideal for</p>
            <h2>Who this division serves.</h2>
            <ul className="deliverable-items">
              {service.idealFor.map(item => (
                <li key={item}><Check size={15} /><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <div className="inner-card">
            <p className="eyebrow">Common questions</p>
            <h2>{service.title} FAQs.</h2>
            <div className="faq-list">
              {service.faqs.map(faq => (
                <div key={faq.q} className="faq-item">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container section">
          <div className="section-heading">
            <h2>Explore other divisions.</h2>
            <p>Combine multiple EastWave capabilities under a single creative partner.</p>
          </div>
          <div className="other-divisions">
            {others.map(other => (
              <Link key={other.id} href={`/services/${other.slug}`} className="inner-card other-div-card">
                <h3>{other.title}</h3>
                <p>{other.description}</p>
                <span>View division <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="container contact-section" id="service-enquiry">
          <div className="contact-intro">
            <p className="eyebrow">{service.title}</p>
            <h2>Let’s plan your <span>{service.title.toLowerCase()}</span> project.</h2>
            <p>Your service is pre-selected. Pick any focus areas below and share a few details about what you’re building.</p>
          </div>
          <EnquiryForm initialService={service.id} />
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat selectedService={service.id} />
    </>
  );
}
