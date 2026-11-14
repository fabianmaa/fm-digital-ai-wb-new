import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { copy, type Lang } from "../constants/copy";

type Leaf = { en: string; es: string };

type LocalizedValue<T> = T extends Leaf
  ? string
  : T extends ReadonlyArray<infer U>
    ? LocalizedValue<U>[]
    : { [K in keyof T]: LocalizedValue<T[K]> };

export type Copy = LocalizedValue<typeof copy>;

function localize<T>(node: T, lang: Lang): LocalizedValue<T> {
  if (node !== null && typeof node === "object") {
    const maybeLeaf = node as unknown as Partial<Leaf>;
    if (typeof maybeLeaf.en === "string" && typeof maybeLeaf.es === "string") {
      return (node as unknown as Leaf)[lang] as LocalizedValue<T>;
    }
    if (Array.isArray(node)) {
      return node.map((item) => localize(item, lang)) as LocalizedValue<T>;
    }
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(node as Record<string, unknown>)) {
      result[key] = localize((node as Record<string, unknown>)[key], lang);
    }
    return result as LocalizedValue<T>;
  }
  return node as LocalizedValue<T>;
}

export function languageFromPath(pathname: string): Lang {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

/** Adds or removes the /es prefix of a path, keeping the rest identical. */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === "en") return clean.replace(/^\/es(?=\/|$)/, "") || "/";
  if (clean === "/es" || clean.startsWith("/es/")) return clean;
  return clean === "/" ? "/es" : `/es${clean}`;
}

type LanguageContextValue = {
  lang: Lang;
  t: Copy;
  lp: (path: string) => string;
  otherLangPath: (pathname?: string) => string;
  setLanguage: (lang: Lang) => void;
  switchLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = languageFromPath(location.pathname);
  const t = useMemo(() => localize(copy, lang), [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const lp = useCallback((path: string) => localizePath(path, lang), [lang]);

  const otherLangPath = useCallback(
    (pathname?: string) => localizePath(pathname ?? location.pathname, lang === "en" ? "es" : "en"),
    [lang, location.pathname],
  );

  const setLanguage = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      navigate(localizePath(location.pathname, next) + location.search + location.hash);
    },
    [lang, location.hash, location.pathname, location.search, navigate],
  );

  const switchLanguage = useCallback(() => {
    setLanguage(lang === "en" ? "es" : "en");
  }, [lang, setLanguage]);

  const value = useMemo(
    () => ({ lang, t, lp, otherLangPath, setLanguage, switchLanguage }),
    [lang, t, lp, otherLangPath, setLanguage, switchLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return context;
}
