# Arbiter reviews — round-by-round record

Each round is recorded separately with its own verdict. Findings are quoted as the reviewer
reported them (what is wrong, where, severity, proposed fix). Fixes are listed in a separate
section under the round they followed; they are not folded into the verdict.

**Owner gate — effective 7 November 2026.** From this point on, no finding proposed by any
arbiter (in any round, including future ones) may be applied until the owner has seen it and
approved that specific fix. The builder must present every finding verbatim — what is wrong,
where, severity, proposed fix — and stop. Rounds 1–3 below happened before this gate and are
kept as history; they are not reopened.

## Attempt log (so no round is silently skipped)

| Attempt | Outcome | Report |
| --- | --- | --- |
| Pre-round adversarial audit | **Stopped without a report** after ~55 minutes; no findings were recorded. Replaced by Round 1. | None |
| **Round 1** | Completed. **Verdict: FAIL.** Six findings. | Full report received |
| Round 2 attempt (first) | **Stopped without a report** after ~35 minutes; no findings were recorded. Replaced by the completed Round 2. | None |
| **Round 2** | Completed. **Verdict: FAIL.** Two findings (F6, F7). | Full report received |
| **Round 3** | Completed. **Verdict: PASS.** No findings. 20/20 checklist. | Full report received |

No round produced a partial report that was then merged into another round. The two stopped
attempts produced no findings and are disclosed here rather than omitted.

---

## Round 1 — VERDICT: FAIL

Independent review of the complete build. Six findings were reported.

### F1 — [major] Mobile menu does not trap or restore focus
- **What is wrong:** Opening the menu moves focus to the close button, but Tab escapes into the hidden page behind the overlay; after Escape, focus lands on a background link instead of the menu trigger.
- **Where:** `src/components/layout/Header.tsx`; measured at 390×844: 8 of 14 Tab presses left `#mobile-menu`.
- **Proposed fix:** Give the overlay `role="dialog"`/`aria-modal`, make the page behind it inert, trap Tab/Shift+Tab inside, and return focus to the open button on Escape/close.
- **Why it fails the bar:** Keyboard and screen-reader users can interact with content they cannot see.

### F2 — [major] Two Services headlines still sell technology, not an outcome
- **What is wrong:** The Services hub led with “Start with the problem, not the software.” and the Tools service page with “Software that fits your business — not the other way around.” The Spanish versions repeated “software”.
- **Where:** `src/constants/copy.ts` (`services.hub.title`, `services.tools.hero.title`), rendered on `/services`, `/custom-software`, `/es/services`, `/es/custom-software`.
- **Proposed fix:** State the owner outcome instead, in both languages.
- **Why it fails the bar:** Checklist item 2 requires every Home/Services headline to state a business benefit.

### F3 — [major] Spanish headline reverses the offer
- **What is wrong:** English “The follow-up you never have time for — done for you” was translated as “hecho por ti” (“done by you”).
- **Where:** `src/constants/copy.ts` (`services.followup.hero.title`), rendered on `/es/workflow-automation`.
- **Proposed fix:** “hecho por nosotros” or “nosotros lo hacemos por ti”; audit the Spanish for the same agent/beneficiary inversion.
- **Why it fails the bar:** The core promise of the service is that the studio does the follow-up.

### F4 — [major] Heading order skips levels
- **What is wrong:** `/services` and `/contact` went H1 → H3 with no H2.
- **Where:** `src/pages/ServicesPage.tsx`, `src/components/AuditForm.tsx`; same in Spanish.
- **Proposed fix:** Promote the service-card and form titles to H2, or add a real section H2 before them; make the small labels paragraphs.
- **Why it fails the bar:** The document outline is broken on the services hub and the primary conversion page.

### F5 — [major] Required arbiter summary is missing
- **What is wrong:** `docs/ARBITER.md` was absent, but README listed it and linked to it.
- **Where:** `README.md`; `docs/` had no `ARBITER.md`.
- **Proposed fix:** Add the arbiter log with rounds, rejected items and fixes.
- **Why it fails the bar:** Checklist item 19 requires the arbiter summary.

