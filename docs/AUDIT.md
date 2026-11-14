# Phase 0 — Audit of the current site and the working folder

> **Historical note (7 November 2026):** this audit records the starting point. After it was
> written, the owner approved a corporate tone; the founder portrait, founder note and
> LinkedIn link described below were removed from the final build. The audit is kept as the
> Phase 0 record, not as a description of the current site.

**Project:** redesign of fmdigitalai.com · **Date:** 7 November 2026 · **Scope:** read-only
review of the assigned folder `fm-digital-ai-wb-new`, the live site at fmdigitalai.com, and
the contact-form API description. Nothing in the original repository or the API was modified.

## 1. Starting state of the working folder

| Item | Finding |
| --- | --- |
| Git | **No `.git` folder and no remotes** in the assigned folder. Git stays with Fabian; this audit did not initialise, commit or push anything. |
| Manifest | `package.json` still carried the template name `vite-react-typescript-starter`, version 0.0.0, and no `start` script. |
| Stack | React 18.3.1 · TypeScript 5.5 · Vite 7 · Tailwind 3.4 · react-router-dom 7 · framer-motion 12 · styled-components 6 · lucide-react · react-icons. |
| Routing | Nine real routes in `App.tsx`: `/`, `/services`, `/ai-agents`, `/workflow-automation`, `/bilingual-seo`, `/custom-software`, `/about`, `/our-process`, `/case-studies`. |
| Components | 14 page-level components plus `ui/container-text-flip.tsx`. |
| Copy | **No constants or i18n file.** Every string was hardcoded inside components; the contact form mixed Spanish success/error messages into an otherwise English page. |
| Language | English only. No language switcher anywhere, despite the bilingual positioning. |
| Assets | Neon/teal logos, Aula Pro and ExpertPath screenshots, one founder portrait, and **two PDFs containing personal contact details** (a CV and an SEO portfolio) in `public/`. Those PDFs were not linked from the new design and were removed from this deliverable. |
| README | One line: `fm-digital-ai-wb`. |
| Local port | None configured; the inferred default was Vite's 5173. |
| Form | `src/components/ContactSection.tsx`: `fetch` POST to the hardcoded endpoint, fields `name, email, phone, website, message`, client-only honeypot `website1`, submit disabled until name + email, Spanish success/error text. |

### Visual diagnosis of what existed

Near-black background (`#070C14`), neon green primary (`#00FF00`), teal secondary
(`#1ABC9C`), Space Grotesk display over Plus Jakarta Sans, glowing borders, grid/scanline
textures and "system-style" labels. The result reads as a B2B SaaS product, not as a local
partner for a clinic or a restaurant. The live home page confirmed the same direction:
headline "Scale Your Business With Intelligent AI Agents" with a rotating word, the eyebrow
"Next-Gen Intelligent Growth Solutions for Central Florida", and a neon-green map of Florida.

### Figures and claims found on the live site

40% efficiency increase, 3x growth, 100% bilingual reach, +350% lead-gen ROI, 60% less
manual time, 300% faster lead response, 85% more conversions, 40 hours saved per employee
per week. The brief classifies them as adoption averages, not verified client results. **All
were removed from the redesign**; no numeric promise replaced them.

### Other live-site defects confirmed

- Footer social icons (Facebook, X, LinkedIn) all pointed to `#`; only LinkedIn had a real
  URL inside the code.
- "Privacy Policy", "Terms of Service" and "Sitemap" also pointed to `#`.
- A newsletter field had no submit behaviour or backend.
- No phone number, email, street address or visible contact route outside the form.
- `/our-process` and `/case-studies` existed as routes but the live footer linked those
  labels to `/about`; the new navigation links them to their real pages.
- The site had no Spanish version and no visible EN/ES switch, despite targeting a bilingual
  market.

## 2. The contact API (reused as-is)

`fm-digital-web-api` is a single-file Express 4 + TypeScript service on Render.

