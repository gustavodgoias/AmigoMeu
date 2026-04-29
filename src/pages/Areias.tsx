import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInSection } from "./Home";
import FAQ from "../components/FAQ";
import { useI18n } from "../i18n";
import type { Locale } from "../i18n";

type FAQItem = {
  question: string;
  answer: string;
};

type ComparisonRow = {
  feature: string;
  amigoMeu: string;
  generica: string;
};

const areiasAssets = [
  {
    id: "tradicional",
    image: "/images/produtos/AMIGO-MEU-2KG-2025-TRADICIONAL.png",
    accentColor: "#F37021",
    btnBg: "#F37021",
    btnHover: "#d65a10",
    bgTint: "#F3702115",
  },
  {
    id: "capim-limao",
    image: "/images/produtos/AMIGO-MEU-2KG-2025-CAPIM-LIMAO.png",
    accentColor: "#90C63E",
    btnBg: "#90C63E",
    btnHover: "#76a432",
    bgTint: "#90C63E15",
  },
  {
    id: "lavanda",
    image: "/images/produtos/AMIGO-MEU-2KG-2025-LAVANDA.png",
    accentColor: "#4aa8d8",
    btnBg: "#4aa8d8",
    btnHover: "#3990bd",
    bgTint: "#4aa8d815",
  },
];

const areiasFaqExtrasByLocale: Record<Locale, FAQItem[]> = {
  "pt-BR": [
    {
      question: "Qual é a frequência ideal para reposição completa da caixa?",
      answer:
        "Com manutenção diária dos torrões, a reposição completa costuma ser feita em um intervalo maior que o das areias minerais tradicionais, reduzindo descarte e custo mensal.",
    },
    {
      question: "A areia ajuda no controle de odor em apartamento pequeno?",
      answer:
        "Sim. A fórmula de mandioca neutraliza amônia de forma eficiente e reduz cheiro residual, principalmente quando a limpeza dos torrões é diária.",
    },
    {
      question: "Posso usar em casas com vários gatos?",
      answer:
        "Pode. A alta capacidade de absorção e a formação de torrões firmes tornam a linha indicada para lares com dois ou mais felinos, com boa performance em uso intenso.",
    },
    {
      question: "A areia gruda no fundo da caixa?",
      answer:
        "Quando usada na altura recomendada, a tendência de aderência é baixa. A retirada rápida dos torrões ajuda a manter a caixa limpa por mais tempo.",
    },
    {
      question: "Existe transição recomendada da areia antiga para a Amigo Meu?",
      answer:
        "Sim. A transição gradual em 5 a 7 dias aumenta a aceitação: inicie com 25% da nova areia e evolua progressivamente até 100%.",
    },
    {
      question: "A linha Super Premium possui opções com e sem fragrância?",
      answer:
        "Sim. Há versão tradicional sem fragrância e opções aromatizadas (capim-limão e lavanda), para adequar ao perfil do tutor e à sensibilidade do gato.",
    },
  ],
  "en-US": [
    {
      question: "How often should I fully replace the litter box content?",
      answer:
        "With daily clump removal, full replacement is usually less frequent than with mineral litters, reducing both waste and monthly operating cost.",
    },
    {
      question: "Does it help with odor control in small apartments?",
      answer:
        "Yes. The cassava formula neutralizes ammonia effectively and helps reduce residual odor, especially with consistent daily scooping.",
    },
    {
      question: "Can it be used in multi-cat homes?",
      answer:
        "Yes. High absorption and firm clumping make this line suitable for homes with two or more cats and heavier daily usage.",
    },
    {
      question: "Does the litter stick to the bottom of the tray?",
      answer:
        "When used at the recommended fill level, sticking is minimal. Prompt clump removal keeps the tray cleaner for longer.",
    },
    {
      question: "Is there a recommended transition from my current litter?",
      answer:
        "Yes. A gradual transition over 5 to 7 days improves acceptance: start with 25% of the new litter and increase progressively to 100%.",
    },
    {
      question: "Do you offer scented and unscented options?",
      answer:
        "Yes. The line includes an unscented original option and scented versions (lemongrass and lavender) to match each home preference.",
    },
  ],
  "es-ES": [
    {
      question: "¿Cada cuánto conviene cambiar toda la arena?",
      answer:
        "Con retiro diario de grumos, el cambio total suele ser menos frecuente que con arenas minerales, reduciendo residuos y costo mensual.",
    },
    {
      question: "¿Funciona bien en departamentos pequeños?",
      answer:
        "Sí. La base de mandioca ayuda a neutralizar amoníaco y reducir olor residual, sobre todo con limpieza diaria.",
    },
    {
      question: "¿Se puede usar en hogares con varios gatos?",
      answer:
        "Sí. Su alta absorción y grumo firme favorecen un buen rendimiento en rutinas de uso intensivo.",
    },
    {
      question: "¿La arena se pega al fondo de la caja?",
      answer:
        "Con la altura recomendada de producto, la adherencia es baja. Retirar grumos a tiempo mantiene la caja limpia por más días.",
    },
    {
      question: "¿Cómo hacer la transición desde otra arena?",
      answer:
        "Recomendamos transición gradual en 5 a 7 días: iniciar con 25% de la nueva arena y aumentar hasta llegar al 100%.",
    },
    {
      question: "¿Hay versión con y sin fragancia?",
      answer:
        "Sí. La línea incluye versión tradicional sin fragancia y versiones aromatizadas de hierba limón y lavanda.",
    },
    {
      question: "¿La textura es cómoda para patas sensibles?",
      answer:
        "Sí. La granulometría fue pensada para confort diario y menor arrastre fuera de la caja.",
    },
  ],
};

