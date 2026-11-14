import { SERVICE_IMAGES, type ServiceId } from "../constants/site";
import { useLanguage } from "../i18n/LanguageProvider";
import { PageMeta } from "../i18n/PageMeta";
import { CtaBand, FaqSection } from "../components/sections";
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

/**
 * One component drives all four service pages. The Spanish versions are the
 * same components with the /es prefix — there is no duplicated page tree.
 */
export function ServiceDetailPage({ id }: { id: ServiceId }) {
  const { t } = useLanguage();
  const service = t.services[id];

  return (
    <>
      <PageMeta page={id} />

      <Section tone="paper" className="overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Eyebrow>{service.hero.eyebrow}</Eyebrow>
              <h1 className="mt-6 text-display-lg balance">
                <RichText text={service.hero.title} />
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                {service.hero.lead}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <AuditButton className="px-7 py-4" />
                <TextLink to="/our-process">{t.common.seeProcess}</TextLink>
              </div>
              <p className="mt-4 text-sm text-muted">{t.common.auditMicro}</p>
            </div>
            <Reveal delay={0.1} className="relative mx-auto w-full max-w-[460px]">
              <div
                className="arch absolute -right-3 -top-3 h-full w-full border border-forest/20"
                aria-hidden="true"
              />
              <Parallax className="relative">
                <Photo
                  name={SERVICE_IMAGES[id]}
                  alt=""
                  className="arch relative aspect-[4/5] w-full"
                  sizes="(min-width: 1024px) 460px, 90vw"
                  priority
                />
              </Parallax>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="cream" className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
            <SectionHeading title={service.forWhoTitle} />
            <ul className="space-y-5">
              {service.forWho.map((line, index) => (
                <li key={line} className="flex gap-4 border-t border-line pt-5">
                  <span className="font-display text-sm italic text-clay/70">0{index + 1}</span>
                  <p className="text-lg leading-snug text-forest">{line}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeading title={service.whatTitle} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.what.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="h-full rounded-3xl border border-line bg-cream p-6 transition-all duration-500 ease-editorial hover:-translate-y-1 hover:shadow-soft">
                  <h3 className="text-xl leading-snug">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <SectionHeading title={service.howTitle} />
              <ol className="mt-10 space-y-8">
                {service.how.map((step, index) => (
                  <li key={step.title} className="border-t border-forest/20 pt-5">
                    <span className="font-display text-sm italic text-clay/70">0{index + 1}</span>
                    <h3 className="mt-2 text-xl leading-snug">{step.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <aside className="glass-panel h-fit rounded-4xl p-7 shadow-card lg:sticky lg:top-28">
              <Eyebrow>{service.priceTitle}</Eyebrow>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{service.price}</p>
              <AuditButton className="mt-6 w-full justify-between" />
              <p className="mt-3 text-xs text-muted">{t.common.auditMicroLong}</p>
            </aside>
          </div>
        </Container>
      </Section>

      <FaqSection eyebrow={t.common.faq} title={service.faqTitle} items={service.faq} tone="paper" />

      <CtaBand title={service.ctaTitle} body={service.ctaBody} />
    </>
  );
}
