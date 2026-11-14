import { Check } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import { PageMeta } from "../i18n/PageMeta";
import { AuditForm } from "../components/AuditForm";
import { FaqSection } from "../components/sections";
import {
  Container,
  Eyebrow,
  Reveal,
  RichText,
  Section,
  SectionHeading,
  TextLink,
} from "../components/ui";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageMeta page="contact" />
      <Section tone="paper" className="grain pb-16 pt-28 sm:pt-32 lg:pb-20 lg:pt-36">
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-x-16 lg:gap-y-8">
            <div className="lg:col-start-1 lg:row-start-1">
              <Reveal>
                <Eyebrow>{t.contact.hero.eyebrow}</Eyebrow>
                <h1 className="mt-6 text-display-lg balance">
                  <RichText text={t.contact.hero.title} />
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                  {t.contact.hero.lead}
                </p>
              </Reveal>
            </div>

            <Reveal
              delay={0.08}
              className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-28 lg:self-start"
            >
              <AuditForm />
            </Reveal>

            <div className="lg:col-start-1 lg:row-start-2">
              <Reveal delay={0.1}>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-forest/70">
                  {t.contact.nextTitle}
                </p>
                <ol className="mt-4 space-y-4">
                  {t.contact.next.map((step, index) => (
                    <li key={step.title} className="flex gap-4 border-t border-line pt-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-forest/25 font-display text-sm italic text-forest">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-semibold">{step.title}</p>
                        <p className="text-sm leading-relaxed text-muted">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-8 rounded-3xl border border-line bg-cream p-6">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-forest/70">
                    {t.contact.asideTitle}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {t.contact.aside.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 border-t border-line pt-4 text-sm text-muted">{t.contact.note}</p>
                  <div className="mt-3">
                    <TextLink to="/our-process" className="text-sm">
                      {t.common.seeProcess}
                    </TextLink>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <SectionHeading title={t.contact.areaTitle} eyebrow={t.contact.hero.eyebrow} />
            <div>
              <p className="text-lg leading-relaxed text-muted">{t.contact.areaBody}</p>
              <p className="mt-4 text-sm font-semibold text-forest">{t.common.englishAndSpanish}</p>
            </div>
          </div>
        </Container>
      </Section>

      <FaqSection
        eyebrow={t.contact.hero.eyebrow}
        title={t.contact.faqTitle}
        items={t.contact.faq}
        tone="paper"
      />
    </>
  );
}
