import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageProvider";
import { cx } from "../ui";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cx("h-9 w-9", className)} aria-hidden="true" focusable="false">
      <path
        d="M10.5 39V22.6a13.5 13.5 0 0 1 27 0V39"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="30.2" cy="29.4" r="3.1" fill="#B24A2C" />
    </svg>
  );
}

/**
 * Provisional identity: an open doorway (the business) with a clay doorknob.
 * It reads at 16px, works in one color, and echoes the arched photography used
 * across the layout. The owner reviews the definitive logo separately.
 */
export function Logo({
  tone = "ink",
  className,
  compact = false,
}: {
  tone?: "ink" | "cream";
  className?: string;
  compact?: boolean;
}) {
  const { t, lp } = useLanguage();
  return (
    <Link
      to={lp("/")}
      aria-label={t.site.name}
      className={cx(
        "group inline-flex items-center gap-2.5 transition-opacity hover:opacity-90",
        tone === "cream" ? "text-cream" : "text-forest",
        className,
      )}
    >
      <LogoMark className="h-9 w-9 shrink-0 transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.32rem] font-semibold tracking-tight">
          FM Digital <span className="italic">AI</span>
        </span>
        {!compact ? (
          <span
            className={cx(
              "mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.22em]",
              tone === "cream" ? "text-cream/70" : "text-forest/70",
            )}
          >
            {t.site.logoArea}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
