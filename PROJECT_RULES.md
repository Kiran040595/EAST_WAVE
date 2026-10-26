# EastWave Website — Project Rules

Status: Studio Dark direction selected by the user.
Date: 26 October 2026.

## 1. Primary goal and source of truth

Build a responsive, functional website that closely reproduces the approved Studio Dark mockup. Visual fidelity is the primary goal; animation supports that goal and must not change its composition.

Authoritative local references:
- `Eastwave premium dark studio homepage.png`: approved desktop and mobile visual reference.
- `pdf.pdf`: original EastWave brand artwork and logo.
- `logo-page.png`: rendered preview of that artwork.
- This document: implementation constraints and the supplied business requirements.

Use explicit later user instructions to resolve conflicts. The original logo governs brand identity, the mockup governs layout, and this document governs functionality and implementation. Generated text errors, illustrative portfolio claims, and the mockup's outdated footer year are not requirements to reproduce. Do not present generated studio photos as evidence of an actual facility.

Do not redesign the homepage, switch to the earlier light concept, change the section order, replace the cinematic collage with a generic illustration, or introduce a different visual style without user direction. Extend the approved visual system to inner pages.

## 2. Company and positioning

Company: EastWave Private Limited.
Positioning: Creative, Digital & Media Solutions Company.
Four divisions: Digital Marketing; Music & Audio; Podcast Production; Print & Merchandise.
Logo tagline: Vision. Innovation. Impact.
Supporting positioning line: Where Creativity Meets Digital Growth.
Hero headline: Your next big wave starts here.
Hero support: Digital marketing, audio, podcasts and print. One creative partner.

Present a unified company with dedicated space for each division. Audience includes startups, businesses, corporate clients, educational institutions, NGOs, musicians, creators, podcasters, event organisers, entrepreneurs and personal brands in India and international markets. Do not invent contact details, addresses, prices, client names, achievements, case-study results or testimonials.

Mission: Empower businesses, creators and organisations with creative, digital and media solutions that strengthen brands, expand reach and support sustainable growth.
Vision: Become a trusted creative and digital solutions partner in India and international markets by combining technology, creativity and innovation.

## 3. Technology decisions

Required baseline:
- Next.js App Router with React and TypeScript.
- Tailwind CSS with shared CSS custom properties/design tokens.
- Motion (`motion/react`) for interactive and entrance animations.
- Semantic server-rendered page content; isolate interactive client components.
- Typed validated server-side enquiry handling. Keep secrets on the server.

Choose compatible stable dependency versions at implementation time and retain the lockfile. Do not introduce another frontend framework or UI template that alters the design.

Conditional, not baseline:
- React Three Fiber + Drei + Three.js only for a specifically chosen genuine 3D hero element. Mouse tilt of an image does not require WebGL. A 3D model, asset quality, loading strategy and mobile fallback must be agreed before replacing the approved collage.
- GSAP + ScrollTrigger only for a concrete advanced coordinated scroll sequence beyond the chosen Motion implementation. Do not install both animation systems for overlapping effects or let them control the same element properties.
- Sanity CMS if editorial updates are required. It is an optional future content layer, not a requirement to start.
- Enquiry delivery provider, hosting, analytics IDs and any database remain implementation decisions; do not fabricate configured integrations. A separate Java backend or database is not required solely for this brochure website.

## 4. Colour system

These are implementation targets derived from the visual direction, not certified sampled values from the source logo. Preserve the original logo colours within its asset.

| Token | Value | Use |
| --- | --- | --- |
| background | #071E23 | Main midnight teal canvas |
| surface | #103237 | Studio sections and dark panels |
| surface-raised | #14383D | Cards and form surfaces |
| teal | #14777B | Secondary accents |
| turquoise | #2CB6BA | Fine wave lines and restrained highlights |
| orange | #FF7900 | Primary actions, active states and selected words |
| foreground | #F8F7F2 | Warm off-white headings |
| text-muted | #B8CBCD | Supporting copy; check contrast |
| border | #245056 | Fine dividers and panel outlines |

Keep every page dark, including mobile, navigation, forms and footer. Use orange sparingly; do not flood backgrounds with orange. Avoid purple gradients, neon glows, excessive glass effects and unrelated accent colours. Green is reserved for the WhatsApp affordance where appropriate. Validate final foreground/background combinations for accessible contrast; adjust secondary text or button text while retaining the visual character.

## 5. Logo and typography

Use the original logo from pdf.pdf. Preserve the wave/sun geometry, proportions and wordmark; do not recreate it with text, emoji, CSS or generated artwork. Prepare a transparent production asset from the original, preferably vector where available. The white page surrounding the logo is not part of the website logo treatment.

