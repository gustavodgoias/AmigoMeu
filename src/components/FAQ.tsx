import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useI18n } from "../i18n";
import type { Locale } from "../i18n";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  kicker?: string;
  title?: string;
  subtitle?: string;
}

const faqCopyByLocale: Record<Locale, { kicker: string; title: string; subtitle: string }> = {
  "pt-BR": {
    kicker: "Suporte Amigo Meu",
    title: "Perguntas Frequentes",
    subtitle: "Dúvidas comuns sobre nossos produtos",
  },
  "en-US": {
    kicker: "Amigo Meu Support",
    title: "Frequently Asked Questions",
    subtitle: "Common questions about our products",
  },
  "es-ES": {
    kicker: "Soporte Amigo Meu",
    title: "Preguntas Frecuentes",
    subtitle: "Dudas comunes sobre nuestros productos",
  },
};

export default function FAQ({ items, kicker, title, subtitle }: FAQProps) {
  const { locale } = useI18n();
  const copy = faqCopyByLocale[locale];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-transparent">
      <div className="page-container">
        <div className="text-center mb-16 space-y-4">
          <span className="section-kicker">{kicker ?? copy.kicker}</span>
          <h2 className="heading-lg text-charcoal-900">{title ?? copy.title}</h2>
          <p className="text-body max-w-lg mx-auto">{subtitle ?? copy.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.slice(0, 9).map((item, index) => (
            <div 
              key={index}
              className={`glass-panel rounded-2xl overflow-hidden transition-all duration-500 flex flex-col h-full ${openIndex === index ? 'shadow-card' : 'hover:shadow-soft'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between group flex-grow min-h-[100px]"
              >
                <span className="font-bold text-charcoal-700 tracking-wide transition-colors group-hover:text-primary-500">
                  {item.question}
                </span>
                <div className={`p-2 rounded-full transition-all duration-500 shrink-0 ml-4 ${openIndex === index ? 'bg-primary-500 text-white rotate-180' : 'bg-charcoal-50 text-charcoal-400 group-hover:bg-primary-50 group-hover:text-primary-500'}`}>
                  {openIndex === index ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-8 pb-8 text-charcoal-500 font-light leading-relaxed border-t border-white/20 pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
