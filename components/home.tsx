"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Play, Volume2, X } from "lucide-react";
import { projects, services, type ServiceId } from "@/lib/content";
import EnquiryForm from "./enquiry-form";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "./site-chrome";

const HeroWave = dynamic(() => import("./hero-wave"), { ssr: false });

export function Waves({ className = "" }: { className?: string }) {
  return (
    <svg className={`waves ${className}`} viewBox="0 0 1000 160" fill="none" aria-hidden="true" preserveAspectRatio="none">
      {Array.from({ length: 13 }, (_, i) => (
        <path
          key={i}
          d={`M-80 ${75 + i * 5} C 120 ${-70 + i * 7}, 220 ${200 + i * 3}, 450 ${100 + i * 3} S 730 ${-30 + i * 6}, 1080 ${90 + i * 4}`}
          stroke="currentColor"
          strokeWidth=".8"
          opacity={1 - i * 0.045}
        />
      ))}
    </svg>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0 : 0.45 }}
    >
      {children}
    </motion.div>
  );
}

function HeroCollage() {
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 22 });
  const sy = useSpring(py, { stiffness: 90, damping: 22 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-2.5, 2.5]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [2.5, -2.5]);
  const micX = useTransform(sx, [-0.5, 0.5], [-3, 3]);
  const micY = useTransform(sy, [-0.5, 0.5], [2, -2]);
  const printX = useTransform(sx, [-0.5, 0.5], [3, -3]);
  const printY = useTransform(sy, [-0.5, 0.5], [-2, 2]);
  const cameraX = useTransform(sx, [-0.5, 0.5], [2, -2]);
  const cameraY = useTransform(sy, [-0.5, 0.5], [3, -3]);

  return (
    <div
      className="collage-perspective"
      onPointerMove={e => {
        if (reduced || e.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const box = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - box.left) / box.width - 0.5);
        py.set((e.clientY - box.top) / box.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.div className="hero-collage" style={{ rotateX, rotateY }}>
        <motion.div className="hero-mic" style={{ x: micX, y: micY }}>
          <Image src="/images/hero-microphone.webp" alt="Studio microphone with cinematic teal and amber lighting" fill sizes="(max-width: 700px) 55vw, 36vw" priority />
        </motion.div>
        <motion.div className="hero-print" style={{ x: printX, y: printY }}>
          <Image src="/images/portfolio-print.webp" alt="Teal and orange stationery design concept" fill sizes="(max-width: 700px) 40vw, 26vw" priority />
        </motion.div>
        <motion.div className="hero-camera" style={{ x: cameraX, y: cameraY }}>
          <Image src="/images/hero-camera.webp" alt="Camera framing a podcast interview" fill sizes="(max-width: 700px) 40vw, 26vw" priority />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState("All Work");
  const [dialog, setDialog] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const [waveFocus, setWaveFocus] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const main = document.getElementById("main");
    if (!main) return;
    let active: HTMLElement | null = null;
    const clear = () => {
      active?.removeAttribute("data-pointer-active");
      active = null;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const card = event.target instanceof Element ? event.target.closest<HTMLElement>(".service-card, .project-card, .button") : null;
      if (active !== card) {
        clear();
        active = card;
      }
      if (!card) return;
      const bounds = card.getBoundingClientRect();
      const localX = event.clientX - bounds.left;
      const localY = event.clientY - bounds.top;
      card.style.setProperty("--pointer-x", `${localX}px`);
      card.style.setProperty("--pointer-y", `${localY}px`);
      if (card.matches(".service-card, .project-card")) {
        card.style.setProperty("--tilt-x", `${(localX / bounds.width - 0.5) * 2.2}deg`);
        card.style.setProperty("--tilt-y", `${(localY / bounds.height - 0.5) * -2.2}deg`);
      }
      card.dataset.pointerActive = "true";
    };
    const out = (event: PointerEvent) => {
      if (active && (!(event.relatedTarget instanceof Node) || !active.contains(event.relatedTarget))) clear();
    };
    main.addEventListener("pointermove", move, { passive: true });
    main.addEventListener("pointerout", out);
    return () => {
      main.removeEventListener("pointermove", move);
      main.removeEventListener("pointerout", out);
      clear();
    };
  }, [reducedMotion]);

  const activeService = services.find(s => s.id === dialog);
  const activeProject = projects.find(p => p.id === dialog);

  useEffect(() => {
    const modal = dialogRef.current;
    if (dialog && modal && !modal.open) {
      previousFocus.current = document.activeElement as HTMLElement;
      modal.showModal();
    }
    if (!dialog && modal?.open) {
      modal.close();
      previousFocus.current?.focus();
    }
    if (dialog) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [dialog]);

  function enquire(service?: ServiceId) {
    if (service) setSelectedService(service);
    setDialog(null);
    requestAnimationFrame(() =>
      document.getElementById("contact")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      })
    );
  }

  return (
    <>
      <SiteHeader
        onOpenAboutDialog={() => setDialog("about")}
        onOpenProjectDialog={id => setDialog(id)}
        onEnquire={service => enquire(service)}
      />
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Creative. Digital. Media.</p>
            <h1 id="hero-title">
              Your next big<br /><span>wave</span> starts here.
            </h1>
            <p className="hero-description">
              Digital marketing, audio, podcasts and print.<br className="desktop-break" /> One creative partner.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="button button-primary">Start a Project <ArrowRight size={17} /></a>
              <a href="#work" className="button button-outline">Explore Our Work</a>
            </div>
          </div>
          <HeroCollage />
          <HeroWave />
          <Waves className="hero-waves" />
        </section>

        <div className="container division-strip" aria-label="Our four divisions">
          <span />
          <p>Digital <i>/</i> Audio <i>/</i> Podcast <i>/</i> Print</p>
          <span />
        </div>

        <section className="container services-section section" id="services" aria-labelledby="services-title">
          <Reveal>
            <div className="section-heading">
              <h2 id="services-title">Four services. One creative partner.</h2>
              <p>Strategy, storytelling and studio-quality production<br className="desktop-break" /> to help your brand make a lasting impact.</p>
            </div>
            <div className="services-grid">
              {services.map(s => (
                <button className="service-card" key={s.id} onClick={() => setDialog(s.id)} aria-label={`Explore ${s.title}`}>
                  <div className="service-image">
                    <Image
                      src={s.image}
                      alt={
                        s.title === "Digital Marketing"
                          ? "Laptop displaying an illustrative marketing dashboard"
                          : s.title === "Music & Audio"
                          ? "Studio headphones on an audio mixing console"
                          : s.title === "Podcast Production"
                          ? "Broadcast microphone in a podcast setup"
                          : "Printed tote bag, mug and coordinated stationery"
                      }
                      fill
                      sizes="(max-width: 700px) 28vw, (max-width: 1000px) 44vw, 23vw"
                    />
                  </div>
                  <div className="service-body">
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                    <ArrowRight className="service-arrow" size={22} />
                  </div>
                </button>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="container studio-section" id="studio" aria-labelledby="studio-title">
          <Reveal className="studio-panel">
            <div className="studio-image">
              <Image src="/images/studio.webp" alt="Illustrative podcast studio with walnut acoustic panels and amber lighting" fill sizes="(max-width: 700px) 100vw, 58vw" />
              <span className="image-note">Studio concept</span>
            </div>
            <div className="studio-copy">
              <p className="eyebrow">The studio</p>
              <h2 id="studio-title">Make yourself<br /><span>heard.</span></h2>
              <p>A space for bold ideas, clear conversations and unforgettable stories.</p>
              <button
                className="audio-preview"
                onClick={() => setDialog("audio-preview")}
                onPointerMove={e => {
                  if (reducedMotion || e.pointerType !== "mouse") return;
                  const box = e.currentTarget.getBoundingClientRect();
                  setWaveFocus((e.clientX - box.left) / box.width);
                }}
                onPointerLeave={() => setWaveFocus(null)}
                aria-label="About the studio sound preview"
              >
                <span className="play-circle"><Volume2 size={21} /></span>
                <span className="audio-lines" aria-hidden="true">
                  {Array.from({ length: 42 }, (_, i) => {
                    const base = 8 + ((i * 17 + 11) % 29);
                    const pos = i / 41;
                    const dist = waveFocus === null ? 1 : Math.abs(pos - waveFocus);
                    const boost = waveFocus === null ? 0 : Math.max(0, 1 - dist * 4.5) * 14;
                    const active = waveFocus !== null && dist < 0.14;
                    return (
                      <i
                        key={i}
                        className={active ? "active-bar" : undefined}
                        style={{ height: `${Math.round(base + boost)}px` }}
                      />
                    );
                  })}
                </span>
                <span className="audio-label">Audio preview coming soon</span>
              </button>
              <button className="button button-outline" onClick={() => setDialog("podcast")}>Explore the Studio <ArrowRight size={17} /></button>
            </div>
          </Reveal>
        </section>

        <section className="container portfolio-section section" id="work" aria-labelledby="work-title">
          <Reveal>
            <div className="section-heading">
              <h2 id="work-title">Ideas made real.</h2>
              <p>A look at creative possibilities across<br className="desktop-break" /> digital, audio, podcast and print.</p>
            </div>
            <div className="filters" role="group" aria-label="Filter portfolio">
              {["All Work", "Digital", "Audio", "Podcast", "Print"].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={filter === f ? "selected" : ""} aria-pressed={filter === f}>
                  {f}
                </button>
              ))}
            </div>
            <div className="portfolio-grid" aria-live="polite">
              <AnimatePresence mode="popLayout">
                {projects
                  .filter(p => filter === "All Work" || p.tags.includes(filter))
                  .map(p => (
                    <motion.button
                      layout={!reducedMotion}
                      initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
                      transition={{ duration: reducedMotion ? 0 : 0.22 }}
                      className="project-card"
                      key={p.id}
                      onClick={() => setDialog(p.id)}
                      aria-label={`View ${p.title} concept`}
                    >
                      <div className="project-image">
                        <Image
                          src={p.image}
                          alt={
                            p.title === "Brand Identity & Print Collateral"
                              ? "Illustrative teal and orange printed stationery collection"
                              : "Illustrative podcast microphone, headphones and editing monitor"
                          }
                          fill
                          sizes="(max-width: 700px) 100vw, 48vw"
                        />
                        {p.id === "production" && (
                          <span className="video-play"><Play size={32} fill="currentColor" /></span>
                        )}
                      </div>
                      <div className="project-caption">
                        <div>
                          <h3>{p.title}</h3>
                          <p>{p.category}</p>
                        </div>
                        <ArrowRight size={23} />
                      </div>
                    </motion.button>
                  ))}
              </AnimatePresence>
            </div>
            <p className="portfolio-note">Illustrative concepts · Not client projects</p>
          </Reveal>
        </section>

        <section className="container contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-intro">
            <Waves className="contact-waves" />
            <p className="eyebrow">Let’s talk</p>
            <h2 id="contact-title">Let’s create your<br />next big <span>wave.</span></h2>
            <p>Tell us about your project and let’s make it happen together.</p>
          </div>
          <EnquiryForm initialService={selectedService} onServiceChange={setSelectedService} />
        </section>
      </main>

      <SiteFooter onOpenDialog={id => setDialog(id)} />
      <WhatsAppFloat selectedService={selectedService} />

      <dialog
        ref={dialogRef}
        className="detail-dialog"
        onCancel={() => setDialog(null)}
        onClick={e => {
          if (e.target === e.currentTarget) {
            const box = e.currentTarget.getBoundingClientRect();
            if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) setDialog(null);
          }
        }}
        aria-labelledby="dialog-title"
        onClose={() => setDialog(null)}
      >
        <button className="dialog-close" autoFocus onClick={() => setDialog(null)} aria-label="Close dialog">
          <X size={23} />
        </button>
        {activeService ? (
          <>
            <div className="dialog-photo"><Image src={activeService.image} alt="" fill sizes="(max-width:700px) 95vw, 720px" /></div>
            <div className="dialog-content">
              <p className="eyebrow">EastWave services</p>
              <h2 id="dialog-title">{activeService.title}</h2>
              <p>{activeService.detail}</p>
              <ul className="offering-list">
                {activeService.offerings.map(o => <li key={o}><Check size={17} />{o}</li>)}
              </ul>
              <button className="button button-primary" onClick={() => enquire(activeService.id)}>Discuss this service <ArrowRight size={17} /></button>
              <p className="small-note">Images shown are illustrative concepts.</p>
            </div>
          </>
        ) : activeProject ? (
          <>
            <div className="dialog-photo project-detail-image"><Image src={activeProject.image} alt={activeProject.title} fill sizes="(max-width:700px) 95vw, 720px" /></div>
            <div className="dialog-content">
              <p className="eyebrow">Illustrative concept</p>
              <h2 id="dialog-title">{activeProject.title}</h2>
              <p>{activeProject.description}</p>
              <button className="button button-primary" onClick={() => enquire(activeProject.id === "identity" ? "print" : "podcast")}>
                Create something like this <ArrowRight size={17} />
              </button>
            </div>
          </>
        ) : (
          <div className="dialog-content text-dialog">
            <p className="eyebrow">EastWave Private Limited</p>
            <h2 id="dialog-title">
              {dialog === "about"
                ? "One partner. Many possibilities."
                : dialog === "audio-preview"
                ? "Good things are taking shape."
                : dialog === "privacy"
                ? "Your enquiry. Your privacy."
                : "About this website"}
            </h2>
            {dialog === "about" ? (
              <>
                <p>EastWave brings digital growth, creative production, audio, podcasting and print together under one roof, helping businesses, brands, creators and organisations bring their ideas to life.</p>
                <h3>Our mission</h3>
                <p>To empower businesses, creators and organisations with creative, digital and media solutions that strengthen their brands, expand their reach and support sustainable growth.</p>
                <h3>Our vision</h3>
                <p>To become a trusted creative and digital solutions partner in India and international markets through technology, creativity and innovation.</p>
                <button className="button button-primary" onClick={() => enquire()}>Let’s create together <ArrowRight size={17} /></button>
              </>
            ) : dialog === "audio-preview" ? (
              <>
                <p>A studio audio sample hasn’t been added yet. Explore our recording and podcast services, or tell us what you’re planning.</p>
                <p className="small-note">Studio photography is illustrative concept imagery.</p>
                <button className="button button-primary" onClick={() => enquire("audio")}>Discuss an audio project <ArrowRight size={17} /></button>
              </>
            ) : dialog === "privacy" ? (
              <>
                <p>The enquiry form requests your name, email, selected service and project details to respond to your request. Please don’t include sensitive information.</p>
                <p>This preview does not include advertising or analytics trackers. Enquiry delivery must be configured before submissions can be accepted. If delivery is unavailable, the form will tell you and won’t claim your message was sent.</p>
              </>
            ) : (
              <>
                <p>This is the EastWave homepage preview. Photography and portfolio examples are illustrative concepts, not completed client projects or verified photographs of EastWave premises.</p>
                <p>Contact destinations, real media samples and production policies will be completed before launch.</p>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
