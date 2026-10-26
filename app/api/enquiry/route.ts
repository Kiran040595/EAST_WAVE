import { NextResponse } from "next/server";
import { services } from "@/lib/content";
export const runtime = "nodejs";
const requests = new Map<string, { count: number; reset: number }>();
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({message:"Request origin not allowed."},{status:403});
  if (Number(request.headers.get("content-length") || 0) > 16000) return NextResponse.json({message:"Your enquiry is too long."},{status:413});
  let data: Record<string, unknown>;
  try { const body = await request.text(); if (body.length > 12000) return NextResponse.json({message:"Your enquiry is too long."},{status:413}); const parsed = JSON.parse(body); if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error(); data = parsed; } catch { return NextResponse.json({message:"Please send a valid enquiry."},{status:400}); }
  if (typeof data.website === "string" && data.website.trim()) return NextResponse.json({message:"Please try again without the extra website field."},{status:400});
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const service = typeof data.service === "string" ? data.service : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  if(name.length < 2 || name.length > 100 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || ![...services.map(s=>s.id),"general"].includes(service) || message.length < 10 || message.length > 5000) return NextResponse.json({message:"Please check your name, email, service and project details."},{status:400});
  const endpoint = process.env.ENQUIRY_WEBHOOK_URL;
  if (!endpoint) return NextResponse.json({message:"Enquiry delivery isn’t connected yet. Your message has not been sent. Please try again after EastWave adds its contact details."},{status:503});
  try { if(new URL(endpoint).protocol !== "https:") throw new Error(); } catch { return NextResponse.json({message:"Enquiry delivery is temporarily unavailable. Your message has not been sent."},{status:503}); }
  // Best-effort per-instance throttling. Use a shared rate limiter for a multi-instance production deployment.
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now(); for (const [id, record] of requests) if(record.reset < now) requests.delete(id);
  const record = requests.get(key) || {count:0,reset:now+60000};
  if(record.count >= 5) return NextResponse.json({message:"Please wait a minute before sending another enquiry."},{status:429});
  record.count++; requests.set(key,record);
  try {
    const response = await fetch(endpoint, {method:"POST",headers:{"Content-Type":"application/json",...(process.env.ENQUIRY_WEBHOOK_TOKEN ? {Authorization:`Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}`} : {})},body:JSON.stringify({name,email,service,message,source:"eastwave-homepage"}),signal:AbortSignal.timeout(10000)});
    if(!response.ok) throw new Error();
    return NextResponse.json({message:"Thank you. Your enquiry has been sent to EastWave."});
  } catch { return NextResponse.json({message:"We couldn’t confirm delivery. Please try again in a moment."},{status:502}); }
}
