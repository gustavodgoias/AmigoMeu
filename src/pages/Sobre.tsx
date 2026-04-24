import { Helmet } from "react-helmet-async";
import { FadeInSection } from "./Home";
import { Link } from "react-router-dom";
import {
  Heart,
  Globe,
  ShieldCheck,
  ArrowRight,
  Recycle,
  Leaf,
  Sparkles,
  HandHeart,
} from "lucide-react";
import { useI18n } from "../i18n";
import type { Locale } from "../i18n";

type PillarKey = "passion" | "sustainability" | "quality" | "circularity" | "origin" | "transparency";

const pillarIcons = {
  passion: Heart,
  sustainability: Globe,
  quality: ShieldCheck,
  circularity: Recycle,
  origin: Leaf,
  transparency: Sparkles,
} as const;

const pillarsOrder: PillarKey[] = [
  "passion",
  "sustainability",
  "quality",
  "circularity",
  "origin",
  "transparency",
];

const aboutCopyByLocale: Record<
  Locale,
  {
    pageTitle: string;
    pageDescription: string;
    topKicker: string;
    topTitle: string;
    topDescription: string;
    missionKicker: string;
    missionTitle: string;
    missionDescription: string;
    missionImageAlt: string;
    missionPoints: string[];
    visionKicker: string;
    visionTitle: string;
    visionDescription: string;
    visionImageAlt: string;
    visionPoints: string[];
    pillarsKicker: string;
    pillarsTitle: string;
    pillarsCommitmentLabel: string;
    pillars: Record<PillarKey, { title: string; desc: string }>;
    journeyKicker: string;
    journeyTitle: string;
    journeyDescription: string;
    journeyImageAlt: string;
    journeySteps: Array<{ num: string; title: string; text: string }>;
    ctaBadge: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaAreias: string;
    ctaToppers: string;
  }
