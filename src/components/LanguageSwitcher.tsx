import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n, localeLabels, type Locale } from "../i18n";

const labelsByLocale: Record<Locale, { aria: string }> = {
  "pt-BR": { aria: "Selecionar idioma" },
  "en-US": { aria: "Select language" },
  "es-ES": { aria: "Seleccionar idioma" },
};

const localeTokens: Record<Locale, string> = {
  "pt-BR": "PT",
  "en-US": "EN",
  "es-ES": "ES",
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const copy = labelsByLocale[locale];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const locales = Object.keys(localeLabels) as Locale[];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[0.75rem] font-bold tracking-[0.08em] uppercase text-charcoal-500 hover:text-charcoal-900 hover:bg-charcoal-50 transition-all duration-200"
        aria-label={copy.aria}
        aria-expanded={open}
      >
        <Globe strokeWidth={1.5} className="h-4 w-4" />
        <span>{localeTokens[locale]}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-charcoal-100 bg-white/95 backdrop-blur-xl shadow-card overflow-hidden z-50"
            role="listbox"
          >
            {locales.map((itemLocale) => (
              <li key={itemLocale} role="option" aria-selected={locale === itemLocale}>
                <button
                  onClick={() => {
                    setLocale(itemLocale);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                    locale === itemLocale
                      ? "bg-primary-50 text-primary-600 font-bold"
                      : "text-charcoal-600 hover:bg-charcoal-50"
                  }`}
                >
                  <span className="text-xs font-extrabold tracking-[0.14em]">{localeTokens[itemLocale]}</span>
                  <span>{localeLabels[itemLocale]}</span>
                  {locale === itemLocale && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-500" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
