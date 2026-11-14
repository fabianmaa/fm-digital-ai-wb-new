import { Check, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import { PageMeta } from "../i18n/PageMeta";
import { CtaBand, FaqSection, PageHero } from "../components/sections";
import { AuditButton, Container, Reveal, Section, SectionHeading } from "../components/ui";

export default function OurProcessPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageMeta page="process" />
      <PageHero eyebrow={t.process.hero.eyebrow} title={t.process.hero.title} lead={t.process.hero.lead}>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <AuditButton />
          <span className="text-sm text-muted">{t.common.auditMicro}</span>
        </div>
      </PageHero>

      <Section tone="cream" className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="space-y-4">
            {t.process.steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.05}>
                <article className="grid gap-6 rounded-4xl border border-line bg-paper p-7 sm:grid-cols-[auto_1fr] sm:p-9">
                  <span className="font-display text-5xl italic leading-none text-clay/40">{step.number}</span>
                  <div>
                    <h2 className="text-display-sm">{step.title}</h2>
                    <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{step.body}</p>
                    <p className="mt-4 flex items-start gap-2.5 border-t border-line pt-4 text-sm font-semibold text-forest">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {step.detail}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <SectionHeading title={t.process.needTitle} />
              <ul className="mt-6 space-y-3">
                {t.process.needs.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[1.02rem] text-muted">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading title={t.process.wontTitle} />
              <ul className="mt-6 space-y-3">
                {t.process.wonts.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[1.02rem] text-muted">
                    <X className="mt-1 h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <FaqSection
        eyebrow={t.process.hero.eyebrow}
        title={t.process.faqTitle}
        items={t.process.faq}
        tone="paper"
      />

      <CtaBand />
    </>
  );
}
