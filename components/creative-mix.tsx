"use client";

import { useState } from "react";
import { ArrowRight, Check, Mic, Music, Printer, Sparkles, TrendingUp } from "lucide-react";
import { services, type ServiceId } from "@/lib/content";

const icons: Record<ServiceId, React.ReactNode> = {
  digital: <TrendingUp size={17} />,
  audio: <Music size={17} />,
  podcast: <Mic size={17} />,
  print: <Printer size={17} />,
};

function getMixSummary(selected: ServiceId[]): { headline: string; workflow: string[] } {
  if (selected.length === 0) {
    return {
      headline: "Select one or more divisions above to preview how EastWave combines them.",
      workflow: [],
    };
  }
  if (selected.length === 1) {
    const svc = services.find(s => s.id === selected[0])!;
    return {
      headline: `Focused ${svc.title} engagement`,
      workflow: svc.offerings.slice(0, 4) as unknown as string[],
    };
  }
  const has = (id: ServiceId) => selected.includes(id);
  const workflow: string[] = [];
  if (has("podcast") && has("digital")) workflow.push("Studio-recorded episodes cut into vertical reels & promoted via targeted social ads");
  if (has("audio") && has("digital")) workflow.push("Custom brand jingle & sonic identity paired with video edits and digital campaigns");
  if (has("print") && has("digital")) workflow.push("Consistent brand system spanning website, social templates, stationery & merch");
  if (has("podcast") && has("print")) workflow.push("Show branding extended onto guest welcome kits, apparel & event signage");
  if (has("audio") && has("podcast")) workflow.push("Custom show theme music, vocal clarity & broadcast-grade mastering");
  if (has("audio") && has("print")) workflow.push("Release artwork, merch & promotional collateral aligned with your audio launch");
  return {
    headline: `Unified ${selected.length}-division creative pipeline`,
    workflow: workflow.slice(0, 4),
  };
}

export default function CreativeMix({ onApplyMix }: { onApplyMix?: (serviceValue: string, summaryText: string) => void }) {
  const [selected, setSelected] = useState<ServiceId[]>(["digital", "podcast"]);

  function toggle(id: ServiceId) {
    setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  }

  const mix = getMixSummary(selected);
  const serviceValue = selected.length === 1 ? selected[0] : "general";
  const summaryText = selected.length
    ? `Selected EastWave mix: ${selected.map(id => services.find(s => s.id === id)?.title).join(" + ")}.`
    : "";

  return (
    <div className="mix-builder">
      <div className="mix-header">
        <div>
          <p className="eyebrow">Interactive scope builder</p>
          <h2>Build your creative mix.</h2>
        </div>
        <span className="mix-badge"><Sparkles size={14} /> {selected.length} selected</span>
      </div>

      <div className="mix-tiles">
        {services.map(s => {
          const active = selected.includes(s.id);
          return (
            <button
              type="button"
              key={s.id}
              className={`mix-tile ${active ? "active" : ""}`}
              aria-pressed={active}
              onClick={() => toggle(s.id)}
            >
              <span className="mix-tile-top">
                <span className="mix-tile-icon">{icons[s.id]}</span>
                <span className="mix-check">{active && <Check size={13} />}</span>
              </span>
              <strong>{s.title}</strong>
              <span>{s.description}</span>
            </button>
          );
        })}
      </div>

      <div className="mix-output">
        <div className="mix-output-copy">
          <h3>{mix.headline}</h3>
          {mix.workflow.length > 0 && (
            <ul>
              {mix.workflow.map(item => (
                <li key={item}><Check size={14} /><span>{item}</span></li>
              ))}
            </ul>
          )}
        </div>
        {onApplyMix && selected.length > 0 && (
          <button
            type="button"
            className="button button-primary"
            onClick={() => onApplyMix(serviceValue, summaryText)}
          >
            Use this mix in brief <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
