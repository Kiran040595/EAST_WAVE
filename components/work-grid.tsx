"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, Play, X } from "lucide-react";
import { workConcepts } from "@/lib/content";

export default function WorkGrid() {
  const [filter, setFilter] = useState("All Work");
  const [activeId, setActiveId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  const activeProject = workConcepts.find(p => p.id === activeId);

  useEffect(() => {
    const modal = dialogRef.current;
    if (activeId && modal && !modal.open) {
      previousFocus.current = document.activeElement as HTMLElement;
      modal.showModal();
    }
    if (!activeId && modal?.open) {
      modal.close();
      previousFocus.current?.focus();
    }
    if (activeId) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [activeId]);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter portfolio">
        {["All Work", "Digital", "Audio", "Podcast", "Print"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={filter === f ? "selected" : ""} aria-pressed={filter === f}>
            {f}
          </button>
        ))}
      </div>
      <div className="portfolio-grid" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {workConcepts
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
                onClick={() => setActiveId(p.id)}
                aria-label={`View ${p.title} concept`}
              >
                <div className="project-image">
                  <Image src={p.image} alt={p.title} fill sizes="(max-width: 700px) 100vw, 48vw" />
                  {p.id === "production" && <span className="video-play"><Play size={32} fill="currentColor" /></span>}
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

      <dialog
        ref={dialogRef}
        className="detail-dialog"
        onCancel={() => setActiveId(null)}
        onClick={e => {
          if (e.target === e.currentTarget) {
            const box = e.currentTarget.getBoundingClientRect();
            if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) setActiveId(null);
          }
        }}
        aria-labelledby="work-dialog-title"
        onClose={() => setActiveId(null)}
      >
        <button className="dialog-close" autoFocus onClick={() => setActiveId(null)} aria-label="Close dialog">
          <X size={23} />
        </button>
        {activeProject && (
          <>
            <div className="dialog-photo project-detail-image">
              <Image src={activeProject.image} alt={activeProject.title} fill sizes="(max-width:700px) 95vw, 720px" />
            </div>
            <div className="dialog-content">
              <p className="eyebrow">Illustrative concept</p>
              <h2 id="work-dialog-title">{activeProject.title}</h2>
              <p>{activeProject.description}</p>
              <Link className="button button-primary" href="/contact">
                Create something like this <ArrowRight size={17} />
              </Link>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