Use an authentic reversed/approved dark-background variant where available. Do not assume the mockup's white wordmark is an approved logo variant; if the original cannot remain legible, resolve a proper variant with the user. Maintain clear space and consistent desktop/mobile sizing.

Typography direction: premium modern sans serif, strong compact headings, clear readable body text. Exact font is not established by the generated reference. Start with a close candidate such as Manrope and verify letter shapes, wrapping and density against the mockup before freezing tokens. Use a single restrained family with necessary weights. Never put the actual page headings or body copy inside images.

## 6. Homepage composition — preserve this order

1. Header: logo left; Home, About, Services, Work, Contact; orange Let's Talk action. Thin active navigation indicator. Mobile logo and hamburger menu.
2. Hero: two columns on desktop. Left eyebrow CREATIVE. DIGITAL. MEDIA.; approved headline with wave in orange; supporting copy; Start a Project and outlined Explore Our Work. Right cinematic collage: large microphone, brand stationery, podcast camera. Fine decorative wave lines. Mobile stacks copy/actions before collage.
3. Slim division divider: DIGITAL / AUDIO / PODCAST / PRINT.
4. Services: heading Four services. One creative partner.; short supporting copy; four equal desktop photo cards in the approved category order. Mobile compact stacked image/text rows, matching the reference rather than retaining four tiny columns.
5. Studio spotlight: wide dark panel. Studio photograph left on desktop, Make yourself heard. heading, short copy, sound preview and Explore the Studio right. Mobile photo above content. No automatic audio playback.
6. Portfolio: Ideas made real.; filters All Work, Digital, Audio, Podcast, Print; two prominent project tiles initially, including a video tile. Responsive stacked tiles on mobile.
7. Enquiry: wave photography and Let's create your next big wave. at left; form at right. Fields Name, Email, Service, Tell us about your project; orange Send Enquiry button. Stack on mobile.
8. Footer: authentic logo, tagline, navigation, verified social destinations and legal links. Use current year. Floating WhatsApp control must not cover form controls or footer links.

Keep the dark teal atmosphere, photographic crops, orange focal points, spacing rhythm, modest corner radii and fine borders of the reference. Avoid oversized rounded pills except where the mockup uses them. Do not add unrelated sections to fill space.

## 7. Responsive layout and reusable system

The reference contains two layouts side by side, not one ultra-wide webpage. Recreate desktop and mobile separately; do not embed the board as the website.

Use a centred maximum-width container with fluid gutters, reusable typography/spacing tokens and grid primitives. Freeze actual dimensions through screenshot comparison, not guesses from the full board. Tablet should bridge these layouts naturally. Verify at representative widths of 390, 768 and 1440 CSS pixels and a narrow 320-pixel view. No horizontal page scrolling or clipped text. Images use deliberate object-position values and stable aspect ratios. Preserve image quality without shipping unnecessarily large assets.

## 8. Animation and mouse interaction limits

Default interaction system: CSS transforms + Motion. Effects must be subtle and decorative; content and controls remain available without them.

Initial tuning targets (refine within this restrained range):
- Hero collage tilt: maximum approximately 3 degrees, translation at most 6 pixels. Return smoothly to rest on pointer exit. Keep text outside the tilted layer.
- Background SVG wave parallax: maximum 8 pixels; slow, low amplitude motion. No dense particle field by default.
- Service cards: lift at most 4 pixels, restrained teal border highlight; 180–250 ms transition.
- Buttons: gentle colour/arrow transition; 150–220 ms. Do not move the clickable target away from the pointer.
- Portfolio image zoom: maximum scale 1.03 inside a clipped image container.
- Section reveals: opacity and at most 16 pixels vertical movement, approximately 400–600 ms; reveal once and avoid long stagger delays.

No scroll hijacking, forced cursor replacement, heavy full-screen WebGL, distracting constant particles, large rotations, bouncing text or autoplay media. Preserve normal scrolling and the resting-state mockup composition. Avoid transform conflicts between tilt and reveal by using separate wrappers.

Enable pointer-follow effects only for suitable fine-pointer devices. Touch gets clear pressed/focus states instead of hover dependence. Honour prefers-reduced-motion: disable tilt, parallax and continuous decorative motion. Pause off-screen animation. If later approved, lazy-load WebGL, cap rendering quality, render on demand where practical, and provide a static fallback for unavailable/poor-performing WebGL. A 3D asset must not block the headline or primary CTA.

## 9. Pages and business content

Required pages: Home; About Us; Digital Marketing; Music Studio & Audio Production; Podcast Production; Printing & Merchandising; Our Portfolio; Contact Us. Use a services dropdown or equivalent navigation linking all four divisions.

