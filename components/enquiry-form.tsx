"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown, LoaderCircle } from "lucide-react";
import { scopeOptions, services } from "@/lib/content";

interface EnquiryFormProps {
  initialService?: string;
  initialMessage?: string;
  onServiceChange?: (service: string) => void;
}

export default function EnquiryForm({ initialService = "", initialMessage = "", onServiceChange }: EnquiryFormProps) {
  const [selectedService, setSelectedService] = useState(initialService);
  const [prevInitial, setPrevInitial] = useState(initialService);
  const [messageText, setMessageText] = useState(initialMessage);
  const [prevMessage, setPrevMessage] = useState(initialMessage);
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [status, setStatus] = useState<{ kind: "idle" | "pending" | "error" | "success"; text: string }>({ kind: "idle", text: "" });
  const reducedMotion = useReducedMotion();

  if (initialService !== prevInitial) {
    setPrevInitial(initialService);
    if (initialService) {
      setSelectedService(initialService);
      setSelectedScopes([]);
    }
  }
  if (initialMessage !== prevMessage) {
    setPrevMessage(initialMessage);
    if (initialMessage) setMessageText(initialMessage);
  }

  const currentService = selectedService;

  function handleServiceSelect(value: string) {
    setSelectedService(value);
    setSelectedScopes([]);
    onServiceChange?.(value);
  }

  function toggleScope(scope: string) {
    setSelectedScopes(prev => (prev.includes(scope) ? prev.filter(s => s !== scope) : [...prev, scope]));
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity() || status.kind === "pending") return;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const payload = {
      ...raw,
      message: selectedScopes.length ? `[Focus: ${selectedScopes.join(", ")}]\n${raw.message || ""}` : raw.message,
    };
    setStatus({ kind: "pending", text: "Sending your enquiry…" });
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "We couldn’t send your enquiry. Please try again.");
      setStatus({ kind: "success", text: result.message });
      form.reset();
      setSelectedService("");
      setMessageText("");
      setSelectedScopes([]);
      onServiceChange?.("");
    } catch (error) {
      setStatus({ kind: "error", text: error instanceof Error ? error.message : "We couldn’t send your enquiry. Please try again." });
    }
  }

  return (
    <form className="enquiry-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          <span className="sr-only">Your name</span>
          <input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your Name" />
        </label>
        <label>
          <span className="sr-only">Your email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="Your Email" />
        </label>
      </div>
      <label className="select-wrap">
        <span className="sr-only">Select a service</span>
        <select name="service" required value={currentService} onChange={e => handleServiceSelect(e.target.value)}>
          <option value="" disabled>Select a Service</option>
          {services.map(s => (
            <option value={s.id} key={s.id}>{s.title}</option>
          ))}
          <option value="general">Something else / multiple services</option>
        </select>
        <ChevronDown size={16} />
      </label>
      <AnimatePresence>
        {currentService && scopeOptions[currentService] && (
          <motion.div
            className="scope-chips"
            initial={reducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <span className="scope-label">Optional focus areas:</span>
            <div className="scope-list">
              {scopeOptions[currentService].map(scope => (
                <button
                  type="button"
                  key={scope}
                  className={`scope-chip ${selectedScopes.includes(scope) ? "selected" : ""}`}
                  aria-pressed={selectedScopes.includes(scope)}
                  onClick={() => toggleScope(scope)}
                >
                  {scope}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <label>
        <span className="sr-only">Tell us about your project</span>
        <textarea name="message" required minLength={10} maxLength={5000} rows={3} value={messageText} onChange={e => setMessageText(e.target.value)} placeholder="Tell us about your project…" />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>Company website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <button className="button button-primary submit-button" disabled={status.kind === "pending"} type="submit">
        {status.kind === "pending" ? (
          <><LoaderCircle className="spin" size={17} /> Sending…</>
        ) : status.kind === "success" ? (
          <><Check size={17} /> Enquiry sent</>
        ) : (
          <>Send Enquiry <ArrowRight size={17} /></>
        )}
      </button>
      {status.text && <p className={`form-status ${status.kind}`} role="status">{status.text}</p>}
      <p className="form-privacy">Your details are used only to respond to your enquiry.</p>
    </form>
  );
}
