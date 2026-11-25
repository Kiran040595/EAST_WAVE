"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, Compass, Layers, Mic, Music, Printer, Search, Sparkles, TrendingUp, X } from "lucide-react";
import { services } from "@/lib/content";

interface CommandItem {
  id: string;
  label: string;
  subtitle: string;
  group: "Divisions" | "Pages" | "Quick Actions";
  href: string;
  icon: "digital" | "audio" | "podcast" | "print" | "page" | "action";
}

const ITEMS: CommandItem[] = [
  ...services.map(s => ({
    id: `svc-${s.id}`,
    label: s.title,
    subtitle: s.description,
    group: "Divisions" as const,
    href: `/services/${s.slug}`,
    icon: s.id,
  })),
  { id: "pg-home", label: "Home", subtitle: "Studio Dark homepage & overview", group: "Pages", href: "/", icon: "page" },
  { id: "pg-about", label: "About EastWave", subtitle: "Mission, vision & four-division story", group: "Pages", href: "/about", icon: "page" },
  { id: "pg-studio", label: "The Studio", subtitle: "Session formats, audio & podcast workflow", group: "Pages", href: "/studio", icon: "podcast" },
  { id: "pg-process", label: "Our Process", subtitle: "4-phase journey from brief to launch", group: "Pages", href: "/process", icon: "page" },
  { id: "pg-work", label: "Our Portfolio", subtitle: "Filterable creative concepts across all divisions", group: "Pages", href: "/work", icon: "page" },
  { id: "pg-faq", label: "FAQs", subtitle: "Answers across digital, audio, podcast & print", group: "Pages", href: "/faq", icon: "page" },
  { id: "pg-contact", label: "Start a Project", subtitle: "Open the creative mix builder & enquiry form", group: "Quick Actions", href: "/contact", icon: "action" },
];

function ItemIcon({ kind }: { kind: CommandItem["icon"] }) {
  if (kind === "digital") return <TrendingUp size={15} />;
  if (kind === "audio") return <Music size={15} />;
  if (kind === "podcast") return <Mic size={15} />;
  if (kind === "print") return <Printer size={15} />;
  if (kind === "action") return <Sparkles size={15} />;
  return <Compass size={15} />;
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const reducedMotion = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter(item => item.label.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q) || item.group.toLowerCase().includes(q));
  }, [query]);

  const safeIndex = filtered.length ? Math.min(activeIndex, filtered.length - 1) : 0;

  useEffect(() => {
    if (!open) return;
    const t = requestAnimationFrame(() => inputRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown" && filtered.length) {
        e.preventDefault();
        setActiveIndex(i => (i + 1) % filtered.length);
      } else if (e.key === "ArrowUp" && filtered.length) {
        e.preventDefault();
        setActiveIndex(i => (i - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter" && filtered[safeIndex]) {
        e.preventDefault();
        router.push(filtered[safeIndex].href);
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, filtered, safeIndex, onClose, router]);

  function selectItem(href: string) {
    router.push(href);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmd-backdrop"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.16 }}
          onClick={e => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation"
            className="cmd-panel"
            initial={reducedMotion ? false : { opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: reducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cmd-input-row">
              <Search size={17} className="cmd-search-icon" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Jump to a division, page or action…"
                aria-label="Search EastWave navigation"
              />
              <button className="cmd-close" onClick={onClose} aria-label="Close quick jump">
                <X size={16} />
              </button>
            </div>
            <div className="cmd-list" role="listbox">
              {filtered.length === 0 ? (
                <p className="cmd-empty">No matching destinations. Try “Podcast”, “Digital”, “Audio” or “Print”.</p>
              ) : (
                filtered.map((item, idx) => (
                  <button
                    key={item.id}
                    role="option"
                    aria-selected={idx === safeIndex}
                    className={`cmd-item ${idx === safeIndex ? "active" : ""}`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => selectItem(item.href)}
                  >
                    <span className="cmd-item-icon"><ItemIcon kind={item.icon} /></span>
                    <span className="cmd-item-text">
                      <strong>{item.label}</strong>
                      <span>{item.subtitle}</span>
                    </span>
                    <span className="cmd-item-group"><Layers size={11} /> {item.group}</span>
                    <ArrowRight size={14} className="cmd-item-arrow" />
                  </button>
                ))
              )}
            </div>
            <div className="cmd-footer">
              <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
              <span><kbd>Enter</kbd> Open</span>
              <span><kbd>Esc</kbd> Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
