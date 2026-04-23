/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import ptBR from "./locales/pt-BR";
import enUS from "./locales/en-US";
import esES from "./locales/es-ES";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type Locale = "pt-BR" | "en-US" | "es-ES";

export type Translations = typeof ptBR;

const localeMap: Record<Locale, Translations> = {
  "pt-BR": ptBR,
  "en-US": enUS,
  "es-ES": esES,
};

export const localeLabels: Record<Locale, string> = {
  "pt-BR": "Português",
  "en-US": "English",
  "es-ES": "Español",
};

// ─── Contexto ─────────────────────────────────────────────────────────────────

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

function detectBrowserLocale(): Locale {
  const lang = navigator.language;
  if (lang.startsWith("pt")) return "pt-BR";
  if (lang.startsWith("es")) return "es-ES";
  return "en-US";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem("amigomeu-locale") as Locale | null;
    if (saved && localeMap[saved]) return saved;
    return detectBrowserLocale();
  });

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("amigomeu-locale", newLocale);
  };

  return (
    <I18nContext.Provider
      value={{ locale, t: localeMap[locale], setLocale: handleSetLocale }}
    >
      {children}
    </I18nContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