const areiasComparisonByLocale: Record<Locale, ComparisonRow[]> = {
  "pt-BR": [
    {
      feature: "Matéria-prima principal",
      amigoMeu: "Mandioca 100% vegetal e renovável",
      generica: "Argila mineral / bentonita extraída por mineração",
    },
    {
      feature: "Nível de poeira",
      amigoMeu: "Processo de tripla filtragem com 99,9% livre de poeira",
      generica: "Maior liberação de pó fino no manuseio",
    },
    {
      feature: "Controle de odor",
      amigoMeu: "Neutralização efetiva de amônia",
      generica: "Máscara parcial de odor por fragrância",
    },
    {
      feature: "Formação de torrão",
      amigoMeu: "Torrão rápido, firme e fácil de remover",
      generica: "Torrão mais frágil ou quebradiço",
    },
    {
      feature: "Rendimento por pacote",
      amigoMeu: "Maior durabilidade com menos troca total",
      generica: "Reposição completa mais frequente",
    },
    {
      feature: "Descarte diário",
      amigoMeu: "Descarte em pequenas porções no vaso sanitário",
      generica: "Descarte prioritariamente no lixo comum",
    },
    {
      feature: "Conforto das patas",
      amigoMeu: "Granulometria suave para contato diário",
      generica: "Textura pode ser mais abrasiva",
    },
    {
      feature: "Monitoramento de saúde",
      amigoMeu: "Cor clara ajuda a observar alterações na urina",
      generica: "Cor escura dificulta observação precoce",
    },
    {
      feature: "Impacto ambiental",
      amigoMeu: "Biodegradável com menor passivo ambiental",
      generica: "Resíduo mineral de baixa biodegradação",
    },
    {
      feature: "Argumento de valor no PDV",
      amigoMeu: "Premium, sustentável e de alta performance",
      generica: "Concorrência focada apenas em preço",
    },
  ],
  "en-US": [
    {
      feature: "Primary raw material",
      amigoMeu: "100% plant-based renewable cassava",
      generica: "Mineral clay / bentonite from mining",
    },
    {
      feature: "Dust level",
      amigoMeu: "Triple-filter process with 99.9% dust reduction",
      generica: "Higher release of fine dust particles",
    },
    {
      feature: "Odor control",
      amigoMeu: "Effective ammonia neutralization",
      generica: "Partial odor masking with perfume",
    },
    {
      feature: "Clump performance",
      amigoMeu: "Fast, firm, and easy-to-remove clumps",
      generica: "More fragile or breakable clumps",
    },
    {
      feature: "Pack yield",
      amigoMeu: "Longer usage and fewer full replacements",
      generica: "More frequent full-box replacement",
    },
    {
      feature: "Daily disposal",
      amigoMeu: "Small clumps can be flushed as directed",
      generica: "Usually disposed of in regular trash",
    },
    {
      feature: "Paw comfort",
      amigoMeu: "Soft particle profile for daily use",
      generica: "Can feel more abrasive to paws",
    },
    {
      feature: "Health monitoring",
      amigoMeu: "Light color helps spot urine changes early",
      generica: "Darker color reduces visibility",
    },
    {
      feature: "Environmental impact",
      amigoMeu: "Biodegradable with lower environmental burden",
      generica: "Low-biodegradation mineral residue",
    },
    {
      feature: "Retail value proposition",
      amigoMeu: "Premium, sustainable, high-performance story",
      generica: "Often competing only on low price",
    },
  ],
  "es-ES": [
    {
      feature: "Materia prima principal",
      amigoMeu: "Mandioca vegetal 100% renovable",
      generica: "Arcilla mineral / bentonita de mineria",
    },
    {
      feature: "Nivel de polvo",
      amigoMeu: "Triple filtrado con fuerte reduccion de polvo",
      generica: "Mayor liberacion de polvo fino",
    },
    {
      feature: "Control de olor",
      amigoMeu: "Neutralización efectiva de amoníaco",
      generica: "Enmascaramiento parcial con perfume",
    },
    {
      feature: "Formacion de grumos",
      amigoMeu: "Grumo rápido, firme y fácil de retirar",
      generica: "Grumo más frágil o quebradizo",
    },
    {
      feature: "Rendimiento por paquete",
      amigoMeu: "Mayor duración con menos recambio total",
      generica: "Recambio completo más frecuente",
    },
    {
      feature: "Eliminacion diaria",
      amigoMeu: "Posible descarte por porciones pequeñas en inodoro",
      generica: "Normalmente descarte en basura común",
    },
    {
      feature: "Confort en patas",
      amigoMeu: "Granulometría suave para uso diario",
      generica: "Textura potencialmente más abrasiva",
    },
    {
      feature: "Monitoreo de salud",
      amigoMeu: "Color claro facilita observar cambios de orina",
      generica: "Color oscuro dificulta observación temprana",
    },
    {
      feature: "Impacto ambiental",
      amigoMeu: "Biodegradable y con menor impacto",
      generica: "Residuo mineral de baja biodegradación",
    },
    {
      feature: "Argumento comercial",
      amigoMeu: "Posición premium, sostenible y de alto rendimiento",
      generica: "Competencia centrada en precio bajo",
    },
  ],
};

