import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInSection } from "./Home";
import FAQ from "../components/FAQ";
import { useI18n } from "../i18n";
import type { Locale } from "../i18n";

type FAQItem = {
  question: string;
  answer: string;
};

const toppersAssets = [
  {
    id: "frango",
    image: "/images/produtos/AMIGOMEU-TOPPER-FRANGO-100G.png",
    accentColor: "#C8A21A",
    btnBg: "#C8A21A",
    btnHover: "#a08010",
    bgTint: "#C8A21A15",
  },
  {
    id: "carne",
    image: "/images/produtos/AMIGOMEU-TOPPER-CARNE-100G.png",
    accentColor: "#b53c2f",
    btnBg: "#b53c2f",
    btnHover: "#8f2d23",
    bgTint: "#b53c2f15",
  },
  {
    id: "figado",
    image: "/images/produtos/AMIGOMEU-TOPPER-FIGADO-100G.png",
    accentColor: "#5c2a7f",
    btnBg: "#5c2a7f",
    btnHover: "#431f5c",
    bgTint: "#5c2a7f15",
  },
];

const flavorTopicsByLocale: Record<Locale, Record<string, string[]>> = {
  "pt-BR": {
    frango: [
      "Proteína de frango de alta aceitação",
      "Aroma que estimula o apetite de cães seletivos",
      "Textura crocante para enriquecer a refeição",
      "Uso diário sem alterar a rotina do tutor",
    ],
    carne: [
      "Perfil de sabor intenso para reforçar palatabilidade",
      "Apoio energético para cães ativos",
      "Combinação ideal com rações secas premium",
      "Excelente opção para rotação de sabores",
    ],
    figado: [
      "Sabor altamente atrativo em fase de adaptação alimentar",
      "Topper funcional para melhorar o interesse pela refeição",
      "Aroma marcante com porção prática",
      "Recomendado para momentos de baixa ingestão",
    ],
  },
  "en-US": {
    frango: [
      "Chicken-forward protein profile with high acceptance",
      "Aroma that boosts appetite for picky dogs",
      "Crunchy texture that upgrades regular meals",
      "Easy daily use with no routine disruption",
    ],
    carne: [
      "Strong savory flavor to improve palatability",
      "Energy support for active dogs",
      "Great match for dry premium kibble",
      "Ideal option for flavor rotation plans",
    ],
    figado: [
      "Highly attractive taste for food transition phases",
      "Functional topper to increase meal interest",
      "Distinct aroma in a practical serving format",
      "Useful during temporary low-intake periods",
    ],
  },
  "es-ES": {
    frango: [
      "Perfil de pollo con alta aceptación",
      "Aroma que estimula apetito en perros selectivos",
      "Textura crocante para enriquecer la racion",
      "Uso diario simple para el tutor",
    ],
    carne: [
      "Sabor intenso para mejorar palatabilidad",
      "Soporte energético para perros activos",
      "Excelente combinación con alimento seco",
      "Buena opción para rotación de sabores",
    ],
    figado: [
      "Sabor muy atractivo en fases de adaptación",
      "Topper funcional para aumentar interés al comer",
      "Aroma marcado en porción práctica",
      "Recomendado en períodos de baja ingesta",
    ],
  },
};

