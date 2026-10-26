# EastWave Project Instructions

Read PROJECT_RULES.md before planning, implementing, or reviewing any change in this project.

The primary goal is to reproduce the approved Studio Dark mockup in `Eastwave premium dark studio homepage.png`, including its desktop and mobile compositions. Do not substitute a new design or light theme.

Use the original brand artwork in `pdf.pdf`; `logo-page.png` is a rendered reference. The mockup logo is illustrative and must not replace the original identity.

The approved baseline is Next.js App Router, React, TypeScript, Tailwind CSS, and Motion. Genuine WebGL 3D and GSAP are conditional additions, not default dependencies. Follow the animation limits and visual verification requirements in PROJECT_RULES.md.

Make routine implementation decisions within these rules autonomously. Ask before a material change to the approved visual direction, brand identity, or core stack. Do not treat ordinary fixes or accessibility improvements as design changes requiring approval.

Do not claim the design matches until desktop and mobile screenshots have been compared against the reference. Preserve these instructions when introducing scaffolding or tooling.

Logo consistency is mandatory: use the actual user-supplied PNG/PDF artwork directly everywhere. Never use generated approximations, including in stationery or merchandise photos. Follow the Mandatory logo consistency rule in PROJECT_RULES.md.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