const comparisonHeadersByLocale: Record<
  Locale,
  {
    kicker: string;
    title: string;
    feature: string;
    amigoMeu: string;
    generica: string;
    note: string;
  }
> = {
  "pt-BR": {
    kicker: "Comparativo de mercado",
    title: "Super Premium Amigo Meu vs Marcas Genéricas",
    feature: "Comparação",
    amigoMeu: "Amigo Meu Super Premium",
    generica: "Marcas Genéricas",
    note: "Comparação referencial baseada em atributos médios de categorias concorrentes.",
  },
  "en-US": {
    kicker: "Market comparison",
    title: "Amigo Meu Super Premium vs Generic Brands",
    feature: "Comparison",
    amigoMeu: "Amigo Meu Super Premium",
    generica: "Generic Brands",
    note: "Reference comparison based on average attributes observed in competing categories.",
  },
  "es-ES": {
    kicker: "Comparativo de mercado",
    title: "Amigo Meu Super Premium vs Marcas Genéricas",
    feature: "Comparación",
    amigoMeu: "Amigo Meu Super Premium",
    generica: "Marcas Genéricas",
    note: "Comparación referencial basada en atributos promedio de categorías competidoras.",
  },
};

const faqTextByLocale: Record<Locale, { title: string; subtitle: string }> = {
  "pt-BR": {
    title: "Perguntas sobre Areias",
    subtitle: "Tudo o que você precisa para escolher a melhor opção para o seu gato.",
  },
  "en-US": {
    title: "Cat Litter Questions",
    subtitle: "Everything you need to select the best option for your cat and your routine.",
  },
  "es-ES": {
    title: "Preguntas sobre Arenas",
    subtitle: "Todo lo necesario para elegir la mejor opción para tu gato y tu hogar.",
  },
};

const areiasPageCopyByLocale: Record<
  Locale,
  {
    heroAlt: string;
    selectAroma: string;
    fullLine: string;
    chooseOne: string;
  }
