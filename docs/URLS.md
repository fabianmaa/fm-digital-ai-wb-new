# URL map — kept, added and redirected

**No existing URL was removed or renamed, so no 301 redirect is required for this redesign.**
Every URL that existed on the old site resolves on the new site with the same path.

## URLs kept (same path, same purpose)

| URL | Notes |
| --- | --- |
| `/` | Home; the long-form old home is replaced by a shorter, sectioned page. |
| `/services` | Services hub; each service is still linked individually. |
| `/ai-agents` | Now "Answer every customer" (same subject, outcome copy). |
| `/workflow-automation` | Now "Follow up automatically". |
| `/bilingual-seo` | Now "Be found first" (bilingual search, plain language). |
| `/custom-software` | Now "Tools that fit". |
| `/about` | About the studio, values, service area. |
| `/our-process` | Four-step process, expanded from the old version. |
| `/case-studies` | Now "Our work": Aula Pro and Expert Path, qualitative. |

Old anchors and inbound links keep working:

- `/#contact` → the free-audit form section on the home page (same `id="contact"`).
- `/index.html` → the SPA entry.

## URLs added

| URL | Content |
| --- | --- |
| `/contact` | Free-audit page: form, what happens next, expectations, FAQ, service area. |
| `/privacy` | Privacy policy (previously a dead `#` link). |
| `/terms` | Terms of service (previously a dead `#` link). |
| `/sitemap` | Human-readable sitemap (previously a dead `#` link). |

The blog is **not part of this website**. The existing WordPress installation at
**https://fmdigitalai.com/blog/** is linked from the footer; no `/insights` route is shipped.

Every English URL also exists under `/es`:

```text
/es
/es/services
/es/ai-agents
/es/workflow-automation
/es/bilingual-seo
/es/custom-software
/es/about
/es/our-process
/es/case-studies
/es/contact
/es/privacy
/es/terms
/es/sitemap
```

## URLs changed

None. There are no 301s to apply.

If Fabian later prefers translated Spanish slugs (for example `/es/servicios`), that is a
separate change and would need its own redirect map from the `/es/...` English slugs above.

## Canonical, hreflang and sitemap

- Each page declares a self-referencing canonical on `https://fmdigitalai.com`.
- Each page declares `hreflang="en"`, `hreflang="es"` and `hreflang="x-default"` (English).
- `static/sitemap.xml` lists all 13 English and 13 Spanish URLs with the same alternates;
  it is copied to the site root by the build.
- `static/robots.txt` allows the site and points to the sitemap.
- Trailing slashes are normalised: the canonical form has no trailing slash except `/`.

## Response codes — known limitation

The site is a single-page application behind the existing Apache rewrite. Known routes return
200; unknown routes render the designed 404 page. Because the rewrite serves `index.html`,
the HTTP status for an unknown path is still 200 rather than 404. Fixing that requires a
hosting-level rule (for example a custom error document that also serves the SPA), which is a
deployment decision for Fabian and does not affect any real URL.
