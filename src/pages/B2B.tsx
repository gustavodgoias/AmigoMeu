import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Package,
  TrendingUp,
  Shield,
  Phone,
  MessageCircle,
  Leaf,
  Recycle,
  Star,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { FadeInSection } from "./Home";
import { useI18n } from "../i18n";
import type { Locale } from "../i18n";

type TrackTopic = {
  icon: typeof Leaf;
  title: string;
  description: string;
};

type Track = {
  id: string;
  kicker: string;
  title: string;
  highlight: string;
  image: string;
  accent: string;
  topics: TrackTopic[];
};

const b2bPageCopyByLocale: Record<
  Locale,
  {
    heroAlt: string;
    catalogLink: string;
    sectionKicker: string;
    sectionTitle: string;
    whatsappLabel: string;
    areiaAlt: string;
    topperFrangoAlt: string;
    topperCarneAlt: string;
    tracks: Track[];
  }
> = {
  "pt-BR": {
    heroAlt: "Parceria Amigo Meu",
    catalogLink: "Ver catálogo completo",
    sectionKicker: "Por que revender",
    sectionTitle: "Areias e toppers com posicionamento premium e giro real",
    whatsappLabel: "WhatsApp",
    areiaAlt: "Areia Tradicional",
    topperFrangoAlt: "Topper Frango",
    topperCarneAlt: "Topper Carne",
    tracks: [
      {
        id: "areias",
        kicker: "Areias Super Premium",
        title: "Por que revender nossas areias",
        highlight: "e ganhar mercado",
        image: "/images/hero-areias.png",
        accent: "#90C63E",
        topics: [
          {
            icon: Leaf,
            title: "Diferencial sustentável claro",
            description:
              "Produto vegetal com discurso forte para clientes que buscam opções mais conscientes.",
          },
          {
            icon: Shield,
            title: "Performance percebida no uso",
            description:
              "Controle de odor, torrão firme e praticidade elevam satisfação e incentivam recompra.",
          },
          {
            icon: Recycle,
            title: "Valor agregado na categoria",
            description:
              "Posicionamento premium permite trabalhar melhor margem sem competir apenas por preço.",
          },
          {
            icon: TrendingUp,
            title: "Alto potencial de fidelização",
            description:
              "Categoria de uso recorrente com oportunidade real de giro constante no ponto de venda.",
          },
        ],
      },
      {
        id: "toppers",
        kicker: "Toppers Funcionais",
        title: "Por que revender nossos toppers",
        highlight: "junto com rações",
        image: "/images/home-hero-lifestyle.png",
        accent: "#C8A21A",
        topics: [
          {
            icon: Star,
            title: "Cross-sell simples e imediato",
            description:
              "Topper entra como complemento da refeição e aumenta ticket médio por compra.",
          },
          {
            icon: ShoppingCart,
            title: "Alta percepção de valor",
            description:
              "Sabores e proposta funcional criam argumento premium sem complexidade operacional.",
          },
          {
            icon: Package,
            title: "Portfólio compacto e estratégico",
            description:
              "Três sabores cobrem perfis diferentes de consumo com estoque enxuto e eficiente.",
          },
          {
            icon: TrendingUp,
            title: "Mais recorrência no carrinho",
            description:
              "Uso diário estimula recompra frequente e fortalece relação com tutor final.",
          },
        ],
      },
    ],
  },
  "en-US": {
    heroAlt: "Amigo Meu partnership",
    catalogLink: "See full catalog",
    sectionKicker: "Why resell",
    sectionTitle: "Litter and toppers with premium positioning and strong turnover",
    whatsappLabel: "WhatsApp",
    areiaAlt: "Original cat litter",
    topperFrangoAlt: "Chicken topper",
    topperCarneAlt: "Beef topper",
    tracks: [
      {
        id: "areias",
        kicker: "Super Premium Cat Litter",
        title: "Why resell our litter line",
        highlight: "and expand your market",
        image: "/images/hero-areias.png",
        accent: "#90C63E",
        topics: [
          {
            icon: Leaf,
            title: "Clear sustainability edge",
            description:
              "Plant-based positioning creates strong appeal for customers seeking conscious alternatives.",
          },
          {
            icon: Shield,
            title: "Visible performance in use",
            description:
              "Odor control, firm clumps, and convenience increase satisfaction and encourage repeat purchase.",
          },
          {
            icon: Recycle,
            title: "Higher category value",
            description:
              "Premium positioning helps protect margins without relying only on price competition.",
          },
          {
            icon: TrendingUp,
            title: "High loyalty potential",
            description:
              "Recurring-use category with real opportunity for consistent point-of-sale turnover.",
          },
        ],
      },
      {
        id: "toppers",
        kicker: "Functional Toppers",
        title: "Why resell our topper line",
        highlight: "alongside kibble sales",
        image: "/images/hero-toppers.png",
        accent: "#C8A21A",
        topics: [
          {
            icon: Star,
            title: "Simple, immediate cross-sell",
            description:
              "Toppers work as a practical add-on and naturally increase average basket value.",
          },
          {
            icon: ShoppingCart,
            title: "Strong perceived value",
            description:
              "Flavor and functional positioning support premium arguments with low operational complexity.",
          },
          {
            icon: Package,
            title: "Compact strategic portfolio",
            description:
              "Three flavors cover multiple demand profiles with leaner stock management.",
          },
          {
            icon: TrendingUp,
            title: "Higher basket recurrence",
            description:
              "Daily-use behavior encourages frequent repurchase and long-term customer retention.",
          },
        ],
      },
    ],
  },
  "es-ES": {
    heroAlt: "Asociación Amigo Meu",
    catalogLink: "Ver catálogo completo",
    sectionKicker: "Por qué revender",
    sectionTitle: "Arenas y toppers con posicionamiento premium y alta rotación",
    whatsappLabel: "WhatsApp",
    areiaAlt: "Arena Tradicional",
    topperFrangoAlt: "Topper de Pollo",
    topperCarneAlt: "Topper de Carne",
    tracks: [
      {
        id: "areias",
        kicker: "Arenas Super Premium",
        title: "Por qué revender nuestras arenas",
        highlight: "y ganar mercado",
        image: "/images/hero-areias.png",
        accent: "#90C63E",
        topics: [
          {
            icon: Leaf,
            title: "Diferencial sostenible claro",
            description:
              "Producto vegetal con discurso fuerte para clientes que buscan opciones más conscientes.",
          },
          {
            icon: Shield,
            title: "Desempeño visible en uso",
            description:
              "Control de olor, grumo firme y practicidad aumentan satisfacción y recompra.",
          },
          {
            icon: Recycle,
            title: "Mayor valor en categoría",
            description:
              "El posicionamiento premium permite trabajar mejor margen sin competir solo por precio.",
          },
          {
            icon: TrendingUp,
            title: "Alto potencial de fidelización",
            description:
              "Categoría de uso recurrente con oportunidad real de rotación constante en tienda.",
          },
        ],
      },
      {
        id: "toppers",
        kicker: "Toppers Funcionales",
        title: "Por qué revender nuestros toppers",
        highlight: "junto con las raciones",
        image: "/images/hero-toppers.png",
        accent: "#C8A21A",
        topics: [
          {
            icon: Star,
            title: "Cross-sell simple e inmediato",
            description:
              "El topper entra como complemento y eleva el ticket medio por compra.",
          },
          {
            icon: ShoppingCart,
            title: "Alta percepción de valor",
            description:
              "Sabores y propuesta funcional permiten argumento premium sin complejidad operativa.",
          },
          {
            icon: Package,
            title: "Portafolio compacto y estratégico",
            description:
              "Tres sabores cubren perfiles distintos de consumo con stock más eficiente.",
          },
          {
            icon: TrendingUp,
            title: "Más recurrencia en el carrito",
            description:
              "El uso diario impulsa recompra frecuente y fortalece la relación con el tutor final.",
          },
        ],
      },
    ],
  },
};