> = {
  "pt-BR": {
    pageTitle: "Sobre a Marca",
    pageDescription: "Conheça a história, missão e valores da Amigo Meu Pet Feliz.",
    topKicker: "Nossa Essência",
    topTitle: "Missão e Visão em Movimento",
    topDescription:
      "A Amigo Meu nasceu para elevar o padrão de cuidado pet com tecnologia natural, excelência de produto e responsabilidade com o planeta.",
    missionKicker: "Nossa Missão",
    missionTitle: "Cuidado premium com impacto positivo",
    missionDescription:
      "Desenvolvemos soluções para gatos e cães que entregam performance, praticidade e segurança, sem abrir mão da sustentabilidade. Nosso compromisso é transformar o consumo pet em uma escolha mais inteligente e consciente.",
    missionImageAlt: "Relação de cuidado entre tutora e pet",
    missionPoints: [
      "Entregar produtos super premium com base vegetal e funcionalidade comprovada.",
      "Combinar ciência, design e praticidade para facilitar a rotina do tutor.",
      "Promover saúde animal com soluções de alta aceitação e uso diário.",
      "Reduzir impacto ambiental sem abrir mão de desempenho.",
    ],
    visionKicker: "Nossa Visão",
    visionTitle: "Liderar a nova geração do mercado pet",
    visionDescription:
      "Queremos ser reconhecidos como marca de referência para quem busca produtos de alto valor agregado, com origem transparente e resultado perceptível no dia a dia.",
    visionImageAlt: "Representação da linha de produtos Amigo Meu",
    visionPoints: [
      "Ser referência em conscious pet care na América Latina e em mercados globais.",
      "Liderar a migração de categorias pet para alternativas mais limpas e eficientes.",
      "Construir uma marca lembrada por inovação, confiança e recompra.",
      "Conectar tecnologia natural com valor real para tutores, varejo e distribuidores.",
    ],
    pillarsKicker: "Nossos Pilares",
    pillarsTitle: "Valores que guiam cada decisão",
    pillarsCommitmentLabel: "Compromisso",
    pillars: {
      passion: {
        title: "Paixão por Pets",
        desc: "Cada fórmula nasce para melhorar saúde, conforto e bem-estar real de cães e gatos.",
      },
      sustainability: {
        title: "Sustentabilidade Aplicada",
        desc: "Transformamos matéria-prima natural em performance premium com menor impacto ambiental.",
      },
      quality: {
        title: "Segurança e Qualidade",
        desc: "Padrões técnicos e rastreabilidade em toda a cadeia para entregar confiança ao tutor.",
      },
      circularity: {
        title: "Circularidade",
        desc: "Do cultivo ao descarte, buscamos fechar ciclos com menor passivo e maior eficiência.",
      },
      origin: {
        title: "Origem Brasileira",
        desc: "Valorizamos biodiversidade, agricultura nacional e inovação feita com identidade local.",
      },
      transparency: {
        title: "Transparência",
        desc: "Comunicação clara sobre ingredientes, processos e benefícios em cada produto.",
      },
    },
    journeyKicker: "A Origem",
    journeyTitle: "Da terra à caixa: a jornada da mandioca",
    journeyDescription:
      "Nossa inovação começa no campo e termina na casa do tutor. Cada etapa é desenhada para unir eficiência técnica, segurança animal e responsabilidade ambiental.",
    journeyImageAlt: "Raiz de mandioca",
    journeySteps: [
      {
        num: "01",
        title: "Cultivo responsável",
        text: "Selecionamos fornecedores com boas práticas agrícolas e foco em qualidade de matéria-prima.",
      },
      {
        num: "02",
        title: "Processo de alta pureza",
        text: "Tratamento e filtragem para entregar absorção superior com mínimo de poeira.",
      },
      {
        num: "03",
        title: "Performance no uso real",
        text: "Testes de uso garantem torrão firme, melhor controle de odor e rotina mais prática.",
      },
    ],
    ctaBadge: "Junte-se a essa mudança",
    ctaTitle: "Faça parte da nova geração de cuidado pet",
    ctaDescription:
      "Escolher Amigo Meu é apoiar uma cadeia que une tecnologia, natureza e performance para entregar mais qualidade de vida aos pets.",
    ctaAreias: "Explorar Areias",
    ctaToppers: "Ver Toppers",
  },
  "en-US": {
    pageTitle: "About the Brand",
    pageDescription: "Learn about Amigo Meu Pet Feliz values, mission, and vision.",
    topKicker: "Our Essence",
    topTitle: "Mission and Vision in Motion",
    topDescription:
      "Amigo Meu was created to elevate pet care standards with natural technology, product excellence, and environmental responsibility.",
    missionKicker: "Our Mission",
    missionTitle: "Premium care with positive impact",
    missionDescription:
      "We develop solutions for cats and dogs that deliver performance, practicality, and safety without compromising sustainability. Our commitment is to make pet consumption a smarter and more conscious choice.",
    missionImageAlt: "Care relationship between pet parent and pet",
    missionPoints: [
      "Deliver super premium products with plant-based technology and proven functionality.",
      "Combine science, design, and practicality to simplify pet-parent routines.",
      "Promote animal health with high-acceptance solutions for daily use.",
      "Reduce environmental impact while maintaining top performance.",
    ],
    visionKicker: "Our Vision",
    visionTitle: "Lead the next generation of the pet market",
    visionDescription:
      "We aim to be recognized as a reference brand for customers seeking high-value products with transparent origins and visible day-to-day results.",
    visionImageAlt: "Representation of Amigo Meu product line",
    visionPoints: [
      "Become a conscious pet care benchmark across Latin America and global markets.",
      "Lead category migration toward cleaner and more efficient alternatives.",
      "Build a brand remembered for innovation, trust, and repurchase.",
      "Connect natural technology with real value for pet parents, retail, and distribution.",
    ],
    pillarsKicker: "Our Pillars",
    pillarsTitle: "Values that guide every decision",
    pillarsCommitmentLabel: "Commitment",
    pillars: {
      passion: {
        title: "Passion for Pets",
        desc: "Every formula is created to improve health, comfort, and true well-being for dogs and cats.",
      },
      sustainability: {
        title: "Applied Sustainability",
        desc: "We transform natural raw materials into premium performance with lower environmental impact.",
      },
      quality: {
        title: "Safety and Quality",
        desc: "Technical standards and traceability across the chain to deliver confidence.",
      },
      circularity: {
        title: "Circularity",
        desc: "From cultivation to disposal, we pursue closed cycles with lower footprint and higher efficiency.",
      },
      origin: {
        title: "Brazilian Origin",
        desc: "We value biodiversity, local agriculture, and innovation built with regional identity.",
      },
      transparency: {
        title: "Transparency",
        desc: "Clear communication on ingredients, processes, and benefits in every product.",
      },
    },
    journeyKicker: "The Origin",
    journeyTitle: "From field to litter box: the cassava journey",
    journeyDescription:
      "Our innovation starts in the field and ends in the pet parent’s home. Each stage is designed to unite technical efficiency, animal safety, and environmental responsibility.",
    journeyImageAlt: "Cassava root",
    journeySteps: [
      {
        num: "01",
        title: "Responsible cultivation",
        text: "We select suppliers with good agricultural practices and a strong quality focus.",
      },
      {
        num: "02",
        title: "High-purity process",
        text: "Treatment and filtering to deliver superior absorption with minimal dust.",
      },
      {
        num: "03",
        title: "Real-use performance",
        text: "Usage testing ensures firm clumps, better odor control, and easier daily routines.",
      },
    ],
    ctaBadge: "Join this change",
    ctaTitle: "Be part of the next generation of pet care",
    ctaDescription:
      "Choosing Amigo Meu means supporting a chain that combines technology, nature, and performance to deliver better quality of life for pets.",
    ctaAreias: "Explore Cat Litters",
    ctaToppers: "See Toppers",
  },
  "es-ES": {
    pageTitle: "Sobre la Marca",
    pageDescription: "Conoce la historia, misión y valores de Amigo Meu Pet Feliz.",
    topKicker: "Nuestra Esencia",
    topTitle: "Misión y Visión en Movimiento",
    topDescription:
      "Amigo Meu nació para elevar el estándar del cuidado pet con tecnología natural, excelencia de producto y responsabilidad ambiental.",
    missionKicker: "Nuestra Misión",
    missionTitle: "Cuidado premium con impacto positivo",
    missionDescription:
      "Desarrollamos soluciones para gatos y perros que entregan desempeño, practicidad y seguridad sin renunciar a la sostenibilidad. Nuestro compromiso es transformar el consumo pet en una decisión más inteligente y consciente.",
    missionImageAlt: "Relación de cuidado entre tutora y mascota",
    missionPoints: [
      "Ofrecer productos super premium de base vegetal con funcionalidad comprobada.",
      "Unir ciencia, diseño y practicidad para facilitar la rutina del tutor.",
      "Promover salud animal con soluciones de alta aceptación para uso diario.",
      "Reducir impacto ambiental sin perder desempeño.",
    ],
    visionKicker: "Nuestra Visión",
    visionTitle: "Liderar la nueva generación del mercado pet",
    visionDescription:
      "Queremos ser una marca de referencia para quienes buscan productos de alto valor, origen transparente y resultados visibles en el día a día.",
    visionImageAlt: "Representación de la línea de productos Amigo Meu",
    visionPoints: [
      "Ser referencia en conscious pet care en América Latina y mercados globales.",
      "Liderar la migración de categorías pet hacia alternativas más limpias y eficientes.",
      "Construir una marca recordada por innovación, confianza y recompra.",
      "Conectar tecnología natural con valor real para tutores, retail y distribución.",
    ],
    pillarsKicker: "Nuestros Pilares",
    pillarsTitle: "Valores que guían cada decisión",
    pillarsCommitmentLabel: "Compromiso",
    pillars: {
      passion: {
        title: "Pasión por las Mascotas",
        desc: "Cada fórmula nace para mejorar salud, confort y bienestar real de perros y gatos.",
      },
      sustainability: {
        title: "Sostenibilidad Aplicada",
        desc: "Transformamos materias primas naturales en desempeño premium con menor impacto ambiental.",
      },
      quality: {
        title: "Seguridad y Calidad",
        desc: "Estándares técnicos y trazabilidad en toda la cadena para generar confianza.",
      },
      circularity: {
        title: "Circularidad",
        desc: "Del cultivo al descarte, buscamos cerrar ciclos con menor huella y mayor eficiencia.",
      },
      origin: {
        title: "Origen Brasileño",
        desc: "Valoramos biodiversidad, agricultura local e innovación con identidad regional.",
      },
      transparency: {
        title: "Transparencia",
        desc: "Comunicación clara sobre ingredientes, procesos y beneficios en cada producto.",
      },
    },
    journeyKicker: "El Origen",
    journeyTitle: "De la tierra a la caja: el viaje de la mandioca",
    journeyDescription:
      "Nuestra innovación empieza en el campo y termina en la casa del tutor. Cada etapa une eficiencia técnica, seguridad animal y responsabilidad ambiental.",
    journeyImageAlt: "Raíz de mandioca",
    journeySteps: [
      {
        num: "01",
        title: "Cultivo responsable",
        text: "Seleccionamos proveedores con buenas prácticas agrícolas y foco en calidad.",
      },
      {
        num: "02",
        title: "Proceso de alta pureza",
        text: "Tratamiento y filtrado para ofrecer absorción superior con mínimo polvo.",
      },
      {
        num: "03",
        title: "Desempeño en uso real",
        text: "Pruebas de uso garantizan grumo firme, mejor control de olor y rutina más práctica.",
      },
    ],
    ctaBadge: "Súmate a este cambio",
    ctaTitle: "Sé parte de la nueva generación del cuidado pet",
    ctaDescription:
      "Elegir Amigo Meu es apoyar una cadena que une tecnología, naturaleza y desempeño para mejorar la calidad de vida de las mascotas.",
    ctaAreias: "Explorar Arenas",
    ctaToppers: "Ver Toppers",
  },
};

