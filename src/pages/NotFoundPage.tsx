import { useLanguage } from "../i18n/LanguageProvider";
import { PageMeta } from "../i18n/PageMeta";
import { AuditButton, Container, Eyebrow, RichText, Section, TextLink } from "../components/ui";

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageMeta page="notFound" />
      <Section tone="paper" className="pb-28 pt-36 sm:pt-44">
        <Container className="max-w-2xl text-center">
          <Eyebrow className="justify-center">{t.notFound.eyebrow}</Eyebrow>
          <p className="mt-4 font-display text-[5rem] italic leading-none text-clay/25 sm:text-[7rem]">404</p>
          <h1 className="mt-2 text-display-md balance">
            <RichText text={t.notFound.title} />
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted">{t.notFound.body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <AuditButton />
            <TextLink to="/">{t.common.backHome}</TextLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