const toppersFaqExtrasByLocale: Record<Locale, FAQItem[]> = {
  "pt-BR": [
    {
      question: "Qual a quantidade diária recomendada de topper?",
      answer:
        "A quantidade varia por porte e nível de atividade. Comece com porção pequena sobre a refeição e ajuste progressivamente conforme aceitação e orientação do veterinário.",
    },
    {
      question: "Posso alternar os sabores durante a semana?",
      answer:
        "Sim. A rotação de sabores entre frango, carne e fígado ajuda a manter o interesse alimentar sem complicar a rotina.",
    },
    {
      question: "Topper pode ser usado com ração úmida e seca?",
      answer:
        "Pode. A fórmula foi pensada para funcionar em ambos os formatos, trazendo mais aroma e textura para a refeição.",
    },
    {
      question: "Serve para cães idosos com apetite reduzido?",
      answer:
        "Sim, muitos tutores usam para estimular o interesse alimentar em cães seniores. Sempre vale validar o ajuste de porção com o veterinário.",
    },
    {
      question: "Como armazenar depois de aberto?",
      answer:
        "Mantenha em local seco e fresco, com embalagem bem fechada, para preservar crocância, aroma e qualidade do produto.",
    },
    {
      question: "Topper ajuda em rotina de treinamento?",
      answer:
        "Sim. Pode ser usado como reforço de valor na rotina de treino, por ser altamente palatável e prático de porcionar.",
    },
  ],
  "en-US": [
    {
      question: "What is the recommended daily topper amount?",
      answer:
        "Amount depends on size and activity level. Start with a small serving and adjust gradually based on acceptance and veterinary guidance.",
    },
    {
      question: "Can I rotate flavors during the week?",
      answer:
        "Yes. Flavor rotation between chicken, beef, and liver helps maintain meal interest while keeping feeding routines simple.",
    },
    {
      question: "Can toppers be used with dry and wet food?",
      answer:
        "Yes. The formula is designed to work with both formats, adding aroma and texture to regular feeding.",
    },
    {
      question: "Is it suitable for senior dogs with reduced appetite?",
      answer:
        "Yes. Many pet parents use toppers to support appetite in senior dogs. Portion adjustments should follow veterinary advice.",
    },
    {
      question: "How should I store the product after opening?",
      answer:
        "Keep it in a cool, dry place with the pack well sealed to preserve crunchiness, aroma, and product quality.",
    },
    {
      question: "Can toppers support training routines?",
      answer:
        "Yes. They can be used as high-value reinforcement in training sessions due to strong palatability and practical serving.",
    },
  ],
  "es-ES": [
    {
      question: "¿Cuál es la cantidad diaria recomendada?",
      answer:
        "Depende del tamaño y nivel de actividad. Inicia con porción pequeña y ajusta gradualmente según aceptación y orientación veterinaria.",
    },
    {
      question: "¿Puedo alternar sabores en la semana?",
      answer:
        "Sí. Rotar entre pollo, carne e hígado ayuda a mantener interés por la comida sin cambiar la rutina.",
    },
    {
      question: "¿Se puede usar con alimento seco y húmedo?",
      answer:
        "Sí. La fórmula funciona bien en ambos formatos para sumar aroma y textura en cada porción.",
    },
    {
      question: "¿Sirve para perros mayores con bajo apetito?",
      answer:
        "Sí. Es común usar topper para estimular interés en perros senior. Ajustes de porción deben seguir criterio veterinario.",
    },
    {
      question: "¿Cómo conservar el producto después de abrir?",
      answer:
        "Guardar en sitio seco y fresco con empaque bien cerrado para mantener crocancia y calidad del producto.",
    },
    {
      question: "¿Puede ayudar en entrenamiento?",
      answer:
        "Sí. Funciona como refuerzo de alto valor por su palatabilidad y facilidad de porcionado.",
    },
    {
      question: "¿Es compatible con rutinas de control de peso?",
      answer:
        "Sí, usando porciones controladas dentro del plan nutricional definido para cada perro.",
    },
    {
      question: "¿Puede usarse todos los días?",
      answer:
        "Sí, siempre dentro de una dieta equilibrada y respetando la porción recomendada para el perfil del animal.",
    },
  ],
};

const faqTextByLocale: Record<Locale, { title: string; subtitle: string }> = {
  "pt-BR": {
    title: "Perguntas sobre Toppers",
    subtitle: "Respostas objetivas para usar toppers com segurança e mais resultado no dia a dia.",
  },
  "en-US": {
    title: "Topper Questions",
    subtitle: "Practical guidance to use toppers with consistency, safety, and better feeding outcomes.",
  },
  "es-ES": {
    title: "Preguntas sobre Toppers",
    subtitle: "Guía rápida para uso diario con seguridad y mayor aceptación alimentaria.",
  },
};

const toppersPageCopyByLocale: Record<
  Locale,
  {
    heroAlt: string;
    selectFlavor: string;
    availableFlavors: string;
    favoriteFlavor: string;
  }
