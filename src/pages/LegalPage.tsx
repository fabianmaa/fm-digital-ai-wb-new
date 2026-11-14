import { useLanguage } from "../i18n/LanguageProvider";
import { PageMeta } from "../i18n/PageMeta";
import { Container, Eyebrow, Section, TextLink } from "../components/ui";

export default function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { t } = useLanguage();
  const page = kind === "privacy" ? t.legal.privacy : t.legal.terms;

  return (
    <>
      <PageMeta page={kind} />
      <Section tone="paper" className="pb-20 pt-28 sm:pt-32 lg:pt-36">
        <Container className="max-w-3xl">
          <Eyebrow>FM Digital AI</Eyebrow>
          <h1 className="mt-6 text-display-lg">{page.title}</h1>
          <p className="mt-3 text-sm text-muted">{t.legal.updated}</p>
          <p className="mt-6 text-lg leading-relaxed text-muted">{page.intro}</p>

          <div className="mt-10 space-y-9 border-t border-line pt-9">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl leading-snug">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-[1.02rem] leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <TextLink to="/contact">{t.common.freeAudit}</TextLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
