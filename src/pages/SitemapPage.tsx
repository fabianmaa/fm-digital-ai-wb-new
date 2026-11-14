import { Link } from "react-router-dom";
import { SERVICE_IDS, SERVICE_PATHS } from "../constants/site";
import { localizePath } from "../i18n/LanguageProvider";
import { useLanguage } from "../i18n/LanguageProvider";
import { PageMeta } from "../i18n/PageMeta";
import { PageHero } from "../components/sections";
import { AuditButton, Container, Section } from "../components/ui";

export default function SitemapPage() {
  const { t } = useLanguage();

  const entries = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.services, path: "/services" },
    ...SERVICE_IDS.map((id) => ({ label: t.services[id].navLabel, path: SERVICE_PATHS[id] })),
    { label: t.nav.about, path: "/about" },
    { label: t.nav.process, path: "/our-process" },
    { label: t.nav.work, path: "/case-studies" },
    { label: t.nav.freeAudit, path: "/contact" },
  ];

  const legal = [
    { label: t.footer.privacy, path: "/privacy" },
    { label: t.footer.terms, path: "/terms" },
    { label: t.footer.sitemap, path: "/sitemap" },
  ];

  const rows = (items: { label: string; path: string }[]) => (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <li key={item.path} className="grid gap-3 py-4 sm:grid-cols-[1fr_7rem_7rem] sm:items-center">
          <span className="text-[0.98rem] font-medium text-ink">{item.label}</span>
          <Link
            to={localizePath(item.path, "en")}
            className="text-sm font-semibold text-forest underline-offset-4 hover:text-clay hover:underline"
            hrefLang="en"
          >
            {t.sitemap.englishLabel}
          </Link>
          <Link
            to={localizePath(item.path, "es")}
            className="text-sm font-semibold text-forest underline-offset-4 hover:text-clay hover:underline"
            hrefLang="es"
          >
            {t.sitemap.spanishLabel}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <PageMeta page="sitemap" />
      <PageHero eyebrow={t.sitemap.eyebrow} title={t.sitemap.title} lead={t.sitemap.intro} />
      <Section tone="paper" className="pt-0 sm:pt-0 lg:pt-0">
        <Container className="max-w-4xl">
          <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-forest/70">
            {t.sitemap.sectionsTitle}
          </h2>
          <div className="mt-4">{rows(entries)}</div>

          <h2 className="mt-12 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-forest/70">
            {t.sitemap.legalTitle}
          </h2>
          <div className="mt-4">{rows(legal)}</div>

          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-4xl border border-line bg-cream p-7 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-2xl">{t.home.cta.title}</p>
              <p className="mt-1 text-sm text-muted">{t.common.auditMicro}</p>
            </div>
            <AuditButton className="shrink-0" />
          </div>
        </Container>
      </Section>
    </>
  );
}
