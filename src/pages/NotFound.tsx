import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "../i18n";
import type { Locale } from "../i18n";

const notFoundCopyByLocale: Record<Locale, { codeLabel: string }> = {
  "pt-BR": { codeLabel: "Erro 404" },
  "en-US": { codeLabel: "Error 404" },
  "es-ES": { codeLabel: "Error 404" },
};

export default function NotFound() {
  const { t, locale } = useI18n();
  const copy = notFoundCopyByLocale[locale];
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-white relative overflow-hidden">
      <Helmet>
        <title>{t.notFound.title} {t.notFound.titleHighlight} | Amigo Meu</title>
      </Helmet>

      {/* Depth elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="page-container relative z-10 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <span className="text-primary-500 font-bold tracking-[0.3em] uppercase text-sm">{copy.codeLabel}</span>
          <h1 className="heading-xl text-charcoal-900">{t.notFound.title} <span className="text-primary-500 italic font-light">{t.notFound.titleHighlight}</span></h1>
          <p className="text-body max-w-md mx-auto">{t.notFound.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <Link to="/" className="btn-primary flex items-center gap-2">
            <Home className="h-4 w-4" />
            {t.notFound.btnHome}
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="btn-outline flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.notFound.btnBack}
          </button>
        </motion.div>
      </div>
    </main>
  );
}