### F6 — [major] Testing evidence overstates compliance and counts are stale
- **What is wrong:** `TESTING.md` claimed ordered headings, mobile-menu focus, 32 routes and 605 strings; the rendered site contradicted the first two, and the counts were 34 sitemap URLs and 606 leaves.
- **Where:** `docs/TESTING.md`.
- **Proposed fix:** Re-run the checks after fixing F1/F4, update the counts, and record only checks that actually pass.
- **Why it fails the bar:** Checklist item 20 requires accurate documentation.

### Changes applied after Round 1 (before the owner gate)

All six were fixed and re-tested: modal dialog + Tab trap + focus restore; new benefit
headlines (“Every call answered. Every customer kept.”, “Less admin. More time with
customers.”); corrected Spanish follow-up; H2 added before the services cards and the form
title promoted to H2; this file created; testing evidence and counts rebuilt.

---

## Round 2 — VERDICT: FAIL

A second independent reviewer re-checked the six Round 1 fixes and the full checklist.
F1–F5 passed. Two findings remained.

### F6 — [major] `TESTING.md`'s form evidence is not the intercepted request
- **What is wrong:** §3.1 presented the intercepted POST with `phone: "(407) 555-0134"`, `website: "example-clinic.com"` and `message: "Calls after 5 p.m. and Monday no-shows."`. The only live intercept from this build posted the same name/email with `phone: ""`, `website: ""` and `message: ""`. The documented phone is exactly the placeholder shown in `desktop-contact.jpg`, so the body was not captured as displayed. Separately, §4 said the eight identical EN/ES strings were brand names (“FM Digital AI”, “Aula Pro”, “Expert Path”), “Ideas”/“Legal”/“Cookies”, the 404 label and the name placeholder; the copy guard's eight are `nav.insights`, `footer.legalTitle`, `form.namePlaceholder`, `insights.index.eyebrow`, `legal.privacy.sections[4].heading`, `sitemap.legalTitle`, `notFound.eyebrow` and `meta.insights.title` — no brand names; “Ideas” appears three times and “Legal” twice.
- **Where:** `docs/TESTING.md:56-73` and `:113-116`; output of the live check; `docs/screenshots/desktop-contact.jpg`.
- **Proposed fix:** Paste the exact captured body from the run — or run and label a separate intercept with all five fields typed and show those values. Replace §4 with the actual eight keys/values.
- **Why it fails the bar:** F6 required `TESTING.md` to be accurate; this was its central form evidence and its language-check explanation.

### F7 — [minor] Spanish hero chat is ungrammatical
- **What is wrong:** “Tenemos las 10:30 a.m. libre.” — “las 10:30” is plural feminine and “libre” is singular; it reads as a literal rendering of “We have 10:30 a.m. open”.
- **Where:** `docs/screenshots/desktop-home-es.jpg` (chat card); `docs/COPY.md:525`; rendered on `/es`.
- **Proposed fix:** “Tenemos un espacio libre a las 10:30 a.m. ¿Te lo reservo?” (or “A las 10:30 a.m. tenemos un espacio libre. ¿Te lo reservo?”).
- **Why it fails the bar:** It is the first Spanish copy in the hero and reads as translated rather than written.

### Changes applied after Round 2 (before the owner gate)

F6: the form was re-run with all five fields typed and the exact captured payload pasted into
`TESTING.md`; the identical-string explanation was corrected to the eight real keys.
F7: the sentence now reads “¡Buenos días! A las 10:30 a.m. tenemos un espacio libre. ¿Te lo
reservo?” and the Spanish home was re-captured.

---

## Round 3 — VERDICT: PASS

A third independent reviewer confirmed both Round 2 fixes and re-ran the full checklist:
**20/20 items passed; no blocker, major or minor finding.** It reported no findings, so there
was nothing for the owner gate to withhold from this round.

- It verified the corrected form evidence against the stored all-five-fields capture and the
  corrected eight-key list against the copy guard.