export default function B2B() {
  const { t, locale } = useI18n();
  const pageCopy = b2bPageCopyByLocale[locale];
  const [formSent, setFormSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setFormSent(true);
    }, 1500);
  };

  return (
    <main className="overflow-hidden">
      <Helmet>
        <title>{t.nav.b2b} | Amigo Meu</title>
        <meta name="description" content={t.b2b.description} />
      </Helmet>

      {/* Hero — Brand Blue Block */}
      <section className="relative lg:h-[93dvh] flex flex-col items-stretch overflow-hidden bg-[#5bbced]">
        <div className="noise-overlay" />
        <div className="hidden lg:block relative lg:absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full h-full"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center opacity-100"
            >
              <source src="/videos/video_Site_2.mp4" type="video/mp4" />
            </video>
          </motion.div>



        </div>

        <div className="page-container relative z-10 w-full order-2 lg:order-1 flex items-center">
          <div className="grid lg:grid-cols-2 items-center">
            <div className="py-12 lg:py-32 lg:pr-16">
              <FadeInSection delay={50}>
                <span className="section-kicker !bg-white/20 !text-white !border-white/30 uppercase tracking-[0.2em]">
                  <Briefcase className="h-3.5 w-3.5" />
                  {t.nav.b2b}
                </span>
              </FadeInSection>

              <FadeInSection delay={130} className="mt-8">
                <h1 className="heading-xl leading-[0.95] !text-white uppercase tracking-tight">
                  {t.b2b.title}
                  <br />
                  <span className="text-white/80">{t.b2b.titleHighlight}</span>
                </h1>
              </FadeInSection>

              <FadeInSection delay={210} className="mt-8">
                <p className="text-[1.35rem] leading-relaxed text-white max-w-md">
                  {t.b2b.description}
                </p>
              </FadeInSection>

              <FadeInSection delay={290} className="mt-12">
                <div className="flex flex-wrap gap-4">
                  <a href="#form-comercial" className="btn-primary flex items-center gap-2 group">
                    {t.b2b.ctaDistributor}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link
                    to="/catalogo"
                    className="inline-flex items-center gap-2 px-6 py-3 text-[0.78rem] font-bold tracking-[0.1em] uppercase border border-white/20 text-white hover:bg-white/10 transition-all bg-transparent"
                  >
                    {pageCopy.catalogLink}
                  </Link>
                </div>
              </FadeInSection>
            </div>


          </div>
        </div>
      </section>

      {/* Tracks Section — Colored Blocks */}
      <section className="py-0 bg-white">
        <div className="w-full">
          <div className="flex flex-col">
            {pageCopy.tracks.map((track, index) => (
              <FadeInSection key={track.id} delay={index * 120} className="w-full">
                <article
                  className="relative overflow-hidden min-h-[600px] flex items-center"
                  style={{ backgroundColor: track.accent }}
                >
                  <div className="noise-overlay opacity-20" />
                  <div className="page-container w-full py-24 lg:py-32">
                    <div className="grid lg:grid-cols-2 items-stretch gap-16">
                      <div
                        className={`${index % 2 !== 0 ? "lg:order-2" : "lg:order-1"} relative min-h-[400px] rounded-none overflow-hidden shadow-2xl`}
                      >
                        <img
                          src={track.image}
                          alt={track.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>

                      <div className={`${index % 2 !== 0 ? "lg:order-1" : "lg:order-2"} space-y-8`}>
                        <span
                          className="inline-flex items-center px-4 py-2 text-[0.75rem] font-black uppercase tracking-[0.2em] bg-white/20 text-white rounded-full"
                        >
                          {track.kicker}
                        </span>
                        <h3 className="text-[2.5rem] lg:text-[3.5rem] uppercase font-black tracking-tight text-white leading-[0.95]">
                          {track.title}
                          <br />
                          <span className="text-white/60">{track.highlight}</span>
                        </h3>

                        <div className="grid sm:grid-cols-2 gap-6 mt-12">
                          {track.topics.map((topic) => (
                            <div
                              key={topic.title}
                              className="group p-10 bg-white/10 backdrop-blur-md border border-white/20 transition-all hover:bg-white/20"
                            >
                              <div
                                className="w-12 h-12 flex items-center justify-center bg-white text-[#1a1a1a] mb-6"
                                style={{ color: track.accent }}
                              >
                                <topic.icon className="h-6 w-6" strokeWidth={2} />
                              </div>
                              <h4 className="text-base font-bold uppercase tracking-[0.1em] text-white">
                                {topic.title}
                              </h4>
                              <p className="mt-3 text-[1.1rem] text-white/90 leading-relaxed">
                                {topic.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#111118]" id="form-comercial">
        <div className="page-container">
          <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.1fr]">
            <FadeInSection>
              <div className="space-y-12">
                <div>
                  <span className="section-kicker !bg-white/10 !text-white !border-white/30 uppercase tracking-[0.2em]">{t.b2b.process.kicker}</span>
                  <h2 className="heading-lg mt-4 leading-tight !text-white">
                    {t.b2b.process.title}{" "}
                    <span className="text-white/60">{t.b2b.process.titleHighlight}</span>
                  </h2>
                </div>

                <ol className="space-y-6">
                  {t.b2b.process.steps.map((item, index) => (
                    <li key={index} className="flex gap-5 items-start">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-white text-white text-[0.85rem] font-black">
                        {index + 1}
                      </span>
                      <p className="text-[1.1rem] leading-relaxed font-light text-white/70 mt-2">{item}</p>
                    </li>
                  ))}
                </ol>

                <div className="border border-white/10 p-10 space-y-6 bg-white/5 backdrop-blur-sm">
                  <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-white/40">
                    {t.b2b.form.vipTitle}
                  </p>
                  <div className="space-y-4">
                    <a
                      href="tel:+551935823633"
                      className="flex items-center gap-4 text-white hover:text-white/70 transition-colors group"
                    >
                      <div className="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:border-white transition-all">
                        <Phone size={18} strokeWidth={1} />
                      </div>
                      <span className="text-[1rem] font-medium tracking-wide">{t.b2b.contacts.items[3].phone}</span>
                    </a>
                    <a
                      href={t.b2b.contacts.items[3].whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-white hover:text-white/70 transition-colors group"
                    >
                      <div className="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:border-white transition-all">
                        <MessageCircle size={18} strokeWidth={1} />
                      </div>
                      <span className="text-[1rem] font-medium tracking-wide">{pageCopy.whatsappLabel}</span>
                    </a>
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={150}>
              <div className="border-4 border-white p-8 lg:p-12 bg-white shadow-2xl">
                <div className="mb-8 pb-8 border-b border-[#e8e8e8]">
                  <h3 className="text-[2rem] font-black text-[#1a1a1a] tracking-tight uppercase leading-[0.95]">
                    {t.b2b.form.title}
                  </h3>
                  <p className="text-[1.1rem] text-[#666666] mt-4 leading-relaxed">{t.b2b.form.subtitle}</p>
                </div>

                {formSent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 py-16 text-center"
                  >
                    <div className="mx-auto flex h-20 w-20 items-center justify-center bg-primary-500/10 text-primary-500">
                      <CheckCircle2 strokeWidth={1} className="h-10 w-10" />
                    </div>
                    <h4 className="text-[1.3rem] font-bold text-[#1a1a1a] uppercase tracking-tight">
                      {t.b2b.form.successTitle}
                    </h4>
                    <p className="text-[0.95rem] text-[#666666] font-light max-w-sm mx-auto">
                      {t.b2b.form.successDesc}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#888888]">
                          {t.b2b.form.labelName}
                        </label>
                        <input placeholder={t.b2b.form.placeholderName} className="input-field" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#888888]">
                          {t.b2b.form.labelCompany}
                        </label>
                        <input placeholder={t.b2b.form.placeholderCompany} className="input-field" required />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#888888]">
                          {t.b2b.form.labelEmail}
                        </label>
                        <input type="email" placeholder={t.b2b.form.placeholderEmail} className="input-field" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#888888]">
                          {t.b2b.form.labelPhone}
                        </label>
                        <input placeholder={t.b2b.form.placeholderPhone} className="input-field" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#888888]">
                        {t.b2b.form.labelMessage}
                      </label>
                      <textarea rows={4} placeholder={t.b2b.form.placeholderMessage} className="textarea-field" />
                    </div>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="btn-primary w-full justify-center py-4 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSending ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        t.b2b.form.btnSubmit
                      )}
                    </button>
                  </form>
                )}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>
    </main>
  );
}
