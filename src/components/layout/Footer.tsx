import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SERVICE_IDS, SERVICE_PATHS } from "../../constants/site";
import { useLanguage } from "../../i18n/LanguageProvider";
import { Logo } from "../brand/Logo";
import { AuditButton, Container, cx } from "../ui";

export function Footer() {
  const { t, lp, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative bg-forest-deep pb-10 pt-16 text-cream">
      <Container>
        <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.9fr]">
          <div className="md:col-span-3 lg:col-span-1">
            <Logo tone="cream" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/70">{t.footer.blurb}</p>
            <p className="mt-5 max-w-sm text-xs leading-relaxed text-cream/65">{t.footer.areaNote}</p>
          </div>

          <nav aria-label={t.footer.servicesTitle}>
            <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cream/70">
              {t.footer.servicesTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICE_IDS.map((id) => (
                <li key={id}>
                  <Link to={lp(SERVICE_PATHS[id])} className="text-cream/80 transition-colors hover:text-cream">
                    {t.services[id].navLabel}
                  </Link>
                </li>
              ))}
              <li>
                <Link to={lp("/services")} className="text-cream/80 transition-colors hover:text-cream">
                  {t.common.seeAllServices}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={t.footer.companyTitle}>
            <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cream/70">
              {t.footer.companyTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to={lp("/about")} className="text-cream/80 transition-colors hover:text-cream">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to={lp("/our-process")} className="text-cream/80 transition-colors hover:text-cream">
                  {t.nav.process}
                </Link>
              </li>
              <li>
                <Link to={lp("/case-studies")} className="text-cream/80 transition-colors hover:text-cream">
                  {t.nav.work}
                </Link>
              </li>
              <li>
                <a
                  href="https://fmdigitalai.com/blog/"
                  className="inline-flex items-center gap-1.5 text-cream/80 transition-colors hover:text-cream"
                >
                  {t.footer.blog}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cream/70">
              {t.footer.contactTitle}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-cream/70">{t.footer.contactLine}</p>
            <AuditButton variant="light" className="mt-5 w-full justify-between px-5 py-3 text-sm" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-6 text-xs text-cream/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} FM Digital AI. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to={lp("/privacy")} className="transition-colors hover:text-cream">
              {t.footer.privacy}
            </Link>
            <Link to={lp("/terms")} className="transition-colors hover:text-cream">
              {t.footer.terms}
            </Link>
            <Link to={lp("/sitemap")} className="transition-colors hover:text-cream">
              {t.footer.sitemap}
            </Link>
            <span className={cx("text-cream/55", lang === "es" && "italic")}>{t.footer.madeIn}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