- It verified the corrected Spanish sentence in `copy.ts`, `COPY.md` and the live page.
- It re-checked the headline benefits, language switching, CTA, sectors/places, design
  consistency, form contract, no-secret state, route completeness and the honesty of this
  document.

The reviewer listed four things it did not re-execute itself (the five-field capture, the
36-route audit, build/lint counts, and a full word-for-word copy diff) and relied on the
stored evidence for those; they were run and are recorded in `TESTING.md`.

### Accepted notes (not findings, at the time of Round 3)

1. No public phone or email was verified; the form is the contact route.
2. The 30-minute audit length and the pricing wording are proposals for the owner to confirm
   (quoted for review in the owner report; D-38/D-39).
3. SPA metadata and the 404 status are documented limitations.
4. The real end-to-end form submission must happen on the production domain.
5. The Aula Pro / Expert Path imagery is editorial photography, not product screenshots.
6. The founder note was brand copy signed by the founder, not a client testimonial. It was
   later removed with the corporate-tone change (D-40).

---

## Post-Round 3 owner direction — 7 November 2026

The owner accepted rounds 1–3 as pre-gate history. The Round 3 PASS applies to the build **as
it stood before** the following approved changes:

- a deliberate motion system (ambient hero, scroll reveals, parallax, route transitions,
  glass surfaces, CTA shine, richer hovers);
- removal of the internal blog and its routes, with an external **Blog** footer link to
  `https://fmdigitalai.com/blog/`;
- removal of every LinkedIn link (footer, form error, JSON-LD);
- a corporate tone that removes the founder name, portrait, first-person quote and founder
  sections, replacing them with studio-voice sections on Home and About;
- confirmation of the 30-minute audit and pricing wording;
- contact exclusively through the audit form.

## Round 4 — resolved (owner-approved)

A fresh independent reviewer audited the post-change build. **Verdict: two minor findings,
0 blocker, 0 major.** Both were approved by the owner on 7 November 2026.

### F1 — [minor] `TESTING.md` omits the required 26-URL sitemap count
- **What is wrong:** §2 evidences 28 route checks and §1/§4 evidence 551 strings, but no current document states the sitemap total. `static/sitemap.xml` contains exactly 26 `<loc>` entries (13 EN + 13 ES, no `/insights`), but the evidence file never records that number or reconciles it with the 28 route checks.
- **Where:** `docs/TESTING.md:18-45` (§2 route audit table); `static/sitemap.xml`; `docs/URLS.md`.
- **Proposed fix:** Add a row in §2: "Sitemap URLs | 26 (13 EN + 13 ES; 404 excluded)", cite `static/sitemap.xml`, and state that the 28 route checks are the 26 sitemap pages plus `/nope` and `/es/nope`.
- **Why it fails the bar:** without it, route/sitemap consistency cannot be audited from the evidence file without re-deriving it.

**Status: approved and applied on 7 November 2026** — the row and reconciliation were added
to `docs/TESTING.md` §2.

### F2 — [minor] Home and About reused the same stock photograph
- **What is wrong:** the reviewer saw the Home "A Central Florida studio, not a call center." section and the About "A local studio built around one idea: answer people." section using the same photograph (same hands, green marker, mug, notebook), cropped differently.
- **Where:** `docs/screenshots/desktop-home-studio.jpg` and `docs/screenshots/desktop-about-studio.jpg`; live `/` and `/about`.
- **Proposed fix:** use a distinct approved team-at-work image in one section, or vary the crop/treatment enough that the two trust sections are not visually identical.
- **Why it fails the bar:** repeating one stock scene in two flagship trust sections undercuts the premium bar.

**Status: confirmed on 7 November 2026** — the distinct `studio-team` image stays in About;
Home keeps `team-notes`.

### Round 4 notes

- The reviewer's permitted live checks passed: motion (ambient, parallax, glass, shine, route
  transition), reduced-motion fallback, blog removal and external footer link, `/insights` 404,
  no founder/LinkedIn text or images, corporate sections, heading order, form contract, copy
  guard (551 strings, 6 identical), sitemap count (26), English default and switcher.