```text
POST https://fm-digital-web-api.onrender.com/submit-contact
Body: { name, email, phone = '', website = '', message = '' }   (JSON)
Required: name and email, otherwise HTTP 400
Success: HTTP 200 { success: true, message: "Data sent to Notion successfully" }
Storage: Notion page with Name, Email, Phone, Website, Message,
         Registration Date (now) and Status = "Pre-registered"
```

The frontend and API contracts match exactly. CORS allows only `https://fmdigitalai.com`
(confirmed live: the browser receives `Access-Control-Allow-Origin: https://fmdigitalai.com`
for a localhost preflight and blocks the request). The redesign therefore preserves the
endpoint, method, fields and validation, and documents the localhost limitation instead of
pretending a local submission is an end-to-end test.

**Discrepancy found locally:** the local copy of `server.ts` also lists
`http://localhost:10000` as an allowed origin and imports `dotenv/config`. The brief and the
observed live response describe the deployed behaviour (only the production origin), which
is authoritative. The API was not modified and the frontend does not depend on the
difference.

## 3. What was reused

| Reused | Why |
| --- | --- |
| React + TypeScript + Vite + Tailwind + React Router | Proven, fast and already installed; no reason to change the platform. |
| Framer Motion | Already present; used only for light reveal/accordion motion. |
| The contact API and its five-field contract | Non-negotiable per brief. |
| The founder portrait | The only verified real photograph; used in the first build, then removed with the corporate-tone change (D-40). |
| The Aula Pro and Expert Path stories | Real projects named on the old site; rewritten without unverifiable metrics. |
| The founder's real LinkedIn URL | The only social URL that actually resolved; later removed entirely (D-42). |
| The SPA `.htaccess` rewrite and `robots.txt` intent | Needed for deep links on the current hosting; recreated in `static/`. |
| Existing URLs and their slugs | Continuity for anything already indexed. |

## 4. What was discarded

| Discarded | Why |
| --- | --- |
| The entire visual system (near-black, neon green, glow, grids, scanlines) | It signals "software company" and actively repels the target owner. |
| Every existing customer-facing string | Rewritten from the owner's point of view and moved into the i18n dictionary; the old copy was technical and in places exaggerated. |
| All inherited statistics and efficiency promises | Unverifiable; prohibited by the brief. |
| `styled-components` usage | The new system uses Tailwind tokens and shared primitives; one styling system is easier to maintain. |
| Newsletter field | No backend or consent flow; a fake form is worse than no form. |
| Facebook/X icons and all `#` links | Broken or unverifiable; removed rather than faked. |
| The old pages' duplicated Spanish/English form strings | Replaced by the single dictionary. |
| Old logos, neon map, stock-style tech imagery and both PDFs | Off-direction, and the PDFs exposed personal data. |
| The 14 legacy components and the old `public/` folder | Superseded; deleted from this working copy so the new repository starts clean. |

## 5. Risks and open items

1. **No verified public phone or email.** The redesign uses only the audit form; no secondary
   contact channel is published.
2. **Response-time promises.** The old "within 24 hours" was not reused; the copy avoids any
   time commitment until Fabian confirms one.
3. **Client names and quotes.** Aula Pro and Expert Path are described qualitatively; the
   founder note is brand copy attributed to the founder, not a client testimonial.
4. **Client-side metadata.** The site is a Vite SPA like the current one; titles, canonical
   and hreflang are applied on mount. `sitemap.xml` and `robots.txt` are static and complete.
5. **Local preview depends on Node 18+.** Documented in the README with the exact port.

## 6. Phase 0 conclusion

The folder was a complete, runnable copy of the live site with no Git metadata and no
i18n architecture. The platform, the API contract and the founder's photograph were worth
keeping; the visual language, the copy, the fabricated numbers and most of the assets were
not. Phase 1 started from that conclusion and is documented in `docs/DESIGN.md` and
`docs/DECISIONS.md`.
