import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CITIES, SITE_URL } from "../constants/site";
import { useLanguage, type Copy } from "./LanguageProvider";

type MetaKey = keyof Copy["meta"];

function setMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
}

function setLink(id: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[data-fm="${id}"]`);
  if (!element) {
    element = document.createElement("link");
    element.dataset.fm = id;
    document.head.appendChild(element);
  }
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
}

/**
 * Sets the localized title, description, canonical URL and hreflang pair for the
 * current route. This is a client-rendered site, so these tags are applied on
 * mount and on every language or route change.
 */
export function PageMeta({
  page,
  title,
  description,
}: {
  page: MetaKey;
  title?: string;
  description?: string;
}) {
  const { lang, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const meta = t.meta[page];
    const pageTitle = title ?? meta.title;
    const pageDescription = description ?? meta.description;
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const enPath = path.replace(/^\/es(?=\/|$)/, "") || "/";
    const esPath = enPath === "/" ? "/es" : `/es${enPath}`;
    const canonical = `${SITE_URL}${path === "/" ? "/" : path}`;
    const ogImage = `${SITE_URL}/images/og-cover.jpg`;

    document.title = pageTitle;

    setMeta('meta[name="description"]', { name: "description", content: pageDescription });
    setMeta('meta[property="og:title"]', { property: "og:title", content: pageTitle });
    setMeta('meta[property="og:description"]', {
      property: "og:description",
      content: pageDescription,
    });
    setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    setMeta('meta[property="og:image"]', { property: "og:image", content: ogImage });
    setMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: lang === "es" ? "es_US" : "en_US",
    });
    setMeta('meta[property="og:locale:alternate"]', {
      property: "og:locale:alternate",
      content: lang === "es" ? "en_US" : "es_US",
    });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: pageTitle });
    setMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: pageDescription,
    });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: ogImage });

    setLink("canonical", { rel: "canonical", href: canonical });
    setLink("alternate-en", {
      rel: "alternate",
      hreflang: "en",
      href: `${SITE_URL}${enPath === "/" ? "/" : enPath}`,
    });
    setLink("alternate-es", { rel: "alternate", hreflang: "es", href: `${SITE_URL}${esPath}` });
    setLink("alternate-default", {
      rel: "alternate",
      hreflang: "x-default",
      href: `${SITE_URL}${enPath === "/" ? "/" : enPath}`,
    });

    const existing = document.getElementById("fm-structured-data");
    if (existing) existing.remove();

    if (page === "home") {
      const script = document.createElement("script");
      script.id = "fm-structured-data";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "FM Digital AI",
        url: SITE_URL,
        image: ogImage,
        logo: `${SITE_URL}/images/logo-512.png`,
        description: pageDescription,
        areaServed: CITIES.map((city) => ({ "@type": "City", name: city })),
        knowsLanguage: ["en", "es"],
      });
      document.head.appendChild(script);
    }
  }, [lang, location.pathname, page, t, title, description]);

  return null;
}
