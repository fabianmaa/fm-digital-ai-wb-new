import { Check } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import { PageMeta } from "../i18n/PageMeta";
import { CtaBand, PageHero } from "../components/sections";
import { Container, Photo, Reveal, Section, cx } from "../components/ui";

export default function CaseStudiesPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageMeta page="work" />
      <PageHero eyebrow={t.work.hero.eyebrow} title={t.work.hero.title} lead={t.work.hero.lead} />

      <Section tone="paper" className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="space-y-16 lg:space-y-24">
            {t.work.projects.map((project, index) => (
              <article
                key={project.project}
                className="grid items-center gap-10 border-t border-line pt-12 lg:grid-cols-2 lg:gap-16 lg:pt-16"
              >
                <Reveal className={cx("relative", index % 2 === 1 && "lg:order-2")}>
                  <Photo
                    name={project.image as never}
                    alt={project.alt}
                    className="aspect-[4/3] w-full rounded-4xl"
                    sizes="(min-width: 1024px) 560px, 92vw"
                  />
                  <div
                    className="absolute -bottom-3 -right-3 h-24 w-24 rounded-3xl border border-forest/15"
                    aria-hidden="true"
                  />
                </Reveal>
                <Reveal delay={0.08}>
                  <div className="flex flex-wrap items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-forest/70">
                    <span className="text-clay">{project.project}</span>
                    <span className="h-px w-4 bg-line" aria-hidden="true" />
                    {project.kind}
                  </div>
                  <h2 className="mt-4 text-display-md balance">{project.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{project.context}</p>

                  <div className="mt-7 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-forest/70">
                        {project.didTitle}
                      </h3>
                      <ul className="mt-3 space-y-2.5">
                        {project.did.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-forest/70">
                        {project.changedTitle}
                      </h3>
                      <ul className="mt-3 space-y-2.5">
                        {project.changed.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-forest">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest/60" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-4xl border border-line bg-cream p-7 sm:p-9">
            <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-clay">
              {t.work.noteTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">{t.work.note}</p>
          </div>
        </Container>
      </Section>

      <CtaBand title={t.work.ctaTitle} body={t.work.ctaBody} />
    </>
  );
}
