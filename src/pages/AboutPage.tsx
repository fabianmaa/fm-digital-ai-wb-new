import { Check, MapPin } from "lucide-react";
import { CITIES } from "../constants/site";
import { useLanguage } from "../i18n/LanguageProvider";
import { PageMeta } from "../i18n/PageMeta";
import { CtaBand } from "../components/sections";
import {
  AuditButton,
  Container,
  Eyebrow,
  Parallax,
  Photo,
  Reveal,
  RichText,
  Section,
  SectionHeading,
  TextLink,
} from "../components/ui";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageMeta page="about" />

      <Section tone="paper" className="overflow-hidden pb-16 pt-28 sm:pt-32 lg:pt-36">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <Eyebrow>{t.about.hero.eyebrow}</Eyebrow>
              <h1 className="mt-6 text-display-lg balance">
                <RichText text={t.about.hero.title} />
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                {t.about.hero.lead}
              </p>
              <div className="mt-8">
                <AuditButton />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="relative mx-auto w-full max-w-[440px]">
              <div
                className="arch absolute -right-3 -top-3 h-full w-full border border-forest/20"
                aria-hidden="true"
              />
              <Parallax className="relative">
                <Photo
                  name="shop-owner"
                  alt={t.about.hero.imageAlt}
                  className="arch relative aspect-[4/5] w-full"
                  sizes="(min-width: 1024px) 440px, 90vw"
                />
              </Parallax>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <SectionHeading title={t.about.story.title} className="lg:sticky lg:top-28" />
            </div>
            <div className="space-y-6">
              {t.about.story.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow={t.about.hero.eyebrow} title={t.about.values.title} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {t.about.values.items.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.05}>
                <article className="h-full rounded-3xl border border-line bg-cream p-7 transition-all duration-500 ease-editorial hover:-translate-y-1 hover:shadow-soft">
                  <span className="font-display text-sm italic text-clay/70">0{index + 1}</span>
                  <h3 className="mt-4 text-2xl leading-snug">{value.title}</h3>
                  <p className="mt-2.5 text-[0.98rem] leading-relaxed text-muted">{value.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
              <div
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2.5rem] bg-paper"
                aria-hidden="true"
              />
              <Parallax className="relative">
                <Photo
                  name={t.about.studio.image as never}
                  alt={t.about.studio.photoAlt}
                  className="relative aspect-[4/5] w-full rounded-[2.5rem]"
                  sizes="(min-width: 1024px) 420px, 90vw"
                />
              </Parallax>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow={t.about.studio.eyebrow}
                title={t.about.studio.title}
                intro={t.about.studio.body}
              />
              <ul className="mt-6 grid gap-3">
                {t.about.studio.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[0.98rem] text-muted">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <figure className="mt-8 rounded-3xl border border-line bg-paper p-6 sm:p-7">
                <figcaption className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-clay">
                  {t.about.studio.noteTitle}
                </figcaption>
                <blockquote className="mt-3 font-display text-xl leading-relaxed text-forest">
                  “{t.about.studio.note}”
                </blockquote>
              </figure>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading title={t.about.area.title} intro={t.about.area.body} />
              <div className="mt-8">
                <TextLink to="/contact">{t.common.freeAudit}</TextLink>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {CITIES.map((city) => (
                <li key={city} className="flex items-center gap-2 text-sm text-forest">
                  <MapPin className="h-3.5 w-3.5 text-clay" aria-hidden="true" />
                  {city}
                </li>
              ))}
              <li className="flex items-center gap-2 text-sm text-muted">
                <Check className="h-3.5 w-3.5 text-forest/60" aria-hidden="true" />
                {t.common.englishAndSpanish}
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
