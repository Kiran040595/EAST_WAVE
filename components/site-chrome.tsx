"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, MessageCircle, Mic, Music, Play, Printer, Search, TrendingUp, X } from "lucide-react";
import { aboutContent, projects, services, type ServiceId } from "@/lib/content";
import CommandPalette from "./command-palette";

export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <Link className={`brand ${footer ? "brand-footer" : ""}`} href="/" aria-label="EastWave home">
      <Image src="/images/eastwave-logo.png" alt="EastWave — Vision. Innovation. Impact." width={230} height={220} priority={!footer} />
    </Link>
  );
}

const serviceIcons: Record<ServiceId, ReactNode> = {
  digital: <TrendingUp size={15} />,
  audio: <Music size={15} />,
  podcast: <Mic size={15} />,
  print: <Printer size={15} />,
};

interface SiteHeaderProps {
  onOpenAboutDialog?: () => void;
  onOpenProjectDialog?: (id: string) => void;
  onEnquire?: (service?: ServiceId) => void;
}

export function SiteHeader({ onOpenAboutDialog, onOpenProjectDialog, onEnquire }: SiteHeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [homeSection, setHomeSection] = useState<"home" | "about" | "services" | "work" | "contact">("home");
  const activeSection: "home" | "about" | "services" | "work" | "contact" = isHome
    ? homeSection
    : pathname.startsWith("/about")
    ? "about"
    : pathname.startsWith("/services")
    ? "services"
    : pathname.startsWith("/work")
    ? "work"
    : pathname.startsWith("/contact")
    ? "contact"
    : "home";
  const setActiveSection = setHomeSection;
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scrollScaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });
  const navSpring = reducedMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 420, damping: 32 };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ids = ["home", "services", "work", "contact"] as const;
    const elements = ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id && ids.includes(visible.target.id as (typeof ids)[number])) {
          setHomeSection(visible.target.id as (typeof ids)[number]);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    const onShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);

  const contactHref = isHome ? "#contact" : "/contact";

  return (
    <>
      {!reducedMotion && <motion.div className="scroll-progress" style={{ scaleX: scrollScaleX }} aria-hidden="true" />}
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`} id={isHome ? "home" : undefined}>
        <div className="container header-inner">
          <Logo />
          <nav aria-label="Main navigation" className="desktop-nav" onMouseLeave={() => setHoveredNav(null)}>
            <Link
              className={`nav-item ${activeSection === "home" ? "active" : ""}`}
              href="/"
              aria-current={activeSection === "home" ? "page" : undefined}
              onMouseEnter={() => setHoveredNav("home")}
              onClick={() => isHome && setActiveSection("home")}
            >
              {hoveredNav === "home" && <motion.span layoutId="nav-hover-pill" className="nav-hover-pill" transition={navSpring} />}
              <span className="nav-label">Home</span>
              {activeSection === "home" && <motion.span layoutId="nav-active-bar" className="nav-active-bar" transition={navSpring} />}
            </Link>

            <div className="about-nav" onMouseEnter={() => setHoveredNav("about")}>
              <Link
                className={`nav-item ${activeSection === "about" ? "active" : ""}`}
                href="/about"
                aria-current={activeSection === "about" ? "page" : undefined}
              >
                {hoveredNav === "about" && <motion.span layoutId="nav-hover-pill" className="nav-hover-pill" transition={navSpring} />}
                <span className="nav-label">About <ChevronDown className="nav-chevron" size={12} /></span>
                {activeSection === "about" && <motion.span layoutId="nav-active-bar" className="nav-active-bar" transition={navSpring} />}
              </Link>
              <div className="about-dropdown" role="region" aria-label="About EastWave">
                <p className="dropdown-eyebrow">{aboutContent.eyebrow}</p>
                <h3 className="about-dropdown-title">{aboutContent.headline}</h3>
                <p className="about-dropdown-copy">EastWave brings digital growth, creative production, audio, podcasting and print together under one roof.</p>
                <div className="about-pillars">
                  <div>
                    <strong>Mission</strong>
                    <p>Empower businesses, creators and organisations with creative, digital and media solutions for sustainable growth.</p>
                  </div>
                  <div>
                    <strong>Vision</strong>
                    <p>Become a trusted creative and digital partner in India and international markets through technology and innovation.</p>
                  </div>
                </div>
                <div className="about-dropdown-actions">
                  {onEnquire ? (
                    <button className="button button-primary" onClick={() => onEnquire()}>Let’s create together <ArrowRight size={15} /></button>
                  ) : (
                    <Link className="button button-primary" href="/contact">Let’s create together <ArrowRight size={15} /></Link>
                  )}
                  {onOpenAboutDialog ? (
                    <Link className="about-more-link" href="/about">Full story <ArrowUpRight size={14} /></Link>
                  ) : (
                    <Link className="about-more-link" href="/about">About page <ArrowUpRight size={14} /></Link>
                  )}
                </div>
              </div>
            </div>

            <div className="services-nav" onMouseEnter={() => setHoveredNav("services")}>
              <Link
                className={`nav-item ${activeSection === "services" ? "active" : ""}`}
                href={isHome ? "#services" : "/#services"}
                aria-current={activeSection === "services" ? "page" : undefined}
                onClick={() => isHome && setActiveSection("services")}
              >
                {hoveredNav === "services" && <motion.span layoutId="nav-hover-pill" className="nav-hover-pill" transition={navSpring} />}
                <span className="nav-label">Services <ChevronDown className="nav-chevron" size={12} /></span>
                {activeSection === "services" && <motion.span layoutId="nav-active-bar" className="nav-active-bar" transition={navSpring} />}
              </Link>
              <div className="services-dropdown" role="menu" aria-label="EastWave divisions">
                <p className="dropdown-eyebrow">Four divisions</p>
                {services.map(s => (
                  <Link key={s.id} role="menuitem" className="dropdown-link-item" href={`/services/${s.slug}`}>
                    <span className="dropdown-icon">{serviceIcons[s.id]}</span>
                    <span className="dropdown-text">
                      <strong>{s.title}</strong>
                      <span>{s.description}</span>
                    </span>
                    <ArrowUpRight className="dropdown-arrow" size={14} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="work-nav" onMouseEnter={() => setHoveredNav("work")}>
              <Link
                className={`nav-item ${activeSection === "work" ? "active" : ""}`}
                href={isHome ? "#work" : "/work"}
                aria-current={activeSection === "work" ? "page" : undefined}
                onClick={() => isHome && setActiveSection("work")}
              >
                {hoveredNav === "work" && <motion.span layoutId="nav-hover-pill" className="nav-hover-pill" transition={navSpring} />}
                <span className="nav-label">Work <ChevronDown className="nav-chevron" size={12} /></span>
                {activeSection === "work" && <motion.span layoutId="nav-active-bar" className="nav-active-bar" transition={navSpring} />}
              </Link>
              <div className="work-dropdown" role="menu" aria-label="Featured work concepts">
                <p className="dropdown-eyebrow">Featured concepts</p>
                <div className="work-dropdown-grid">
                  {projects.map(p => (
                    onOpenProjectDialog ? (
                      <button key={p.id} role="menuitem" className="work-dropdown-card" onClick={() => onOpenProjectDialog(p.id)}>
                        <div className="work-dropdown-thumb">
                          <Image src={p.image} alt={p.title} fill sizes="160px" />
                          {p.id === "production" && <span className="work-dropdown-play"><Play size={14} fill="currentColor" /></span>}
                        </div>
                        <strong>{p.title}</strong>
                        <span>{p.category}</span>
                      </button>
                    ) : (
                      <Link key={p.id} role="menuitem" className="work-dropdown-card" href="/work">
                        <div className="work-dropdown-thumb">
                          <Image src={p.image} alt={p.title} fill sizes="160px" />
                          {p.id === "production" && <span className="work-dropdown-play"><Play size={14} fill="currentColor" /></span>}
                        </div>
                        <strong>{p.title}</strong>
                        <span>{p.category}</span>
                      </Link>
                    )
                  ))}
                </div>
                <Link className="work-dropdown-all" href="/work">Explore all work <ArrowRight size={14} /></Link>
              </div>
            </div>

            <Link
              className={`nav-item ${activeSection === "contact" ? "active" : ""}`}
              href={contactHref}
              aria-current={activeSection === "contact" ? "page" : undefined}
              onMouseEnter={() => setHoveredNav("contact")}
              onClick={() => isHome && setActiveSection("contact")}
            >
              {hoveredNav === "contact" && <motion.span layoutId="nav-hover-pill" className="nav-hover-pill" transition={navSpring} />}
              <span className="nav-label">Contact</span>
              {activeSection === "contact" && <motion.span layoutId="nav-active-bar" className="nav-active-bar" transition={navSpring} />}
            </Link>
          </nav>

          <div className="header-actions">
            <button type="button" className="cmd-trigger" onClick={() => setCmdOpen(true)} aria-label="Quick navigation (Ctrl+K)">
              <Search size={14} />
              <span>Quick jump</span>
              <kbd>Ctrl K</kbd>
            </button>
            <Link className="button button-primary header-cta" href={contactHref} onClick={() => isHome && setActiveSection("contact")}>
              Let’s Talk <ArrowRight size={17} />
            </Link>
          </div>
          <button
            className="menu-button"
            ref={menuButtonRef}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                id="mobile-navigation"
                aria-label="Mobile navigation"
                className="mobile-nav"
                initial={reducedMotion ? false : { opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
              >
                <Link className={activeSection === "home" ? "active" : ""} href="/" onClick={() => setMenuOpen(false)}>Home <ArrowRight size={15} /></Link>
                <Link className={activeSection === "about" ? "active" : ""} href="/about" onClick={() => setMenuOpen(false)}>About EastWave <ArrowRight size={15} /></Link>
                <button className="mobile-services-toggle" aria-expanded={mobileServicesOpen} onClick={() => setMobileServicesOpen(!mobileServicesOpen)}>
                  Our Services <ChevronDown className={mobileServicesOpen ? "rotated" : ""} size={15} />
                </button>
                {mobileServicesOpen && (
                  <div className="mobile-services-list">
                    {services.map(s => (
                      <Link key={s.id} href={`/services/${s.slug}`} onClick={() => setMenuOpen(false)}>
                        <span className="dropdown-icon">{serviceIcons[s.id]}</span>
                        <span>{s.title}</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    ))}
                  </div>
                )}
                <Link className={activeSection === "work" ? "active" : ""} href="/work" onClick={() => setMenuOpen(false)}>Our Work <ArrowRight size={15} /></Link>
                <Link className="button button-primary mobile-cta" href={contactHref} onClick={() => setMenuOpen(false)}>Let’s Talk <ArrowRight size={17} /></Link>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}

export function SiteFooter({ onOpenDialog }: { onOpenDialog?: (id: "about" | "privacy" | "terms") => void }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Logo footer />
            <p className="footer-tagline">Vision. Innovation. Impact.</p>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/studio">Studio</Link>
            <Link href="/process">Process</Link>
            <Link href="/work">Work</Link>
            <Link href="/faq">FAQs</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <Link className="footer-connect" href="/contact">Let’s connect <ArrowUpRight size={18} /></Link>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} EastWave Private Limited. All rights reserved.</p>
          <div>
            {onOpenDialog ? (
              <>
                <button onClick={() => onOpenDialog("privacy")}>Privacy</button>
                <span>·</span>
                <button onClick={() => onOpenDialog("terms")}>Website information</button>
              </>
            ) : (
              <>
                <Link href="/privacy">Privacy</Link>
                <span>·</span>
                <Link href="/terms">Website information</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat({ selectedService = "" }: { selectedService?: string }) {
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
  return (
    <a
      className="contact-float"
      href={whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hello EastWave, I’d like to discuss ${services.find(s => s.id === selectedService)?.title || "a project"}.`)}` : "/contact"}
      target={whatsapp ? "_blank" : undefined}
      rel={whatsapp ? "noopener noreferrer" : undefined}
      aria-label={whatsapp ? "Chat with EastWave on WhatsApp" : "Discuss your project"}
    >
      <MessageCircle size={28} />
    </a>
  );
}