> = {
  "pt-BR": {
    heroAlt: "Cão feliz com Toppers Amigo Meu",
    selectFlavor: "Selecione o sabor:",
    availableFlavors: "Sabores disponíveis",
    favoriteFlavor: "Escolha o favorito do seu pet",
  },
  "en-US": {
    heroAlt: "Happy dog with Amigo Meu Toppers",
    selectFlavor: "Select the flavor:",
    availableFlavors: "Available flavors",
    favoriteFlavor: "Choose your pet's favorite",
  },
  "es-ES": {
    heroAlt: "Perro feliz con Toppers Amigo Meu",
    selectFlavor: "Selecciona el sabor:",
    availableFlavors: "Sabores disponibles",
    favoriteFlavor: "Elige el favorito de tu mascota",
  },
};

export default function Toppers() {
  const { t, locale } = useI18n();
  const [activeProduct, setActiveProduct] = useState(0);

  const toppersProducts = toppersAssets.map((asset, idx) => ({
    ...t.toppers.products[idx],
    ...asset,
  }));

  const current = toppersProducts[activeProduct];
  const toppersFaqItems = [...t.toppers.faq, ...toppersFaqExtrasByLocale[locale]];
  const faqContent = faqTextByLocale[locale];
  const pageCopy = toppersPageCopyByLocale[locale];

  return (
    <main className="overflow-hidden bg-white">
      <Helmet>
        <title>{t.toppers.pageTitle} | Amigo Meu</title>
        <meta name="description" content={t.toppers.pageSubtitle} />
      </Helmet>

      {/* Dynamic Hero — Brand Color Block */}
      <section 
        className="relative h-[100dvh] flex items-center overflow-hidden pt-20 transition-colors duration-700"
        style={{ backgroundColor: current.accentColor }}
      >
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-[450px] lg:h-full z-0">
          <motion.img
            src="/images/hero-toppers.png"
            alt={pageCopy.heroAlt}
            className="w-full h-full object-cover object-center opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.2 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent hidden lg:block" />
          {toppersProducts.map((p, i) => (
            <div 
              key={p.id}
              className={`absolute inset-0 hidden lg:block transition-opacity duration-700 ${i === activeProduct ? "opacity-100" : "opacity-0"}`}
              style={{ 
                background: `linear-gradient(to right, ${p.accentColor} 0%, ${p.accentColor}1A 30%, transparent 100%)` 
              }} 
            />
          ))}

          <div className="absolute bottom-12 left-12 lg:left-24 z-20">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={current.id}
                src={current.image}
                alt={current.name}
                className="h-[180px] lg:h-[240px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
          </div>
        </div>

        <div className="page-container relative z-10 w-full">
          <div className="grid lg:grid-cols-2 items-center">
            <div className="py-24 lg:py-32 lg:pr-16 p-8 lg:p-0">
              <FadeInSection delay={50}>
                <motion.span
                  className="section-kicker !bg-white/10 !text-white !border-white/30 uppercase tracking-[0.2em]"
                >
                  {t.nav.toppers}
                </motion.span>
              </FadeInSection>
<br />
              <FadeInSection delay={130} className="mt-8">
                <h1 className="heading-xl leading-[0.95] !text-white uppercase tracking-tight">
                  {t.toppers.title}
                  <br />
                  <span className="text-white/80">
                    {t.toppers.titleHighlight}
                  </span>
                </h1>
              </FadeInSection>
<br />
              <FadeInSection delay={210} className="mt-8">
                <p className="text-[1.25rem] leading-relaxed text-white/90 max-w-md font-light">
                  {t.toppers.pageSubtitle}
                </p>
              </FadeInSection>

              <FadeInSection delay={290} className="mt-10">
                <div className="space-y-4">
                  <p className="text-[0.75rem] font-bold tracking-[0.2em] uppercase text-white/70">
                    {pageCopy.selectFlavor}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {toppersProducts.map((product, idx) => (
                      <button
                        key={product.id}
                        onClick={() => setActiveProduct(idx)}
                        className="px-5 py-2.5 text-[0.8rem] font-bold tracking-[0.1em] uppercase border-2 transition-all duration-300 cursor-pointer"
                        style={{
                          borderColor: idx === activeProduct ? "white" : "rgba(255,255,255,0.3)",
                          color: "white",
                          backgroundColor: idx === activeProduct ? "rgba(255,255,255,0.15)" : "transparent",
                        }}
                      >
                        {product.name}
                      </button>
                    ))}
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection delay={370} className="mt-12">
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/comprar"
                    className="px-8 py-4 bg-white text-[#1a1a1a] text-[0.85rem] font-black tracking-[0.15em] uppercase hover:bg-white/90 transition-all flex items-center gap-2 shadow-xl"
                  >
                    {t.nav.buy}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/b2b" className="px-8 py-4 border-2 border-white/40 text-white text-[0.85rem] font-bold tracking-[0.15em] uppercase hover:bg-white/10 transition-all">
                    {t.nav.b2b}
                  </Link>
                </div>
              </FadeInSection>
            </div>

            <div className="h-[450px] lg:h-0" />
          </div>
        </div>
      </section>

      {/* Product details with 4+ topics per flavor */}
      <section className="py-24 border-t border-[#e8e8e8] bg-white">
        <div className="page-container mb-24">
          <FadeInSection className="text-center">
            <span className="section-kicker">{pageCopy.availableFlavors}</span>
            <h2 className="heading-lg mt-4">{pageCopy.favoriteFlavor}</h2>
          </FadeInSection>
        </div>
        <div className="page-container">
          <div className="flex flex-col w-full gap-20">
            {toppersProducts.map((product, idx) => {
              const flavorTopics =
                flavorTopicsByLocale[locale][product.id] ??
                (product.badges ? product.badges.slice(0, 4) : []);

              return (
                <div key={product.id} className="w-full border border-[#e8e8e8] overflow-hidden group">
                  <FadeInSection delay={80}>
                    <div className="grid lg:grid-cols-2 min-h-[500px]">
                      <div
                        className={`relative flex items-center justify-center p-12 lg:p-20 ${
                          idx % 2 !== 0 ? "lg:order-2" : "lg:order-1"
                        }`}
                        style={{ backgroundColor: product.bgTint }}
                      >
                        <div
                          className="absolute top-0 left-0 w-full h-1"
                          style={{ backgroundColor: product.accentColor }}
                        />
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-[320px] w-auto object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
                        />
                      </div>

                      <div
                        className={`p-10 lg:p-20 bg-white flex flex-col justify-center gap-6 ${
                          idx % 2 !== 0 ? "lg:order-1" : "lg:order-2"
                        }`}
                      >
                        <div
                          className="text-[0.75rem] font-bold tracking-[0.25em] uppercase"
                          style={{ color: product.accentColor }}
                        >
                          {t.toppers.kicker}
                        </div>
                        <h2 className="text-[2.2rem] lg:text-[2.8rem] font-bold tracking-tight text-[#1a1a1a] leading-tight uppercase">
                          {product.name}
                        </h2>
                        <p className="text-[1.05rem] leading-relaxed text-[#666666] font-light max-w-lg">
                          {product.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                          {flavorTopics.slice(0, 4).map((topic) => (
                            <div
                              key={topic}
                              className="flex items-start gap-3 px-4 py-3 border"
                              style={{
                                borderColor: `${product.accentColor}33`,
                                background: `${product.accentColor}08`,
                              }}
                            >
                              <CheckCircle2
                                className="h-4 w-4 mt-[2px] shrink-0"
                                style={{ color: product.accentColor }}
                              />
                              <span className="text-[0.76rem] font-bold uppercase tracking-[0.06em] text-[#3c3c3c]">
                                {topic}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-8">
                          <Link
                            to="/comprar"
                            className="inline-flex items-center gap-2 px-8 py-4 text-white text-[0.85rem] font-bold tracking-[0.1em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl"
                            style={{ backgroundColor: product.btnBg }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = product.btnHover)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = product.btnBg)}
                          >
                            {t.nav.buy}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </FadeInSection>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[#e8e8e8]">
        <FAQ items={toppersFaqItems} title={faqContent.title} subtitle={faqContent.subtitle} />
      </section>
    </main>
  );
}
