import { Check } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import { PageMeta } from "../i18n/PageMeta";
import { CtaBand, PageHero, ServiceCards } from "../components/sections";
import {
  AuditButton,
  Container,
  Eyebrow,
  Reveal,
  Section,
  SectionHeading,
  TextLink,
} from "../components/ui";

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageMeta page="services" />
      <PageHero
        eyebrow={t.services.hub.eyebrow}
        title={t.services.hub.title}
        lead={t.services.hub.lead}
        tone="paper"
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <AuditButton />
          <TextLink to="/our-process">{t.common.seeProcess}</TextLink>
        </div>
      </PageHero>

      <Section tone="paper" className="pb-16 pt-0 sm:pb-20 sm:pt-0 lg:pb-24 lg:pt-0">
        <Container>
          <SectionHeading title={t.services.hub.cardsTitle} className="mb-8 max-w-2xl" />
          <ServiceCards tone="light" />
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading
            eyebrow={t.home.services.eyebrow}
            title={t.services.hub.principlesTitle}
            className="max-w-2xl"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {t.services.hub.principles.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <div className="h-full border-t border-forest/25 pt-6">
                  <span className="font-display text-sm italic text-clay/70">0{index + 1}</span>
                  <h3 className="mt-3 text-xl leading-snug">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="glass-panel grid items-center gap-10 rounded-4xl p-8 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
            <div>
              <Eyebrow>{t.home.cta.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-display-md balance">{t.services.hub.helpTitle}</h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{t.services.hub.helpBody}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {t.contact.aside.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:justify-self-end">
              <AuditButton className="w-full justify-between px-7 py-4 sm:w-auto" />
              <p className="mt-4 text-sm text-muted">{t.common.auditMicro}</p>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
