import { Helmet } from "react-helmet-async";
import { FadeInSection } from "./Home";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Droplets, Recycle } from "lucide-react";
import { useI18n } from "../i18n";
import type { Locale } from "../i18n";

type JourneyStep = {
  title: string;
  description: string;
};

const mandiocaCopyByLocale: Record<
  Locale,
  {
    pageTitle: string;
    pageDescription: string;
    heroKicker: string;
    heroTitle: string;
    heroHighlight: string;
    heroBody: string;
    steps: JourneyStep[];
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  }
> = {
  "pt-BR": {
    pageTitle: "A História da Mandioca",
    pageDescription:
      "Descubra como a raiz brasileira se transforma em areia super premium para gatos.",
    heroKicker: "Da Terra à Caixa",
    heroTitle: "O Poder Extraordinário",
    heroHighlight: "da Mandioca.",
    heroBody:
      "Acompanhe a jornada tecnológica e sustentável da raiz de mandioca: da colheita em fazendas parceiras até a transformação em areia sanitária super premium.",
    steps: [
      {
        title: "1. Cultivo Consciente",
        description:
          "Nossa matéria-prima vem de agricultura responsável. Selecionamos variedades específicas de mandioca, valorizando produtores locais e práticas que preservam a saúde do solo sem defensivos agressivos.",
      },
      {
        title: "2. Extração do Amido Puro",
        description:
          "A raiz passa por moagem e lavagem contínua para extrair o amido. Esse concentrado garante alta absorção instantânea e formação de torrões ultra firmes que não se desfazem na caixa.",
      },
      {
        title: "3. Biotecnologia e Secagem",
        description:
          "O composto passa por temperatura controlada e tripla filtragem, eliminando 99,9% da poeira. Nesta etapa, óleos essenciais orgânicos auxiliam no combate à amônia e na neutralização de odores.",
      },
    ],
    ctaTitle: "A revolução natural na caixa de areia.",
    ctaBody:
      "Casa limpa, sem cheiro e com menor impacto ambiental. Mais conforto para o seu gato e mais praticidade para você.",
    ctaButton: "Comprar areias",
  },
  "en-US": {
    pageTitle: "The Cassava Story",
    pageDescription:
      "Discover how a Brazilian root becomes super-premium cat litter.",
    heroKicker: "From Soil to Litter Box",
    heroTitle: "The Extraordinary Power",
    heroHighlight: "of Cassava.",
    heroBody:
      "Follow the sustainable technology journey of cassava: from partner farms to a super-premium litter solution for modern cat care.",
    steps: [
      {
        title: "1. Conscious Cultivation",
        description:
          "Our raw material comes from responsible agriculture. We select specific cassava varieties and partner with local growers focused on healthier soil practices.",
      },
      {
        title: "2. Pure Starch Extraction",
        description:
          "The root goes through grinding and continuous washing to extract high-purity starch. This concentrate drives fast absorption and firm clumping performance.",
      },
      {
        title: "3. Biotechnology and Drying",
        description:
          "The compound is processed under controlled temperature and triple filtration, reducing dust by 99.9%. At this stage, organic essential oils help neutralize ammonia-related odor.",
      },
    ],
    ctaTitle: "A natural revolution in the litter box.",
    ctaBody:
      "Cleaner home, better odor control, and lower environmental impact. More comfort for your cat and more convenience for your routine.",
    ctaButton: "Shop cat litter",
  },
  "es-ES": {
    pageTitle: "La Historia de la Mandioca",
    pageDescription:
      "Descubre cómo una raíz brasileña se convierte en arena super premium para gatos.",
    heroKicker: "De la Tierra a la Caja",
    heroTitle: "El Poder Extraordinario",
    heroHighlight: "de la Mandioca.",
    heroBody:
      "Conoce la ruta tecnológica y sostenible de la mandioca: desde fincas asociadas hasta convertirse en una arena super premium.",
    steps: [
      {
        title: "1. Cultivo Consciente",
        description:
          "La materia prima proviene de agricultura responsable. Seleccionamos variedades específicas y trabajamos con productores locales comprometidos con prácticas más limpias.",
      },
      {
        title: "2. Extracción de Almidón Puro",
        description:
          "La raíz pasa por molienda y lavado continuo para extraer almidón de alta pureza. Ese concentrado permite absorción rápida y grumos firmes.",
      },
      {
        title: "3. Biotecnología y Secado",
        description:
          "El compuesto se procesa con temperatura controlada y triple filtrado, reduciendo 99,9% del polvo. En esta etapa, aceites esenciales orgánicos ayudan a neutralizar olores de amoníaco.",
      },
    ],
    ctaTitle: "La revolución natural en la caja de arena.",
    ctaBody:
      "Hogar más limpio, mejor control de olor y menor impacto ambiental. Más confort para tu gato y más practicidad para tu día a día.",
    ctaButton: "Comprar arenas",
  },
};

const stepIcons = [Leaf, Droplets, Recycle];

export default function HistoriaMandioca() {
  const { locale } = useI18n();
  const copy = mandiocaCopyByLocale[locale];

  return (
    <main className="overflow-hidden bg-white">
      <Helmet>
        <title>{copy.pageTitle} | Amigo Meu</title>
        <meta name="description" content={copy.pageDescription} />
      </Helmet>

      <section className="relative h-[93dvh] flex items-center bg-white overflow-hidden pt-20">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="page-container max-w-5xl text-left relative z-10">
          <FadeInSection>
            <span className="section-kicker !bg-primary-500/10 !text-primary-500 !border-primary-500/30">
              {copy.heroKicker}
            </span>
            <h1 className="heading-xl mt-6">
              {copy.heroTitle} <br />
              <span className="text-primary-500 font-bold italic tracking-tight">
                {copy.heroHighlight}
              </span>
            </h1>
            <p className="max-w-2xl mt-8 text-xl text-[#666666] font-light leading-relaxed">
              {copy.heroBody}
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="relative py-32 bg-[#f2f8ff] border-y border-[#e8e8e8] overflow-hidden">
        <div className="page-container max-w-4xl">
          <div className="space-y-16">
            {copy.steps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <FadeInSection key={step.title} delay={(index + 1) * 100}>
                  <div className="flex flex-col md:flex-row gap-8 items-center bg-white border border-[#e8e8e8] p-10">
                    <div className="w-20 h-20 shrink-0 flex items-center justify-center bg-primary-500/10 text-primary-500 rounded-none">
                      <Icon strokeWidth={1} className="h-10 w-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#1a1a1a] uppercase mb-3">
                        {step.title}
                      </h3>
                      <p className="text-[#666666] font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white text-center">
        <div className="page-container max-w-3xl">
          <FadeInSection>
            <h2 className="heading-lg mb-6">{copy.ctaTitle}</h2>
            <p className="text-[#666666] text-xl font-light mb-10">{copy.ctaBody}</p>
            <Link to="/areias" className="btn-primary inline-flex">
              {copy.ctaButton} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </FadeInSection>
        </div>
      </section>
    </main>
  );
}
