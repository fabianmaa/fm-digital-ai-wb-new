import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../../constants/site";
import { useLanguage } from "../../i18n/LanguageProvider";
import { Logo } from "../brand/Logo";
import { AuditButton, cx } from "../ui";

export function LanguageSwitch({ tone = "ink", className }: { tone?: "ink" | "cream"; className?: string }) {
  const { lang, setLanguage, t } = useLanguage();
  return (
    <div
      className={cx(
        "inline-flex items-center gap-1 rounded-full border p-0.5 text-[0.7rem] font-bold uppercase tracking-[0.12em]",
        tone === "cream" ? "border-cream/25" : "border-forest/20",
        className,
      )}
      role="group"
      aria-label={t.nav.languageLabel}
    >
      {(["en", "es"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-label={code === "en" ? t.nav.switchToEn : t.nav.switchToEs}
          aria-current={lang === code ? "true" : undefined}
          className={cx(
            "rounded-full px-2.5 py-1 uppercase transition-colors",
            lang === code
              ? tone === "cream"
                ? "bg-cream text-forest"
                : "bg-forest text-cream"
              : tone === "cream"
                ? "text-cream/75 hover:text-cream"
                : "text-forest/70 hover:text-forest",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t, lp } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }
      if (event.key !== "Tab" || !overlayRef.current) return;
      const focusable = Array.from(
        overlayRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [closeMenu, open]);

  const isActive = (path: string) => {
    const localized = lp(path);
    return location.pathname === localized || location.pathname.startsWith(`${localized}/`);
  };

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "glass-header border-b border-white/50 shadow-[0_12px_36px_-26px_rgba(22,27,24,0.55)]"
            : "border-b border-transparent bg-paper/70 backdrop-blur-sm",
        )}
      >
        <div className="container-x">
        <div
          className={cx(
            "flex items-center justify-between gap-6 transition-[height] duration-300",
            scrolled ? "h-[68px]" : "h-[80px]",
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-6 xl:flex" aria-label={t.nav.mainNav}>
            {NAV_LINKS.map((item) => (
              <Link
                key={item.path}
                to={lp(item.path)}
                aria-current={isActive(item.path) ? "page" : undefined}
                className={cx(
                  "group relative py-2 text-sm font-semibold transition-colors",
                  isActive(item.path) ? "text-clay" : "text-forest/85 hover:text-forest",
                )}
              >
                {t.nav[item.key]}
                <span
                  className={cx(
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-clay transition-transform duration-300 ease-editorial",
                    isActive(item.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 xl:flex">
            <LanguageSwitch />
            <AuditButton short className="px-5 py-2.5 text-sm" />
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <LanguageSwitch />
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest hover:text-cream"
              aria-label={t.nav.menuOpen}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        </div>
      </header>

      {open ? (
        <div
          ref={overlayRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.mainNav}
          className="fixed inset-0 z-[60] flex flex-col bg-forest text-cream xl:hidden"
        >
          <div className="container-x flex h-[80px] shrink-0 items-center justify-between">
            <Logo tone="cream" />
            <button
              ref={closeRef}
              type="button"
              onClick={closeMenu}
              className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream hover:text-forest"
              aria-label={t.nav.menuClose}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav
            className="container-x flex flex-1 flex-col justify-center gap-1 overflow-y-auto pb-8"
            aria-label={t.nav.mainNav}
          >
            {NAV_LINKS.map((item, index) => (
              <Link
                key={item.path}
                to={lp(item.path)}
                onClick={closeMenu}
                className="group flex items-baseline justify-between border-b border-cream/10 py-3.5"
              >
                <span className="font-display text-3xl font-medium text-cream">{t.nav[item.key]}</span>
                <span className="text-xs font-semibold tracking-[0.2em] text-cream/60">0{index + 1}</span>
              </Link>
            ))}
            <Link
              to={lp("/contact")}
              onClick={closeMenu}
              className="mt-8 inline-flex items-center justify-between rounded-full bg-cream px-7 py-4 text-forest"
            >
              <span className="font-semibold">{t.common.freeAudit}</span>
            </Link>
            <p className="mt-5 text-sm text-cream/75">{t.common.auditMicro}</p>
          </nav>
        </div>
      ) : null}
    </>
  );
}