Digital: social media management, Meta/Google performance advertising, SEO, website development, brand identity, graphic content, video editing/reels, lead generation and AI-powered marketing.
Audio: music/vocal recording, audio editing, music production, voice-over, podcast recording, mixing/mastering, jingles and promotional sound.
Podcast: studio recording, audio/video podcast production, interviews/talk shows, editing/post-production, branding, promotional clips and reels.
Print: business cards/stationery, brochures/flyers/posters, banners/flex, apparel/merchandise, corporate gifts, event branding and custom printing.

Each service page needs a relevant enquiry path with its service preselected. Preserve the same design language on every route.

## 10. Functional requirements

- Service cards and CTAs navigate correctly; mobile menu works with keyboard and touch.
- Portfolio filters operate on structured project data and preserve a stable layout. Galleries and video dialogs have accessible close controls and focus management.
- Audio/video controls use real supplied media; do not ship fake playback timers or waveforms implying unavailable recordings. No autoplay sound.
- Forms have labels, required-field checks, email validation, server-side validation, pending/success/error states and basic spam protection. Confirm a real delivery destination before claiming an enquiry was sent. Do not store personal enquiry data in source files or expose it in logs.
- Use a verified WhatsApp number with URL-encoded, service-aware message text. Keep unknown contact values configurable and out of live links until provided.
- Only show actual social links, address and map location when verified.
- Add descriptive page titles, metadata, canonical URLs once the domain is known, sitemap, robots rules, semantic headings and useful image alt text.
- Integrate analytics/tracking using actual provided IDs and applicable consent configuration. Keep forms usable without tracking scripts.
- Optimise fonts/images, lazy-load below-fold media, avoid layout shifts, use HTTPS and secure server-side configuration at deployment.

## 11. Asset honesty

Mockup logo renderings, stationery and studio images are illustrative. They are not actual client projects, recordings or premises. Prefer separately supplied high-quality source assets; do not crop text-containing areas out of the mockup as production website content. If a generated image is retained as decorative concept art, keep it distinct from factual portfolio claims. Replace illustrative projects with real authorised work before presenting them as completed client work. Do not invent statistics or client logos to enhance the design.

## 12. Implementation and acceptance gates

1. Establish assets, tokens, typography and the static responsive layout first.
2. Compare desktop and mobile screenshots with the corresponding panels of the approved reference. Correct geometry, hierarchy, text wrapping, crop positions, card density, colours and section spacing before adding motion.
3. Add functional navigation, filters, media and enquiries.
4. Add restrained animations and compare again at rest; motion must not hide layout discrepancies.
5. Verify keyboard operation, reduced motion, mobile behaviour, form failure states and real link destinations. Run project type checks, linting and a production build when tooling exists.
6. Inspect layout shift and loading behaviour on mobile, and report any unavailable assets or integrations honestly.

Visual fidelity is not satisfied by using the same colours alone. Do not claim pixel-perfect reproduction without comparison evidence. Exact generated imagery and font details may need production assets or visual adjustment; report meaningful differences rather than silently accepting them.

Definition of done: the built desktop and mobile website recognisably match the approved Studio Dark composition, use the original brand identity, preserve all four service divisions, have working verified interactions, remain readable/accessible, and pass the relevant project checks. Any material deviation must be explicitly agreed with the user.

## Mandatory logo consistency rule

The user's supplied logo-page(1).png / logo-page.png and original PDF logo are the only authorised identity. Use the supplied artwork directly, never an AI-redrawn approximation. Preserve the complete symbol geometry, custom wordmark, tagline, proportions and original colours. This applies to website UI, stationery, merchandise and all imagery. Generate unbranded backgrounds first when necessary; place the actual artwork using deterministic compositing rather than asking image generation to recreate it. Reject any output with an altered logo. Previous generated alternative logos are not approved assets. A white or ivory backing is preferable to changing the logo for contrast. Uniform scaling and perspective placement on physical surfaces are permitted, with the internal design unchanged.

## Approved Three.js enhancement — 26 October 2026

The user explicitly requested Three.js effects. Add a lazily loaded decorative Three.js wave-ribbon scene in the hero wave area while keeping the approved photo collage, original logo, section order and content geometry. Direct Three.js is used; React Three Fiber, Drei and GSAP are not needed for this small effect. Cap rendering at 30 fps and pixel ratio 1.5; suspend it outside the viewport and when the page is hidden. Mobile, coarse pointers, reduced motion, unsupported WebGL and context loss retain static SVG waves. Release GPU resources and event listeners on cleanup. Card pointer highlights and restrained hover arrows are permitted. Do not add dense particles, scroll hijacking, pointer replacement or logo animation. This approval does not authorise a homepage redesign.
