# FM Digital AI — website

The redesigned website for **FM Digital AI**, a digital marketing and AI studio for
small and medium-sized businesses in Central Florida. Warm, plain-spoken and fully
bilingual (English default, Spanish at `/es`), built for owners of clinics, restaurants,
real-estate offices, accounting firms and local service businesses — not for technologists.

- Stack: React 18, TypeScript, Vite 7, Tailwind CSS 3, React Router 7, Framer Motion.
- No backend, no environment variables and no secrets in this repository.
- All customer-facing copy lives in one file: `src/constants/copy.ts` (EN + ES side by side).

## Run it locally

Requirements: **Node.js 20.19 or newer** (tested on Node 24) and npm.

```bash
npm install
npm run dev
```

Open **http://localhost:5173**.

The port is fixed (`strictPort: true`), so `npm run dev` always serves that exact URL. If
port 5173 is already in use, stop the process using it and run the command again.

Production build and local preview of the built site:

```bash
npm run build      # writes dist/
npm run preview    # serves dist/ at http://localhost:5173
```

Type-check and lint (optional):

```bash
npx tsc --noEmit -p tsconfig.app.json
npm run lint
```

## The contact form (reused API)

The free-audit form keeps the existing contract, unchanged:

```text
POST https://fm-digital-web-api.onrender.com/submit-contact
Content-Type: application/json

{ "name": "...", "email": "...", "phone": "...", "website": "...", "message": "..." }
```

`name` and `email` are required by the API; the site also requires them before enabling the
button. A hidden honeypot field (`website1`) is checked in the browser and is never sent.
The API stores each submission in the same Notion database. **Do not change the API** as
part of this redesign.

The API only accepts requests from `https://fmdigitalai.com`, so a real submission cannot
complete from `localhost`. Locally the request is built exactly as in production and tested
against a mock; the browser then shows the connection error, as expected. The full
end-to-end test happens once the redesign is on the production domain. Evidence and the
exact procedure are in [`docs/TESTING.md`](docs/TESTING.md).

## Languages

- English is the default at `/`, `/services`, `/ai-agents`, …
- Spanish is the same pages at `/es`, `/es/services`, `/es/ai-agents`, …
- One component tree. The `/es` prefix changes which values the dictionary returns; there is
  no duplicated Spanish site.
- The EN/ES switch is in the header on every page and preserves the current page and hash.

## Project structure

```text
src/
  constants/copy.ts        Every customer-facing string, English and Spanish, side by side
  constants/site.ts        Routes, service ids, cities, image names (no copy)
  i18n/                    Language provider, path helpers, per-page title/meta/canonical/hreflang
  lib/contactApi.ts        The API contract in one place (endpoint + payload)
  components/              Layout, header, footer, form, shared sections and UI primitives
  pages/                   One component per page (Home, Services, About, Process, Work,
                           Free audit, Legal, Sitemap, 404)
  index.css                Design tokens, fonts, base styles, motion, reduced-motion rules
static/                    Served as the site root: images, fonts, favicon, robots.txt,
                           sitemap.xml and .htaccess
scripts/                   Copy-document generator, copy guard and sitemap generator
docs/                      Audit, design proposal, copy document, decisions log, URL map,
                           testing evidence and the arbiter's review summary
```

`vite.config.ts` sets `publicDir: 'static'`, so everything in `static/` is published at the
site root and copied into `dist/` on build. The blog is external at
**https://fmdigitalai.com/blog/** and is linked from the footer; there is no local blog.

## Documentation

| Document | What it contains |
| --- | --- |
| [`docs/AUDIT.md`](docs/AUDIT.md) | Phase 0 audit: what existed, what was reused, what was discarded and why |
| [`docs/DESIGN.md`](docs/DESIGN.md) | Concept, palette with hex values and contrast, typography, logo, imagery, motion, layout |
| [`docs/COPY.md`](docs/COPY.md) | Complete copy, page by page, in English and Spanish — generated from the code |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Every decision made under ambiguity, with the discarded alternative and the reason |
| [`docs/URLS.md`](docs/URLS.md) | URLs kept, URLs added, redirects |
| [`docs/TESTING.md`](docs/TESTING.md) | Build, route audit, form contract test, CORS evidence, language checks |
| [`docs/ARBITER.md`](docs/ARBITER.md) | Adversarial review: rounds, rejected items, fixes, remaining notes |

## Useful commands

```bash
node scripts/check-copy.mjs        # jargon, missing translations, untranslated leftovers
node scripts/generate-copy-doc.mjs # regenerates docs/COPY.md from src/constants/copy.ts
node scripts/generate-sitemap.mjs  # regenerates static/sitemap.xml from the route list
```

## Deployment (handled by Fabian, not by the redesign)

Upload the contents of `dist/` to the web root. The build already includes `robots.txt`,
`sitemap.xml`, `favicon.svg`, fonts, images and the SPA `.htaccess` rewrite. Serve over
HTTPS and keep the existing domain; canonical URLs and hreflang pairs are generated per page.

## Notes for review

- **Gauntlet history:** rounds 1–4 are recorded separately in [`docs/ARBITER.md`](docs/ARBITER.md)
  (FAIL → FAIL → PASS → two minor findings, both owner-approved). A fresh confirming round
  covers the elevation pass; every finding is presented for approval before it is applied.
- The palette and type pairing are approved; the **logo remains provisional**. See
  `docs/DESIGN.md`.
- Contact happens **only through the audit form**. The footer has no phone, email, street
  address or LinkedIn link.
- The blog is external at **https://fmdigitalai.com/blog/** and is linked from the footer.
- The **30-minute audit** and the pricing wording are approved as quoted (D-38, D-39); they
  live only in `src/constants/copy.ts`.
- The motion system now includes a **scroll-driven pinned hero** (desktop), word/line reveals
  with an emphasis underline, floating glass feature cards, and parallax page-hero headlines —
  all transform/opacity only and fully disabled under `prefers-reduced-motion`. Documented in
  `docs/DESIGN.md` and `docs/TESTING.md`.
- No analytics, advertising cookies or tracking scripts are included.
