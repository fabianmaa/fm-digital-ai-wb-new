import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SERVICE_IDS, SERVICE_PATHS, type ServiceId } from "../constants/site";
import { useLanguage } from "../i18n/LanguageProvider";
import {
  AuditButton,
  Container,
  Eyebrow,
  FaqList,
  Parallax,
  Reveal,
  RevealWords,
  Section,
  SectionHeading,
  TextLink,
  cx,
  type FaqItem,
} from "./ui";

/* --------------------------------------------------------------- page hero */

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  tone = "paper",
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children?: ReactNode;
  tone?: "paper" | "sand" | "cream";
}) {
  return (
    <Section tone={tone} className="pb-14 pt-28 sm:pb-16 sm:pt-36 lg:pt-40">
      <Container>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Parallax distance={14}>
            <h1 className="mt-6 max-w-4xl text-display-lg balance">
              <RevealWords text={title} />
            </h1>
          </Parallax>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{lead}</p>
          {children ? <div className="mt-8">{children}</div> : null}
        </Reveal>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- services */

export function ServiceCards({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { t, lp } = useLanguage();
  const dark = tone === "dark";

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {SERVICE_IDS.map((id, index) => {
        const item = t.services[id];
        const summary = t.home.services.items.find((entry) => entry.key === id) ?? t.home.services.items[index];
        return (
          <Reveal key={id} delay={index * 0.06} className="h-full">
            <div className="float-card h-full" style={{ animationDelay: `${index * 0.9}s` }}>
              <Link
                to={lp(SERVICE_PATHS[id])}
                className={cx(
                  "group flex h-full flex-col rounded-4xl border p-7 transition-all duration-500 ease-editorial sm:p-8",
                  dark
                    ? "glass-card-dark hover:-translate-y-1 hover:border-cream/30 hover:bg-cream/[0.1]"
                    : "border-line bg-cream shadow-card hover:-translate-y-1 hover:border-forest/25 hover:shadow-lift",
                )}
              >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={cx(
                    "font-display text-sm italic",
                    dark ? "text-cream/75" : "text-clay/70",
                  )}
                >
                  {item.number}
                </span>
                <span
                  className={cx(
                    "text-[0.65rem] font-semibold uppercase tracking-[0.18em]",
                    dark ? "text-cream/70" : "text-forest/70",
                  )}
                >
                  {summary.kicker}
                </span>
              </div>
              <h3 className={cx("mt-5 text-display-sm balance", dark ? "text-cream" : "text-ink")}>
                {summary.title}
              </h3>
              <p className={cx("mt-3 text-[0.98rem] leading-relaxed", dark ? "text-cream/70" : "text-muted")}>
                {summary.body}
              </p>
              <ul className="mt-5 space-y-2.5">
                {summary.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={cx("mt-0.5 h-4 w-4 shrink-0", dark ? "text-cream/50" : "text-forest/60")}
                      aria-hidden="true"
                    />
                    <span className={dark ? "text-cream/75" : "text-muted"}>{bullet}</span>
                  </li>
                ))}
              </ul>
              <span
                className={cx(
                  "mt-6 inline-flex items-center gap-2 pt-1 text-sm font-semibold",
                  dark ? "text-cream" : "text-forest",
                )}
              >
                {t.common.learnMore}
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function ServiceChips() {
  const { t, lp } = useLanguage();
  return (
    <div className="flex flex-wrap gap-2">
      {SERVICE_IDS.map((id: ServiceId) => (
        <Link
          key={id}
          to={lp(SERVICE_PATHS[id])}
          className="rounded-full border border-line bg-cream px-4 py-2 text-sm font-semibold text-forest transition-colors hover:border-forest hover:bg-forest hover:text-cream"
        >
          {t.services[id].navLabel}
        </Link>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------- cta band */

export function CtaBand({
  title,
  body,
  micro,
}: {
  title?: string;
  body?: string;
  micro?: string;
}) {
  const { t } = useLanguage();
  return (
    <Section tone="forest" className="grain overflow-hidden">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-cream/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full border border-cream/10"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal>
            <Eyebrow tone="cream">{t.home.cta.eyebrow}</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-display-lg text-cream balance">
              {title ?? t.home.cta.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/70">
              {body ?? t.home.cta.body}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:justify-self-end">
            <AuditButton variant="light" className="w-full justify-between px-7 py-4 sm:w-auto" />
            <p className="mt-4 text-sm text-cream/75">{micro ?? t.home.cta.micro}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- faq */

export function FaqSection({
  eyebrow,
  title,
  items,
  tone = "paper",
  aside,
}: {
  eyebrow?: string;
  title?: string;
  items: FaqItem[];
  tone?: "paper" | "sand" | "cream";
  aside?: ReactNode;
}) {
  const { t } = useLanguage();
  return (
    <Section tone={tone}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={eyebrow ?? t.home.faq.eyebrow} title={title ?? t.home.faq.title} />
            {aside ?? (
              <div className="glass-panel mt-8 max-w-sm rounded-3xl p-6">
                <p className="font-display text-xl">{t.services.hub.helpTitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.services.hub.helpBody}</p>
                <AuditButton className="mt-5 px-5 py-3 text-sm" />
              </div>
            )}
          </div>
          <FaqList items={items} />
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- misc */

export function BackLink({ to, children }: { to: string; children: string }) {
  return (
    <TextLink to={to} className="text-sm">
      {children}
    </TextLink>
  );
}
