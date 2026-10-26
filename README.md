# EastWave Studio Dark homepage

A local Next.js App Router implementation of the approved homepage. Start with AGENTS.md and PROJECT_RULES.md.

## Run

Use Node.js 22 or newer.

```powershell
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Production: `npm run build`, then `npm start`.

## Checks

```powershell
npm run typecheck
npm run lint
npm run build
```

## Content and assets

- Homepage: components/home.tsx
- Design tokens and responsive layouts: app/globals.css
- Services and concept portfolio data: lib/content.ts
- Original logo and optimised generated photography: public/images
- Source photographs and approved reference remain at the project root.

The logo is the original supplied artwork, cropped only to remove white page margins and uniformly scaled. It uses a white backing for contrast; no generated logo is used. The hero stationery tile intentionally uses the unbranded concept photograph instead of the rejected altered-logo image.

All generated work and studio images remain illustrative. Portfolio concepts are labelled as such. Real audio/video media has not been supplied; media controls display an explanation rather than pretend to play.

## Configure enquiries and contact

Copy .env.example to .env.local and add actual destinations before launch:

- ENQUIRY_WEBHOOK_URL: an HTTPS endpoint accepting POST JSON {name,email,service,message,source}. The form reports success only when this endpoint returns a successful status. Do not use an endpoint that merely acknowledges a queued request unless that constitutes accepted delivery in your workflow.
- ENQUIRY_WEBHOOK_TOKEN: optional server-side bearer token.
- NEXT_PUBLIC_WHATSAPP_NUMBER: verified international number, digits only. When absent, the floating contact button opens the enquiry section instead of a fabricated WhatsApp link.
- NEXT_PUBLIC_SITE_URL: reserved for the final canonical domain; no domain is assumed in this preview.

The API validates input and rejects invalid origins. It has basic honeypot handling and per-instance throttling; add a shared rate limiter and approved privacy/retention policies before a multi-instance public launch. It does not persist enquiry data or log enquiry content. Delivery remains unavailable until configured and clearly returns an error, never a false success.

No analytics, social account destinations or invented contact details are included. The homepage uses same-page navigation and accessible service/about/project dialogs; dedicated inner routes are outside this homepage task.

## Three.js enhancement

The hero's decorative wave area now uses a lazy-loaded Three.js ribbon scene on desktop mouse devices. The approved collage and layout remain intact. It is limited to 30 fps and a device pixel ratio of 1.5, pauses off-screen/in background tabs, and disposes GPU resources on teardown. Static SVG waves remain for touch/mobile, reduced motion or unavailable/lost WebGL contexts. Service and portfolio cards have a subtle pointer highlight. No additional 3D model assets or GSAP are required.

A working local preview can also be started with `npm run preview` at http://127.0.0.1:3005.