export default function Sobre() {
  const { locale } = useI18n();
  const copy = aboutCopyByLocale[locale];

  return (
    <main className="overflow-hidden">
      <Helmet>
        <title>{copy.pageTitle} | Amigo Meu</title>
        <meta name="description" content={copy.pageDescription} />
      </Helmet>

      {/* Hero — Immersive Video Background */}
      <section className="relative py-32 bg-[#5bbced] text-white h-[93dvh] flex items-center overflow-hidden">
        {/* Background Video — subtle texture */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute h-full w-full object-cover"
          >
            <source src="/videos/valores.mp4" type="video/mp4" />
          </video>
          {/* Strong overlays for branding and legibility */}
          <div className="absolute inset-0 bg-[#5bbced]/90" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#5bbced] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#5bbced] via-transparent to-transparent opacity-95" />
        </div>

        <div className="page-container relative z-10 text-center flex flex-col items-center justify-center">
          <FadeInSection>
            {/* Kicker */}
            <span className="section-kicker !bg-white/10 !text-white/80 !border-white/20 uppercase tracking-[0.4em] text-[0.65rem] mx-auto">
              {copy.topKicker}
            </span>

            {/* Main heading */}
            <h1 className="text-[4rem] lg:text-[7rem] font-black !text-white mt-10 uppercase tracking-tight leading-[0.85]">
              {copy.topTitle}
            </h1>

            {/* Decorative divider */}
            <div className="mt-12 mb-10 mx-auto w-24 h-[3px] bg-white/40 rounded-full" />

            {/* Intro text */}
            <p className="text-white/80 max-w-2xl mx-auto text-[1.3rem] leading-[1.8] tracking-wider font-light">
              {copy.topDescription}
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Mission & Vision — Saturated Blocks */}
      <section className="py-0">
        <FadeInSection>
          <article className="grid lg:grid-cols-2 bg-[#90C63E] text-white overflow-hidden min-h-[600px] items-center">
            <div className="hidden lg:block relative h-full order-1 lg:order-2">
              <img
                src="/images/hero-gatoecachrro.png"
                alt={copy.missionImageAlt}
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            <div className="p-12 lg:p-32 flex flex-col justify-center order-2 lg:order-1">
              <span className="section-kicker !bg-white/20 !text-white !border-white/30 w-fit uppercase tracking-[0.2em]">
                {copy.missionKicker}
              </span>
              <h2 className="heading-lg !text-white mt-8 uppercase tracking-tight">{copy.missionTitle}</h2>
              <p className="mt-6 text-white/80 text-[1.1rem] leading-relaxed font-light">
                {copy.missionDescription}
              </p>
              <ul className="mt-10 space-y-4">
                {copy.missionPoints.map((point) => (
                  <li key={point} className="flex items-start gap-4">
                    <div className="mt-2.5 h-2 w-2 bg-white rounded-full shrink-0" />
                    <span className="text-[1rem] leading-relaxed font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </FadeInSection>

        <FadeInSection>
          <article className="grid lg:grid-cols-2 bg-[#1a3a5a] text-white overflow-hidden min-h-[600px] items-center">
            <div className="hidden lg:block relative h-full">
              <img
                src="/images/hero-areias.png"
                alt={copy.visionImageAlt}
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="p-12 lg:p-32 flex flex-col justify-center">
              <span className="section-kicker !bg-white/10 !text-white !border-white/20 w-fit uppercase tracking-[0.2em]">
                {copy.visionKicker}
              </span>
              <h2 className="heading-lg !text-white mt-8 uppercase tracking-tight">{copy.visionTitle}</h2>
              <p className="mt-6 text-white/80 text-[1.1rem] leading-relaxed font-light">
                {copy.visionDescription}
              </p>
              <ul className="mt-10 space-y-4">
                {copy.visionPoints.map((point) => (
                  <li key={point} className="flex items-start gap-4">
                    <div className="mt-2.5 h-2 w-2 bg-[#5bbced] rounded-full shrink-0" />
                    <span className="text-[1rem] leading-relaxed font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </FadeInSection>
      </section>

      <section className="py-32 bg-[#111118]">
        <div className="page-container">
          <FadeInSection className="text-center mb-20">
            <span className="section-kicker !bg-white/10 !text-white !border-white/30 mx-auto uppercase tracking-[0.2em]">
              {copy.pillarsKicker}
            </span>
            <h2 className="heading-lg !text-white mt-8 uppercase tracking-tight">{copy.pillarsTitle}</h2>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillarsOrder.map((pillarKey, idx) => {
              const Icon = pillarIcons[pillarKey];
              const pillar = copy.pillars[pillarKey];
              return (
                <FadeInSection key={pillar.title} delay={idx * 90}>
                  <article className="h-full p-10 bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                    <div className="w-14 h-14 flex items-center justify-center bg-white text-[#111118] mb-8">
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <h3 className="text-[1.1rem] font-black text-white uppercase tracking-[0.1em]">
                      {pillar.title}
                    </h3>
                    <p className="mt-5 text-[1rem] text-white/60 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                    <div className="mt-8 pt-6 border-t border-white/5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/30">
                      {copy.pillarsCommitmentLabel} {idx + 1}
                    </div>
                  </article>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-28 bg-white">
        <div className="page-container max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeInSection>
              <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden shadow-2xl">
                <img
                  src="/images/editorial-cassava.png"
                  alt={copy.journeyImageAlt}
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-primary-500/10 mix-blend-overlay" />
              </div>
            </FadeInSection>

            <div className="space-y-10">
              <FadeInSection delay={80}>
                <span className="section-kicker !bg-[#111118]/6 !text-[#111118] !border-[#111118]/20">
                  {copy.journeyKicker}
                </span>
                <h2 className="heading-lg mt-5">{copy.journeyTitle}</h2>
                <p className="text-[#666666] font-light leading-relaxed text-lg mt-5">
                  {copy.journeyDescription}
                </p>
              </FadeInSection>

              <div className="space-y-6">
                {copy.journeySteps.map((step, idx) => (
                  <FadeInSection key={step.num} delay={160 + idx * 90}>
                    <div className="flex gap-5 p-5 border border-[#e8e8e8] bg-[#fafafa]">
                      <span className="text-primary-500 font-bold text-lg tracking-tight">{step.num}</span>
                      <div>
                        <h4 className="font-bold text-[#1a1a1a] uppercase tracking-[0.08em] text-[0.78rem]">
                          {step.title}
                        </h4>
                        <p className="text-[#666666] font-light text-[0.92rem] leading-relaxed mt-2">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#111118] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full bg-primary-500/5 pointer-events-none" />
        <div className="page-container max-w-4xl text-center relative z-10">
          <FadeInSection>
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-white/20 bg-white/5 text-[0.72rem] font-bold uppercase tracking-[0.16em]">
              <HandHeart className="h-4 w-4 text-primary-300" />
              {copy.ctaBadge}
            </div>
            <h2 className="heading-lg !text-white mt-7">{copy.ctaTitle}</h2>
            <p className="text-white/65 text-[1.02rem] font-light mt-6 mb-12 max-w-2xl mx-auto leading-relaxed">
              {copy.ctaDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link to="/areias" className="btn-primary">
                {copy.ctaAreias}
              </Link>
              <Link
                to="/toppers"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[0.8rem] font-bold tracking-[0.15em] uppercase border border-white/20 hover:bg-white/5 transition-all"
              >
                {copy.ctaToppers}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </main>
  );
}