- It did not re-run the end-to-end form delivery, honeypot, full copy diff, pricing surface,
  footer mobile layout, back/forward scroll, contrast measurements, build/lint, or a secrets
  scan beyond the founder/LinkedIn patterns.
- **No Round 4 PASS was claimed at the time.** Both findings are now resolved with owner
  approval; a fresh confirming round (Round 5) covers the elevation pass that followed.

---

## Round 5 — elevation pass (under the owner gate)

A fresh independent reviewer audited the post-elevation build. **Verdict: one minor finding,
0 blocker, 0 major.** In line with the gate, nothing has been applied.

### F1 — [minor] `TESTING.md` §6 glass-surface cap is now false
- **What is wrong:** `docs/TESTING.md:161–162` states motion is limited to "a maximum of three
  blurred glass surfaces per viewport." The Home dark services section now renders a 2×2 grid
  of four `glass-card-dark` cards, and the frosted header adds a fifth `backdrop-filter`
  surface in the same viewport. The documented cap is contradicted by the build.
- **Where:** `src/components/sections.tsx:61–75`; `docs/TESTING.md:161–162`; corroborated by
  `elevation-check.mjs` (`home.darkGlassCards = 4`).
- **Proposed fix:** either cap simultaneously visible dark glass cards at three, or update
  `TESTING.md` §6 to record the real worst-case count with a one-line justification.
- **Why it fails the bar:** the documented blur-surface cap underpins the no-jank guardrail and
  the evidence file currently overstates compliance.

**Status: approved and applied (14 Nov 2026)** — option (b), `TESTING.md` §6 now records the
real worst-case count (five `backdrop-filter` surfaces) with justification.

### Round 5 notes

- The reviewer confirmed programmatically: pinned hero geometry (240vh track, 1-viewport
  sticky, image scale 1→1.13, stage release opacity 1→0.09), mobile/reduced-motion fallback
  (no sticky, normal height, static), word-reveal a11y (`aria-hidden` words + `sr-only`
  plain text), glass/float counts, parallax page-hero headings, frozen copy (551 strings, 0
  jargon), and no regressions (0 console errors, no overflow).
- It could not visually inspect the screenshots (this model round has no image input) and did
  not run an FPS tool, so it marked visual choreography, the emphasis sweep, parallax rate
  difference, mobile image parallax and frame rate as **unverified**.
- **No Round 5 PASS is claimed.** F1 is resolved with owner approval (option b).

---

## Video hero integration — pending Fabian's visual approval (no arbiter round yet)

On 14 Nov 2026 the scroll-scrubbed video hero was integrated from
`fm-digital-ai-hero-delivery-pack.md` (the approved hero exception to the frozen scope): a
700vh pinned Home hero scrubs a ~43 s dense-keyframe video (streamed Blob, lerped
`currentTime`, gated seeks) with four caption beats and a settle on the H1 + CTA from
`copy.ts`; mobile/tablet/reduced-motion get a static settle frame. The caption wording is the
pack's proposed beats, still pending Fabian's final wording. Per the pack §4, **no arbiter
round runs until Fabian approves the hero visually** from the screen recordings
(`docs/recordings/hero-scroll-{desktop,mobile}.webm`).

---

## How the review was run

- The site was served locally with `npm run dev` at `http://localhost:5173` (port pinned).
- Reviewers captured and opened desktop and mobile screenshots of Home, Services, a service
  detail, About, Our Process, Our Work, Free audit, Sitemap, Privacy, the 404 page, Spanish
  Home and Spanish Contact, the open mobile menu and FAQ states. (Rounds 1–3 also reviewed the
  internal Ideas index and an article, before the blog moved to WordPress.)
- They inspected the live DOM for heading order, focus behaviour, overflow, alt text, dead
  links and console errors.
- They re-checked the form by intercepting the POST (never submitting to Notion).
- They read `docs/COPY.md` against the dictionary and `docs/TESTING.md` against the re-run.
