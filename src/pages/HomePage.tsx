import { Check } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CITIES, SERVICE_IDS, SERVICE_IMAGES } from "../constants/site";
import { useLanguage } from "../i18n/LanguageProvider";
import { PageMeta } from "../i18n/PageMeta";
import { AuditForm } from "../components/AuditForm";
import { ScrollVideoHero } from "../components/ScrollVideoHero";
import {
  Container,
  Eyebrow,
  Photo,
  Parallax,
  Reveal,
  RichText,
  Section,
  SectionHeading,
  TextLink,
  cx,
} from "../components/ui";
import { FaqSection } from "../components/sections";

function useDesktop() {
  const [desktop, setDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return desktop;
}

function Hero() {
  return <ScrollVideoHero />;
}

function CityMarquee() {
  return (
    <div className="marquee overflow-hidden border-y border-line bg-sand py-3.5" aria-hidden="true">
      <div className="marquee-track items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-segment" data-dup={copy === 1}>
            {CITIES.map((city) => (
              <span
                key={`${copy}-${city}`}
                className="flex shrink-0 items-center gap-8 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-forest/70"
              >
                {city}
                <span className="h-1 w-1 rounded-full bg-clay/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProblemSwap({ before, after, reduce }: { before: string; after: string; reduce: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.4"] });
  const strikeX = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });
  const afterO = useTransform(scrollYProgress, [0.15, 0.7], [0, 1], { clamp: true });
  const afterY = useTransform(scrollYProgress, [0.15, 0.7], [14, 0], { clamp: true });

  if (reduce) {
    return (
      <div className="mt-6">
        <p className="relative inline-block text-lg leading-relaxed text-muted">
          {before}
          <span className="absolute left-0 top-1/2 h-[2px] w-full bg-clay" aria-hidden="true" />
        </p>
        <p className="mt-2 text-lg font-semibold leading-relaxed text-forest">{after}</p>
      </div>
    );
  }

  return (
    <div ref={ref} className="mt-6">
      <p className="relative text-lg leading-relaxed text-muted">
        <span className="relative">
          {before}
          <motion.span
            className="absolute left-0 top-1/2 h-[2px] w-full bg-clay"
            style={{ transformOrigin: "left", scaleX: strikeX }}
            aria-hidden="true"
          />
        </span>
      </p>
      <motion.p className="mt-2 text-lg font-semibold leading-relaxed text-forest" style={{ opacity: afterO, y: afterY }}>
        {after}
      </motion.p>
    </div>
  );
}

