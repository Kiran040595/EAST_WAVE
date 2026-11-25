"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Mic, Music, Printer, TrendingUp } from "lucide-react";
import { services, type ServiceId } from "@/lib/content";

const icons: Record<ServiceId, React.ReactNode> = {
  digital: <TrendingUp size={14} />,
  audio: <Music size={14} />,
  podcast: <Mic size={14} />,
  print: <Printer size={14} />,
};

export default function DivisionSwitcher({ activeSlug }: { activeSlug: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <nav className="division-switcher" aria-label="Switch service division">
      {services.map(s => {
        const isActive = s.slug === activeSlug;
        return (
          <Link key={s.id} href={`/services/${s.slug}`} className={`division-tab ${isActive ? "active" : ""}`} aria-current={isActive ? "page" : undefined}>
            {isActive && (
              <motion.span
                layoutId="division-pill"
                className="division-tab-pill"
                transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span className="division-tab-inner">
              {icons[s.id]}
              <span>{s.title}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
