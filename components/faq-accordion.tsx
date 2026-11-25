"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { faqCategories } from "@/lib/content";

export default function FaqAccordion() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openKey, setOpenKey] = useState<string | null>("general-0");
  const reducedMotion = useReducedMotion();

  const visibleGroups = activeCategory === "all" ? faqCategories : faqCategories.filter(c => c.id === activeCategory);

  return (
    <div>
      <div className="filters" role="group" aria-label="Filter FAQ categories">
        <button className={activeCategory === "all" ? "selected" : ""} onClick={() => setActiveCategory("all")} aria-pressed={activeCategory === "all"}>
          All Topics
        </button>
        {faqCategories.map(cat => (
          <button
            key={cat.id}
            className={activeCategory === cat.id ? "selected" : ""}
            onClick={() => setActiveCategory(cat.id)}
            aria-pressed={activeCategory === cat.id}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="faq-groups">
        {visibleGroups.map(group => (
          <section key={group.id} className="faq-group">
            <h2 className="faq-group-title">{group.label}</h2>
            <div className="faq-accordion-list">
              {group.items.map((item, idx) => {
                const key = `${group.id}-${idx}`;
                const isOpen = openKey === key;
                return (
                  <div key={key} className={`faq-accordion-item ${isOpen ? "open" : ""}`}>
                    <button
                      type="button"
                      className="faq-accordion-trigger"
                      aria-expanded={isOpen}
                      onClick={() => setOpenKey(isOpen ? null : key)}
                    >
                      <span>{item.q}</span>
                      <ChevronDown size={17} className="faq-chevron" />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
                          transition={{ duration: reducedMotion ? 0 : 0.2 }}
                          className="faq-accordion-body"
                        >
                          <p>{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