function Pain() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const introParts = t.home.pain.intro.split(". ");
  const lead = `${introParts[0]}.`;
  const before = introParts.slice(1).join(". ");
  return (
    <Section tone="paper">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow={t.home.pain.eyebrow} title={t.home.pain.title} intro={lead} />
            <ProblemSwap before={before} after={t.home.pain.after} reduce={reduce} />
            <p className="mt-8 max-w-sm border-l-2 border-clay pl-5 text-[1.02rem] font-medium leading-relaxed text-forest">
              {t.home.pain.closing}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.home.pain.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05} className="h-full">
                <div className="float-card h-full" style={{ animationDelay: `${index * 0.9}s` }}>
                  <article className="group relative h-full overflow-hidden rounded-3xl border border-line bg-cream p-6 transition-all duration-500 ease-editorial hover:-translate-y-1 hover:shadow-soft">
                    <motion.span
                      className="absolute left-0 top-0 h-[3px] w-full bg-clay/60"
                      style={{ transformOrigin: "left" }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                      aria-hidden="true"
                    />
                    <span className="font-display text-sm italic text-clay/70">0{index + 1}</span>
                    <h3 className="mt-4 text-xl leading-snug">{item.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.body}</p>
                  </article>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Services() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const desktop = useDesktop();
  const [active, setActive] = useState(0);
  const scrub = desktop && !reduce;
  const items = t.home.services.items;

  return (
    <Section tone="forest" className="grain">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="ambient-orb ambient-orb--glow-sage -left-24 top-8 h-[26rem] w-[26rem]" />
        <div className="ambient-orb ambient-orb--glow-clay -right-20 bottom-0 h-[24rem] w-[24rem]" />
      </div>
      <Container className="relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={t.home.services.eyebrow}
            title={t.home.services.title}
            intro={t.home.services.intro}
            tone="cream"
          />
          <TextLink to="/services" className="shrink-0 text-cream hover:text-white">
            {t.common.seeAllServices}
          </TextLink>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            {items.map((item, index) => {
              const row = (
                <div className="flex items-start gap-5 sm:gap-6">
                  <span className="font-display text-4xl italic leading-none text-clay/70 sm:text-5xl">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="text-display-sm text-cream">{item.title}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-cream/70">{item.body}</p>
                    <ul className="mt-3 space-y-1.5">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 text-sm text-cream/60">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-cream/50" aria-hidden="true" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
              return scrub ? (
                <motion.div
                  key={item.key}
                  onViewportEnter={() => setActive(index)}
                  viewport={{ margin: "-40% 0px -40% 0px" }}
                  className={cx(
                    "-mx-4 rounded-2xl border-t border-cream/15 px-4 py-12 transition-colors duration-500 first:border-t-0 first:pt-0 lg:py-16",
                    active === index ? "bg-[rgba(96,168,140,0.12)]" : "bg-transparent",
                  )}
                >
                  {row}
                </motion.div>
              ) : (
                <div
                  key={item.key}
                  className={cx(
                    "-mx-4 rounded-2xl border-t border-cream/15 px-4 py-12 transition-colors duration-500 first:border-t-0 first:pt-0 lg:py-16",
                    active === index ? "bg-[rgba(96,168,140,0.12)]" : "bg-transparent",
                  )}
                >
                  {row}
                </div>
              );
            })}
          </div>

          <div className="relative">
            {scrub ? (
              <div className="lg:sticky lg:top-28">
                <div className="relative aspect-[4/5]">
                  <div className="arch absolute inset-0 overflow-hidden border border-cream/20">
                    {SERVICE_IDS.map((id, index) => (
                      <motion.div
                        key={id}
                        className="absolute inset-0"
                        initial={false}
                        animate={{ opacity: active === index ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Photo
                          name={SERVICE_IMAGES[id]}
                          alt={items[index].title}
                          className="h-full w-full"
                          imgClassName="object-cover"
                          sizes="(min-width: 1024px) 480px, 90vw"
                        />
                      </motion.div>
                    ))}
                  </div>
                  <div className="arch absolute -left-3 -top-3 h-full w-full border border-cream/30" aria-hidden="true" />
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-[440px]">
                <div className="arch relative aspect-[4/5] overflow-hidden border border-cream/20">
                  <Photo
                    name={SERVICE_IMAGES.agents}
                    alt={items[0].title}
                    className="h-full w-full"
                    imgClassName="object-cover"
                    sizes="90vw"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Process() {
  const { t } = useLanguage();
  return (
    <Section tone="sand">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={t.home.process.eyebrow} title={t.home.process.title} intro={t.home.process.intro} />
          <TextLink to="/our-process" className="shrink-0">
            {t.common.seeProcess}
          </TextLink>
        </div>
        <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.process.steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.07}>
              <div className="relative pt-6">
                <motion.span
                  className="absolute left-0 top-0 h-px w-full bg-clay/50"
                  style={{ transformOrigin: "left" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                  aria-hidden="true"
                />
                <motion.span
                  className="block font-display text-4xl italic leading-none text-clay/50"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 + 0.15 }}
                >
                  {step.number}
                </motion.span>
                <h3 className="mt-4 text-xl leading-snug">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Sectors() {
  const { t } = useLanguage();
  return (
    <Section tone="paper">
      <Container>
        <SectionHeading
          eyebrow={t.home.sectors.eyebrow}
          title={t.home.sectors.title}
          intro={t.home.sectors.intro}
        />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
          {t.home.sectors.items.map((sector, index) => (
            <Reveal
              key={sector.name}
              delay={index * 0.05}
              className={cx(index === 0 ? "col-span-2 lg:col-span-2 lg:row-span-2" : "col-span-1")}
            >
              <div
                className={cx(
                  "group relative h-full overflow-hidden rounded-3xl",
                  index === 0 ? "min-h-[260px] sm:min-h-[380px] lg:min-h-[500px]" : "min-h-[170px] sm:min-h-[220px]",
                )}
              >
                <Photo
                  name={sector.image as never}
                  alt={sector.alt}
                  className="absolute inset-0 h-full w-full"
                  imgClassName="object-[center_30%] transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.04]"
                  sizes={index === 0 ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 300px, 50vw"}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/45 to-forest-deep/5"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 text-cream sm:p-6">
                  <h3
                    className={cx(
                      "font-display text-cream",
                      index === 0 ? "text-xl sm:text-3xl" : "text-base sm:text-xl",
                    )}
                  >
                    {sector.name}
                  </h3>
                  <p className="mt-1 max-w-xs text-[0.7rem] leading-snug text-cream/80 sm:text-sm">{sector.line}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">{t.home.sectors.footer}</p>
      </Container>
    </Section>
  );
}

function Studio() {
  const { t } = useLanguage();
  return (
    <Section tone="cream">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2.5rem] bg-sand" aria-hidden="true" />
            <Parallax className="relative">
              <Photo
                name={t.home.studio.image as never}
                alt={t.home.studio.photoAlt}
                className="relative aspect-[4/5] w-full rounded-[2.5rem]"
                imgClassName="object-cover"
                sizes="(min-width: 1024px) 440px, 90vw"
              />
            </Parallax>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow={t.home.studio.eyebrow}
              title={t.home.studio.title}
              intro={t.home.studio.body}
            />
            <ul className="mt-7 grid gap-3">
              {t.home.studio.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[0.98rem] text-muted">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <figure className="glass-panel mt-9 rounded-3xl p-6 sm:p-7">
              <figcaption className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-clay">
                {t.home.studio.noteTitle}
              </figcaption>
              <blockquote className="mt-3 font-display text-lg leading-relaxed text-forest sm:text-xl">
                “{t.home.studio.note}”
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-ink">{t.home.studio.signature}</p>
            </figure>
            <TextLink to="/about" className="mt-6">
              {t.home.studio.more}
            </TextLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function WorkPreview() {
  const { t } = useLanguage();
  return (
    <Section tone="sand">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={t.home.work.eyebrow} title={t.home.work.title} intro={t.home.work.intro} />
          <TextLink to="/case-studies" className="shrink-0">
            {t.home.work.more}
          </TextLink>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {t.home.work.cards.map((card, index) => (
            <Reveal key={card.project} delay={index * 0.08}>
              <article className="group card h-full overflow-hidden transition-all duration-500 ease-editorial hover:-translate-y-1 hover:shadow-lift">
                <Photo
                  name={card.image as never}
                  alt={card.alt}
                  className="aspect-[16/10] w-full"
                  imgClassName="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]"
                  sizes="(min-width: 768px) 560px, 100vw"
                />
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-forest/70">
                    <span className="text-clay">{card.project}</span>
                    <span className="h-px w-4 bg-line" aria-hidden="true" />
                    {card.kind}
                  </div>
                  <h3 className="mt-3 text-2xl leading-snug">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
                  <ul className="mt-4 space-y-2">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-forest">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest/70" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-muted">{t.home.work.note}</p>
      </Container>
    </Section>
  );
}

function FinalContact() {
  const { t } = useLanguage();
  return (
    <Section id="contact" tone="forest" className="grain scroll-mt-24">
      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.02fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <Eyebrow tone="cream">{t.home.cta.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-display-lg text-cream balance">
              <RichText text={t.home.cta.title} tone="cream" />
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-cream/70">{t.home.cta.body}</p>
            <ul className="mt-8 space-y-4">
              {t.contact.next.map((step, index) => (
                <li key={step.title} className="flex items-start gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cream/25 font-display text-sm italic text-cream/80">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-cream">{step.title}</p>
                    <p className="text-sm leading-relaxed text-cream/70">{step.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <AuditForm id="audit-form" />
        </div>
      </Container>
    </Section>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <>
      <PageMeta page="home" />
      <Hero />
      <CityMarquee />
      <Pain />
      <Services />
      <Process />
      <Sectors />
      <Studio />
      <WorkPreview />
      <FaqSection items={t.home.faq.items} />
      <FinalContact />
    </>
  );
}