> = {
  "pt-BR": {
    heroAlt: "Tutora com areia natural Amigo Meu",
    selectAroma: "Selecione o aroma:",
    fullLine: "Linha completa",
    chooseOne: "Escolha o seu",
  },
  "en-US": {
    heroAlt: "Pet parent with Amigo Meu natural litter",
    selectAroma: "Select the scent:",
    fullLine: "Full line",
    chooseOne: "Choose yours",
  },
  "es-ES": {
    heroAlt: "Tutora con arena natural Amigo Meu",
    selectAroma: "Selecciona el aroma:",
    fullLine: "Línea completa",
    chooseOne: "Elige la tuya",
  },
};

export default function Areias() {
  const { t, locale } = useI18n();
  const [activeProduct, setActiveProduct] = useState(0);

  const areiasProducts = areiasAssets.map((asset, idx) => ({
    ...t.areias.products[idx],
    ...asset,
  }));

  const current = areiasProducts[activeProduct];
  const comparisonRows = areiasComparisonByLocale[locale];
  const comparisonHeader = comparisonHeadersByLocale[locale];
  const faqContent = faqTextByLocale[locale];
  const pageCopy = areiasPageCopyByLocale[locale];
  const areiasFaqItems = [...t.areias.faq, ...areiasFaqExtrasByLocale[locale]];

  return (
    <main className="overflow-hidden bg-white">
      <Helmet>
        <title>{t.areias.pageTitle} | Amigo Meu</title>
        <meta name="description" content={t.areias.pageSubtitle} />
      </Helmet>

      {/* Dynamic Hero — Brand Color Block */}
      <section 
        className="relative lg:h-[93dvh] flex flex-col items-stretch overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: current.accentColor }}
      >
        <div className="absolute inset-0 lg:left-auto lg:top-0 lg:right-0 w-full lg:w-1/2 h-full z-0 order-1 lg:order-2">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-30 lg:opacity-70"
          >
            <source src="/videos/gato02.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="page-container relative z-10 w-full order-2 lg:order-1 flex items-center">
          <div className="grid lg:grid-cols-2 items-center">
            <div className="py-8 lg:py-32 lg:pr-16">
              <FadeInSection delay={50}>
                <motion.span
                  className="section-kicker !bg-white/10 !text-white !border-white/30 uppercase tracking-[0.2em]"
                >
                  {t.nav.areias}
                </motion.span>
              </FadeInSection>
<br />
              <FadeInSection delay={130} className="mt-8">
                <h1 className="heading-xl leading-[0.95] !text-white uppercase tracking-tight">
                  {t.areias.title}
                  <br />
                  <span className="text-white/80">
                    {t.areias.titleHighlight}
                  </span>
                </h1>
              </FadeInSection>
<br />
              <FadeInSection delay={210} className="mt-8">
                <p className="text-[1.25rem] leading-relaxed text-white/90 max-w-md font-light">
                  {t.areias.pageSubtitle}
                </p>
              </FadeInSection>

              <FadeInSection delay={290} className="mt-10">
                <div className="space-y-4">
                  <p className="text-[0.75rem] font-bold tracking-[0.2em] uppercase text-white/70">
                    {pageCopy.selectAroma}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {areiasProducts.map((p, i) => (
                      <button
                        key={p.id}
                        onClick={() => setActiveProduct(i)}
                        className="px-5 py-2.5 text-[0.8rem] font-bold tracking-[0.1em] uppercase border-2 transition-all duration-300 cursor-pointer"
                        style={{
                          borderColor: i === activeProduct ? "white" : "rgba(255,255,255,0.3)",
                          color: "white",
                          backgroundColor: i === activeProduct ? "rgba(255,255,255,0.15)" : "transparent",
                        }}
                      >
                        {p.name}
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

          </div>
        </div>
      </section>

      {/* Product details */}
      <section className="py-12 lg:py-24 border-t border-[#e8e8e8] bg-white">
        <div className="page-container mb-24">
          <FadeInSection className="text-center">
            <span className="section-kicker">{pageCopy.fullLine}</span>
            <h2 className="heading-lg mt-4">{pageCopy.chooseOne}</h2>
          </FadeInSection>
        </div>

        <div className="page-container">
          <div className="flex flex-col w-full gap-20">
            {areiasProducts.map((product, idx) => (
              <div key={product.id} className="w-full border border-[#e8e8e8] overflow-hidden group">
                <FadeInSection delay={80}>
                  <div className="grid lg:grid-cols-2 min-h-[500px]">
                    <div
                      className={`hidden lg:flex relative items-center justify-center p-8 py-16 lg:p-24 ${
                        idx % 2 !== 0 ? "lg:order-2" : "lg:order-1"
                      }`}
                      style={{ backgroundColor: product.bgTint }}
                    >
                      <div
                        className="absolute bottom-0 left-0 w-full h-1"
                        style={{ backgroundColor: product.accentColor }}
                      />
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-[400px] w-auto object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
                      />
                    </div>

                    <div
                      className={`p-8 py-16 lg:p-24 bg-white flex flex-col justify-center gap-6 ${
                        idx % 2 !== 0 ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div
                        className="text-[0.75rem] font-bold tracking-[0.25em] uppercase"
                        style={{ color: product.accentColor }}
                      >
                        {t.areias.kicker}
                      </div>
                      <h2 className="text-[2.2rem] lg:text-[2.8rem] font-bold tracking-tight text-[#1a1a1a] leading-tight uppercase">
                        {product.name}
                      </h2>
                      <p className="text-[1.05rem] leading-relaxed text-[#666666] font-light max-w-lg">
                        {product.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        {product.badges?.map((badge: string) => (
                          <div
                            key={badge}
                            className="flex items-center gap-3 px-4 py-3 border text-[0.7rem] font-bold uppercase tracking-[0.08em]"
                            style={{
                              color: product.accentColor,
                              borderColor: `${product.accentColor}33`,
                              background: `${product.accentColor}08`,
                            }}
                          >
                            <div
                              className="h-1.5 w-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: product.accentColor }}
                            />
                            {badge}
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
            ))}
          </div>
        </div>
      </section>

      {/* Expanded market comparison */}
      <section className="py-12 lg:py-24 bg-white border-t border-[#e8e8e8]">
        <div className="page-container">
          <FadeInSection className="text-center mb-16">
            <span className="section-kicker">{comparisonHeader.kicker}</span>
            <h2 className="heading-lg mt-4">{comparisonHeader.title}</h2>
          </FadeInSection>

          <FadeInSection delay={150}>
            <div className="relative">
              {/* Mobile Scroll Hint */}
              <div className="lg:hidden flex items-center justify-center gap-2 mb-4 text-[0.7rem] font-bold uppercase tracking-widest text-[#90C63E] animate-pulse">
                <span>Deslize para comparar</span>
                <ArrowRight className="h-3 w-3" />
              </div>
              
              <div className="overflow-x-auto border border-[#e8e8e8] rounded-sm">
                <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#111118] text-white">
                    <th className="sticky left-0 z-20 bg-[#111118] px-6 py-5 text-[0.7rem] font-bold uppercase tracking-[0.15em]">
                      {comparisonHeader.feature}
                    </th>
                    <th className="px-6 py-5 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[#90C63E]">
                      {comparisonHeader.amigoMeu}
                    </th>
                    <th className="px-6 py-5 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[#d6d6d6]">
                      {comparisonHeader.generica}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, idx) => (
                    <tr
                      key={row.feature}
                      className={`border-t border-[#f1f1f1] ${
                        idx % 2 === 0 ? "bg-white" : "bg-[#fafafa]"
                      }`}
                    >
                      <td className="sticky left-0 z-10 bg-inherit px-6 py-5 text-[0.78rem] font-bold text-[#1a1a1a] uppercase tracking-[0.08em] align-top border-r border-[#f1f1f1]">
                        {row.feature}
                      </td>
                      <td className="px-6 py-5 text-[0.9rem] text-[#2b2b2b] align-top">
                        <div className="inline-flex items-start gap-2">
                          <Check className="h-4 w-4 text-[#90C63E] mt-[2px] shrink-0" />
                          <span>{row.amigoMeu}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-[0.9rem] text-[#666666] align-top">
                        {row.generica}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-[0.8rem] text-[#888888] font-medium">{comparisonHeader.note}</p>
        </FadeInSection>
      </div>
      </section>

      <section className="border-t border-[#e8e8e8]">
        <FAQ items={areiasFaqItems} title={faqContent.title} subtitle={faqContent.subtitle} />
      </section>
    </main>
  );
}
