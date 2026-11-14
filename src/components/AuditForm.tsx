import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { submitContact } from "../lib/contactApi";
import { Button, cx, TextLink } from "./ui";

type Values = {
  name: string;
  email: string;
  phone: string;
  website: string;
  message: string;
  website1: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: Values = { name: "", email: "", phone: "", website: "", message: "", website1: "" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function AuditForm({ className, id }: { className?: string; id?: string }) {
  const { t } = useLanguage();
  const formId = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const valid = values.name.trim().length > 1 && EMAIL.test(values.email.trim());
  const submitting = status === "submitting";

  const update = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!valid || submitting) return;

    if (values.website1) {
      setStatus("error");
      setMessage(t.form.honeypot);
      return;
    }

    setStatus("submitting");
    setMessage("");

    const result = await submitContact({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      website: values.website.trim(),
      message: values.message.trim(),
    });

    if (result.ok) {
      setValues(EMPTY);
      setStatus("success");
    } else {
      setStatus("error");
      setMessage(t.form.errorBody);
    }
  };

  if (status === "success") {
    return (
      <div id={id} className={cx("glass-panel relative rounded-4xl p-8 shadow-lift sm:p-10", className)} role="status" aria-live="polite">
        <CheckCircle2 className="h-10 w-10 text-forest" aria-hidden="true" />
        <h2 className="mt-5 text-display-sm">{t.form.successTitle}</h2>
        <p className="mt-3 max-w-md text-muted">{t.form.successBody}</p>
        <div className="mt-6">
          <TextLink to="/our-process">{t.nav.process}</TextLink>
        </div>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      noValidate
      className={cx("glass-panel relative rounded-4xl p-6 shadow-lift sm:p-8", className)}
      aria-labelledby={`${formId}-title`}
    >
      <h2 id={`${formId}-title`} className="text-display-sm">
        {t.form.title}
      </h2>
      <p className="mt-2 text-sm text-muted">{t.form.intro}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor={`${formId}-name`}>
            {t.form.name} <span className="text-clay">*</span>
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            className="field"
            value={values.name}
            onChange={update}
            placeholder={t.form.namePlaceholder}
            autoComplete="name"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label className="field-label" htmlFor={`${formId}-email`}>
            {t.form.email} <span className="text-clay">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            className="field"
            value={values.email}
            onChange={update}
            placeholder={t.form.emailPlaceholder}
            autoComplete="email"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label className="field-label" htmlFor={`${formId}-phone`}>
            {t.form.phone} <span className="font-normal text-muted">({t.common.optional})</span>
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            className="field"
            value={values.phone}
            onChange={update}
            placeholder={t.form.phonePlaceholder}
            autoComplete="tel"
          />
        </div>
        <div>
          <label className="field-label" htmlFor={`${formId}-website`}>
            {t.form.website} <span className="font-normal text-muted">({t.common.optional})</span>
          </label>
          <input
            id={`${formId}-website`}
            name="website"
            type="text"
            inputMode="url"
            className="field"
            value={values.website}
            onChange={update}
            placeholder={t.form.websitePlaceholder}
            autoComplete="url"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor={`${formId}-message`}>
            {t.form.message} <span className="font-normal text-muted">({t.common.optional})</span>
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={4}
            className="field resize-none"
            value={values.message}
            onChange={update}
            placeholder={t.form.messagePlaceholder}
          />
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive technology, checked before sending. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <input
          id={`${formId}-website1`}
          name="website1"
          tabIndex={-1}
          autoComplete="off"
          value={values.website1}
          onChange={update}
        />
      </div>

      <Button type="submit" className="mt-6 w-full" disabled={!valid || submitting} arrow={false}>
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {t.form.submitting}
          </>
        ) : (
          <>
            {t.form.submit}
            <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>

      <p className="mt-3 text-center text-xs text-muted">{t.form.requiredNote}</p>
      <p className="mt-1 text-center text-xs text-muted">{t.form.privacyNote}</p>

      <div aria-live="polite" role="status" className="min-h-[1rem]">
        {status === "error" && message ? (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-clay/30 bg-clay/5 p-4 text-sm text-clay">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold">{t.form.errorTitle}</p>
              <p className="mt-1 text-clay/90">{message}</p>
            </div>
          </div>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">
        {status === "submitting" ? t.form.sendingLabel : ""}
      </p>
      <p className="mt-4 text-center text-xs text-muted">
        <TextLink to="/privacy" className="text-xs">
          {t.footer.privacy}
        </TextLink>
      </p>
    </form>
  );
}
