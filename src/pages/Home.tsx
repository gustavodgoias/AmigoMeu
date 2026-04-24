import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ShoppingCart, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FAQ from "../components/FAQ";
import { useI18n } from "../i18n";
import type { Locale } from "../i18n";

gsap.registerPlugin(ScrollTrigger);
import { useInView, useAnimate } from "framer-motion";

function CountUp({ value, duration = 2 }: { value: string; duration?: number }) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });
  const numericPart = value.match(/\d+/);
  const suffix = value.replace(/\d+/, "");

  useEffect(() => {
    if (isInView) {
      // Always animate opacity first
      animate(scope.current, { opacity: 1, y: [10, 0] }, { duration: 0.8 });

      if (numericPart) {
        animate(0, parseInt(numericPart[0]), {
          duration,
          ease: [0.16, 1, 0.3, 1], // Custom easeOutExpos
          onUpdate: (latest) => {
            if (scope.current) {
              scope.current.textContent = Math.floor(latest) + suffix;
            }
          },
        });
      }
    }
  }, [isInView, animate, numericPart, suffix, scope, duration]);

  return (
    <span ref={scope} className="opacity-0 inline-block">
      {value}
    </span>
  );
}

// ── Fade-in on scroll ──────────────────────────────────────────────
export function FadeInSection({
  children,
  delay = 0,
  className = "",
  variant = "text",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: "text" | "image" | "soft";
}) {
  const reducedMotion = useReducedMotion();

  const presets = {
    text: {
      initial: { opacity: 0, y: 34, filter: "blur(8px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      duration: 0.78,
    },
    image: {
      initial: { opacity: 0, y: 42, scale: 0.95, filter: "blur(10px)" },
      visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
      duration: 0.9,
    },
    soft: {
      initial: { opacity: 0, y: 20, scale: 0.98, filter: "blur(6px)" },
      visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
      duration: 0.65,
    },
  } as const;

  const preset = presets[variant];
  const initialState = reducedMotion ? { opacity: 0 } : preset.initial;
  const visibleState = reducedMotion ? { opacity: 1 } : preset.visible;

  return (
    <motion.div
      initial={initialState}
      whileInView={visibleState}
      viewport={{ once: true, margin: "-90px 0px -90px 0px", amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0.25 : preset.duration,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
}

// ── Product data (assets merged with i18n) ────────────────────────
const areiasAssets = [
  {
    id: "tradicional",
    image: "/images/produtos/AMIGO-MEU-2KG-2025-TRADICIONAL.png",
    accentColor: "#F37021",
    accentLight: "#ff8c42",
    btnBg: "#F37021",
    btnHover: "#d65a10",
  },
  {
    id: "capim-limao",
    image: "/images/produtos/AMIGO-MEU-2KG-2025-CAPIM-LIMAO.png",
    accentColor: "#90C63E",
    accentLight: "#aadd55",
    btnBg: "#90C63E",
    btnHover: "#76a432",
  },
  {
    id: "lavanda",
    image: "/images/produtos/AMIGO-MEU-2KG-2025-LAVANDA.png",
    accentColor: "#4aa8d8",
    accentLight: "#7ebce0",
    btnBg: "#4aa8d8",
    btnHover: "#3990bd",
  },
];

const toppersAssets = [
  {
    id: "frango",
    image: "/images/produtos/AMIGOMEU-TOPPER-FRANGO-100G.png",
    accentColor: "#C8A21A",
    accentLight: "#e0c050",
    btnBg: "#C8A21A",
    btnHover: "#a08010",
    flavorClass: "flavor-gold",
  },
  {
    id: "carne",
    image: "/images/produtos/AMIGOMEU-TOPPER-CARNE-100G.png",
    accentColor: "#b53c2f",
    accentLight: "#d45a4a",
    btnBg: "#b53c2f",
    btnHover: "#8f2d23",
    flavorClass: "flavor-red",
  },
  {
    id: "figado",
    image: "/images/produtos/AMIGOMEU-TOPPER-FIGADO-100G.png",
    accentColor: "#5c2a7f",
    accentLight: "#7e4aaa",
    btnBg: "#5c2a7f",
    btnHover: "#431f5c",
    flavorClass: "flavor-purple",
  },
];

const homeCopyByLocale: Record<
  Locale,
  {
    seoTitle: string;
    heroImageAlt: string;
    floatingProductAlt: string;
    productAriaPrefix: string;
    switchToAreias: string;
    switchToToppers: string;
    editorialOne: {
      imageAlt: string;
      kicker: string;
      title: string;
      titleHighlight: string;
      body: string;
      ctaLabel: string;
    };
    editorialTwo: {
      imageAlt: string;
      kicker: string;
      title: string;
      titleHighlight: string;
      body: string;
      ctaLabel: string;
    };
    faq: {
      kicker: string;
      title: string;
      subtitle: string;
    };
  }
> = {
  "pt-BR": {
    seoTitle: "Amigo Meu Pet — Areia Natural e Toppers",
    heroImageAlt: "Vida com Amigo Meu",
    floatingProductAlt: "Produto Amigo Meu",
    productAriaPrefix: "Produto",
    switchToAreias: "Ver Areias",
    switchToToppers: "Ver Toppers",
    editorialOne: {
      imageAlt: "Tutora e seu cão em momento de carinho em ambiente premium",
      kicker: "Vínculo e Cuidado",
      title: "O melhor para quem",
      titleHighlight: "está sempre ao seu lado.",
      body: "Nossos produtos são desenvolvidos para elevar a qualidade de vida do seu pet por meio de nutrição natural e higiene consciente. Porque um amigo feliz é um amigo saudável.",
      ctaLabel: "Explorar catálogo",
    },
    editorialTwo: {
      imageAlt: "Tutora segurando produto Amigo Meu ao lado de caixa de areia",
      kicker: "Para quem ama gatos",
      title: "A areia que cuida",
      titleHighlight: "de tudo.",
      body: "Alta absorção, zero odor e textura suave nas patas. A areia Amigo Meu é feita com mandioca pura e chega em três aromas — sem fragrância, capim-limão e lavanda. Biodegradável e fácil de descartar: uma escolha consciente para quem ama seus gatos.",
      ctaLabel: "Ver linha de areias",
    },
    faq: {
      kicker: "Suporte Amigo Meu",
      title: "Perguntas Frequentes",
      subtitle: "Dúvidas comuns sobre nossas linhas de areias e toppers.",
    },
  },
  "en-US": {
    seoTitle: "Amigo Meu Pet — Natural Litter and Toppers",
    heroImageAlt: "Life with Amigo Meu",
    floatingProductAlt: "Amigo Meu product",
    productAriaPrefix: "Product",
    switchToAreias: "See Cat Litters",
    switchToToppers: "See Toppers",
    editorialOne: {
      imageAlt: "Pet parent and dog sharing a caring moment in a premium space",
      kicker: "Bond and Care",
      title: "The best for those",
      titleHighlight: "who are always by your side.",
      body: "Our products are developed to improve your pet’s quality of life through natural nutrition and conscious hygiene. Because a happy friend is a healthy friend.",
      ctaLabel: "Explore catalog",
    },
    editorialTwo: {
      imageAlt: "Pet parent holding Amigo Meu product near the litter box",
      kicker: "For cat lovers",
      title: "The litter that",
      titleHighlight: "takes care of everything.",
      body: "High absorption, zero odor, and a soft paw feel. Amigo Meu litter is made from pure cassava and available in three options — unscented, lemongrass, and lavender. Biodegradable and easy to dispose of.",
      ctaLabel: "See litter line",
    },
    faq: {
      kicker: "Amigo Meu Support",
      title: "Frequently Asked Questions",
      subtitle: "Common questions about our cat litter and topper lines.",
    },
  },
  "es-ES": {
    seoTitle: "Amigo Meu Pet — Arena Natural y Toppers",
    heroImageAlt: "Vida con Amigo Meu",
    floatingProductAlt: "Producto Amigo Meu",
    productAriaPrefix: "Producto",
    switchToAreias: "Ver Arenas",
    switchToToppers: "Ver Toppers",
    editorialOne: {
      imageAlt: "Tutora y su perro en un momento de cuidado en ambiente premium",
      kicker: "Vínculo y Cuidado",
      title: "Lo mejor para quienes",
      titleHighlight: "siempre están a tu lado.",
      body: "Nuestros productos fueron desarrollados para elevar la calidad de vida de tu mascota con nutrición natural e higiene consciente. Porque un amigo feliz es un amigo sano.",
      ctaLabel: "Explorar catálogo",
    },
    editorialTwo: {
      imageAlt: "Tutora sosteniendo producto Amigo Meu junto a la caja de arena",
      kicker: "Para quienes aman a los gatos",
      title: "La arena que cuida",
      titleHighlight: "de todo.",
      body: "Alta absorción, cero olor y textura suave para las patas. La arena Amigo Meu está hecha con mandioca pura y llega en tres opciones — sin fragancia, hierba limón y lavanda. Biodegradable y fácil de desechar.",
      ctaLabel: "Ver línea de arenas",
    },
    faq: {
      kicker: "Soporte Amigo Meu",
      title: "Preguntas Frecuentes",
      subtitle: "Dudas habituales sobre nuestras líneas de arenas y toppers.",
    },
  },
};

// ── Product Showcase with dynamic color buttons ───────────────────
function ProductShowcase({
  products,
  title,
  highlight,
  kicker,
  linkTo,
  seeAllLabel,
  secondaryLabel,
  productAriaPrefix,
  flip = false,
}: {
  products: Array<{
    id: string;
    image: string;
    accentColor: string;
    btnBg: string;
    btnHover: string;
    name: string;
    description: string;
    badges?: string[];
  }>;
  title: string;
  highlight: string;
  kicker: string;
  linkTo: string;
  seeAllLabel: string;
  secondaryLabel: string;
  productAriaPrefix: string;
  flip?: boolean;
}) {
  const [active, setActive] = useState(0);
  const current = products[active];

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % products.length), 5500);
    return () => clearInterval(t);
  }, [products.length]);

  return (
    <section className="py-16 lg:py-32 bg-white border-t border-[#e8e8e8]">
      <div className="page-container">
        <div className={`grid items-center gap-16 lg:grid-cols-2 ${flip ? "lg:[direction:rtl]" : ""}`}>

          {/* Image Panel - Hidden on mobile */}
          <FadeInSection variant="image" className={`hidden lg:block ${flip ? "lg:[direction:ltr]" : ""}`}>
            <div
              className="relative flex items-center justify-center h-[360px] lg:h-[500px] border border-[#e8e8e8] overflow-hidden transition-colors duration-700"
              style={{ background: `${current.accentColor}15` }}
            >
              {/* Color stripe top — matches current product */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1"
                animate={{ backgroundColor: current.accentColor }}
                transition={{ duration: 0.8 }}
              />

              <AnimatePresence mode="popLayout">
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.name}
                  className="h-[85%] w-auto object-contain relative z-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>

              {/* Dot selector */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {products.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActive(i)}
                    className="h-1.5 rounded-none cursor-pointer border-0"
                    animate={{
                      width: i === active ? 32 : 8,
                      backgroundColor: i === active ? current.accentColor : "#cccccc",
                    }}
                    transition={{ duration: 0.3 }}
                    aria-label={`${productAriaPrefix} ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Content Panel */}
          <FadeInSection delay={120} className={flip ? "lg:[direction:ltr]" : ""}>
            <div className="space-y-8">
              <motion.span
                className="section-kicker"
                animate={{ color: current.accentColor, borderColor: `${current.accentColor}33`, backgroundColor: `${current.accentColor}10` }}
                transition={{ duration: 0.6 }}
              >
                {kicker}
              </motion.span>

              <h2 className="heading-lg">
                {title}
                <br />
                <motion.span
                  animate={{ color: current.accentColor }}
                  transition={{ duration: 0.6 }}
                >
                  {highlight}
                </motion.span>
              </h2>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-3"
                >
                  <p className="text-[0.72rem] font-bold tracking-[0.2em] uppercase text-[#888888]">{current.name}</p>
                  <p className="text-[1rem] leading-relaxed text-[#666666] max-w-sm">{current.description}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {current.badges?.map((b: string) => (
                      <span
                        key={b}
                        className="text-[0.68rem] font-bold tracking-[0.06em] uppercase px-3 py-1.5 border"
                        style={{ color: current.accentColor, borderColor: `${current.accentColor}44`, background: `${current.accentColor}0a` }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Thumbnail selector */}
              <div className="flex gap-3 pt-2">
                {products.map((p, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActive(i)}
                    className="w-16 h-16 border flex items-center justify-center overflow-hidden cursor-pointer bg-transparent transition-all duration-200"
                    animate={{ borderColor: i === active ? p.accentColor : "#e8e8e8" }}
                  >
                    <img src={p.image} alt={p.name} className="h-12 w-auto object-contain" />
                  </motion.button>
                ))}
              </div>

              {/* Dynamic color CTA buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to={linkTo}
                  className="inline-flex items-center gap-2 px-6 py-3 text-white text-[0.78rem] font-bold tracking-[0.1em] uppercase transition-all duration-300"
                  style={{ backgroundColor: current.btnBg }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = current.btnHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = current.btnBg)}
                >
                  {seeAllLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to={linkTo}
                  className="inline-flex items-center gap-2 px-6 py-3 text-[0.78rem] font-bold tracking-[0.1em] uppercase border transition-all duration-300 bg-transparent"
                  style={{ color: current.accentColor, borderColor: current.accentColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = current.btnBg;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = current.accentColor;
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                  {secondaryLabel}
                </Link>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ── Editorial section (photo + text) ─────────────────────────────
function EditorialSection({
  image,
  imageAlt,
  kicker,
  title,
  titleHighlight,
  body,
  ctaLabel,
  ctaHref,
  flip = false,
  bg = "#5bbced",
}: {
  image: string;
  imageAlt: string;
  kicker: string;
  title: string;
  titleHighlight?: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  flip?: boolean;
  bg?: string;
}) {
  return (
    <section className={`border-t border-[#e8e8e8] relative overflow-hidden`} style={{ backgroundColor: bg }}>
      <div className={`flex flex-col lg:flex-row min-h-[400px] lg:min-h-[600px] ${flip ? "lg:flex-row-reverse" : ""}`}>
        {/* Content Side */}
        <div className="w-full lg:w-1/2 flex items-center py-16 lg:py-32 px-8 lg:px-24 xl:px-40">
          <div className="max-w-xl">
            <FadeInSection delay={50}>
              <span className="section-kicker !bg-white/10 !text-white !border-white/30 uppercase tracking-[0.2em]">
                {kicker}
              </span>
            </FadeInSection>
            <FadeInSection delay={130}>
              <h2 className="heading-lg mt-6 !text-white">
                {title}
                {titleHighlight && (
                  <>
                    <br />
                    <span className="text-white/80">{titleHighlight}</span>
                  </>
                )}
              </h2>
            </FadeInSection>
            <FadeInSection delay={210}>
              <p className="mt-8 text-[1.1rem] leading-relaxed text-white/90 font-light">
                {body}
              </p>
            </FadeInSection>
            <FadeInSection delay={290} className="pt-10">
              <Link to={ctaHref} className="px-8 py-4 border-2 border-white/40 text-white text-[0.85rem] font-bold tracking-[0.15em] uppercase hover:bg-white/10 transition-all inline-flex items-center">
                {ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </FadeInSection>
          </div>
        </div>

        {/* Image Side - Full Bleed - Hidden on mobile */}
        <FadeInSection variant="image" className="hidden lg:block w-full lg:w-1/2 min-h-[300px] lg:min-h-0 relative">
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
          />
          {/* Subtle overlay gradient */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none`} />
        </FadeInSection>
      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function Home() {
  const { t, locale } = useI18n();
  const copy = homeCopyByLocale[locale];
  const heroRef = useRef<HTMLDivElement>(null);

  const areiasProducts = areiasAssets.map((a, i) => ({ ...a, ...t.areias.products[i] }));
  const toppersProducts = toppersAssets.map((a, i) => ({ ...a, ...t.toppers.products[i] }));

  // useEffect e refs removidos para tirar o produto flutuante

  return (
    <main className="overflow-hidden bg-white">
      <Helmet>
        <title>{copy.seoTitle}</title>
        <meta name="description" content={t.hero.subtitle} />
      </Helmet>

      {/* ══ HERO — Brand Blue Block ══ */}
      <section ref={heroRef} className="relative lg:h-[93dvh] flex flex-col items-stretch overflow-hidden bg-[#5bbced]">
        {/* Full-bleed image panel (Right side) - Hidden on mobile */}
        <div className="hidden lg:block relative lg:absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 order-1 lg:order-2">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center"
          >
            <source src="/videos/video_Site_2.mp4?v=1" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#5bbced] from-0% via-[#5bbced]/10 via-30% to-transparent hidden lg:block" />
        </div>

        <div className="page-container relative z-10 w-full order-2 lg:order-1 flex items-center">
          <div className="grid lg:grid-cols-2 items-center">
            {/* Left — Text (White on Blue) */}
            <div className="py-8 lg:py-32 lg:pr-16">
              <FadeInSection delay={50}>
                <span className="section-kicker !bg-white/10 !text-white !border-white/30 uppercase tracking-[0.2em]">{t.hero.kicker}</span>
              </FadeInSection>

              <FadeInSection delay={130} className="mt-8">
                <h1 className="heading-xl leading-[0.95] tracking-wide !text-white">
                  {t.hero.title}
                  <br />
                  <span className="text-white/80">{t.hero.titleHighlight}</span>
                </h1>
              </FadeInSection>

              <FadeInSection delay={220} className="mt-8">
                <p className="text-[1.25rem] leading-relaxed text-white/90 max-w-md font-light">
                  {t.hero.subtitle}
                </p>
              </FadeInSection>

              <FadeInSection delay={310} className="mt-12">
                <div className="flex flex-wrap gap-4">
                  <Link to="/areias" className="px-8 py-4 bg-[#00b03b] text-white text-[0.85rem] font-bold tracking-[0.15em] uppercase hover:bg-[#009030] transition-all flex items-center gap-2">
                    {t.hero.ctaPrimary}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/toppers" className="px-8 py-4 border-2 border-white/40 text-white text-[0.85rem] font-bold tracking-[0.15em] uppercase hover:bg-white/10 transition-all">
                    {t.hero.ctaSecondary}
                  </Link>
                </div>
              </FadeInSection>

              <FadeInSection delay={400} className="mt-12 lg:mt-16">
                <div className="flex flex-wrap items-center gap-8 lg:gap-10 pt-10 border-t border-white/20">
                  {[
                    { value: t.hero.stat100, label: t.hero.badgeNatural },
                    { value: t.hero.statZero, label: t.hero.badgePlastic },
                    { value: t.hero.statBio, label: t.hero.badgeBio },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[2.8rem] font-black leading-none text-white tracking-tight">
                        <CountUp value={s.value} duration={2 + i * 0.5} />
                      </span>
                      <span className="text-xs text-white/70 uppercase tracking-[0.25em] font-bold mt-3">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeInSection>
            </div>

          </div>
        </div>
      </section>

      {/* ══ CATALOG CTA — Brand Green Block ══ */}
      <section className="py-16 bg-[#00b03b]">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <FadeInSection className="max-w-2xl">
              <h2 className="heading-md !text-white !mb-0 uppercase tracking-wider">
                Explore o nosso catálogo completo de produtos 2025
              </h2>
            </FadeInSection>
            <FadeInSection delay={100}>
              <Link to="/catalogo" className="px-10 py-5 bg-white text-[#00b03b] text-[0.9rem] font-black tracking-[0.2em] uppercase hover:bg-white/90 transition-all shadow-xl">
                Ver catálogo
              </Link>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ══ AREIAS PRODUCT SHOWCASE — Subtle Block ══ */}
      <div className="bg-[#f7fafc]">
        <ProductShowcase
          products={areiasProducts}
          title={t.areias.title}
          highlight={t.areias.titleHighlight}
          kicker={t.areias.kicker}
          linkTo="/areias"
          seeAllLabel={t.areias.seeAll}
          secondaryLabel={copy.switchToToppers}
          productAriaPrefix={copy.productAriaPrefix}
        />
      </div>

      {/* ══ TOPPERS PRODUCT SHOWCASE — Brand Red Block ══ */}
      <section className="bg-[#c42127] text-white overflow-hidden">
        <ProductShowcase
          products={toppersProducts}
          title={t.toppers.title}
          highlight={t.toppers.titleHighlight}
          kicker={t.toppers.kicker}
          linkTo="/toppers"
          seeAllLabel={t.toppers.seeAll}
          secondaryLabel={copy.switchToAreias}
          productAriaPrefix={copy.productAriaPrefix}
          flip={true}
        />
      </section>


      {/* ══ EDITORIAL — Lifestyle woman and dog ══ */}
      <EditorialSection
        image="/images/hero-gatoecachrro.png"
        imageAlt={copy.editorialOne.imageAlt}
        kicker={copy.editorialOne.kicker}
        title={copy.editorialOne.title}
        titleHighlight={copy.editorialOne.titleHighlight}
        body={copy.editorialOne.body}
        ctaLabel={copy.editorialOne.ctaLabel}
        ctaHref="/catalogo"
        flip={true}
        bg="#5bbced"
      />

      {/* ══ EDITORIAL — Lifestyle areia ══ */}
      <EditorialSection
        image="/images/hero-areias.png"
        imageAlt={copy.editorialTwo.imageAlt}
        kicker={copy.editorialTwo.kicker}
        title={copy.editorialTwo.title}
        titleHighlight={copy.editorialTwo.titleHighlight}
        body={copy.editorialTwo.body}
        ctaLabel={copy.editorialTwo.ctaLabel}
        ctaHref="/areias"
        flip={false}
        bg="#5bbced"
      />

      {/* ══ FAQ ══ */}
      <section className="bg-white border-t border-[#e8e8e8]">
        <FAQ items={t.faq.items} kicker={copy.faq.kicker} title={copy.faq.title} subtitle={copy.faq.subtitle} />
      </section>

      {/* ══ PARTNERSHIPS — Brand Blue Block ══ */}
      <section className="py-16 lg:py-32 bg-[#5bbced] text-white">
        <div className="page-container">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <FadeInSection>
              <span className="text-[0.8rem] font-bold tracking-[0.3em] uppercase opacity-80">Parcerias Estratégicas</span>
              <h2 className="heading-lg !text-white mt-4 uppercase leading-tight">
                Leve a Amigo Meu para a sua loja
              </h2>
              <p className="mt-6 text-[1.1rem] text-white/80 max-w-lg mx-auto leading-relaxed">
                Oferecemos condições exclusivas para distribuidores e lojistas que buscam produtos de alta performance e apelo sustentável.
              </p>
              <div className="mt-10">
                <Link to="/b2b" className="px-10 py-5 bg-[#00b03b] text-white text-[0.9rem] font-black tracking-[0.2em] uppercase hover:bg-[#009030] transition-all inline-block shadow-lg">
                  Seja um Parceiro
                </Link>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ══ */}
      <section className="py-16 lg:py-32 bg-[#174878] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#5bbced]" />
        <div className="page-container text-center text-white relative z-10">
          <FadeInSection>
            <span className="section-kicker !text-[#5bbced] !bg-[#5bbced]/10 !border-[#5bbced]/30 uppercase tracking-[0.2em]">
              {t.values.kicker}
            </span>
            <h2 className="heading-lg !text-white mt-8 leading-tight uppercase">
              {t.cta.title}
              <br />
              <span className="text-[#5bbced]">{t.cta.titleHighlight}</span>
            </h2>
            <p className="mt-8 text-[1.1rem] text-white/50 max-w-lg mx-auto font-light leading-relaxed">
              Transformando a rotina dos pets com tecnologia sustentável e ingredientes 100% naturais.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-14">
              <Link to="/comprar" className="px-10 py-5 bg-[#00b03b] text-white text-[0.9rem] font-black tracking-[0.2em] uppercase hover:bg-[#009030] transition-all flex items-center gap-3 shadow-xl">
                <ShoppingCart className="h-5 w-5" />
                {t.cta.btnStore}
              </Link>
              <Link
                to="/b2b"
                className="px-10 py-5 border-2 border-white/20 text-white text-[0.9rem] font-bold tracking-[0.2em] uppercase hover:bg-white/5 transition-all"
              >
                {t.cta.btnPartner}
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </main>
  );
}



