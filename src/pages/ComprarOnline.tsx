import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ShoppingCart,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { FadeInSection } from "./Home";
import { useI18n } from "../i18n";

// Icons are kept here, content comes from i18n
const channelIcons = [MessageCircle, ShoppingCart];
const channelColors = ["bg-white/50", "bg-white/50"];
const channelHovers = ["hover:border-primary-400", "hover:border-accent-400"];
const channelUrls = [
  "https://wa.me/5519999902520",
  "https://lista.mercadolivre.com.br/amigo-meu"
];

const aromaLabelsByLocale = {
  "pt-BR": {
    tradicional: "Tradicional",
    "capim-limao": "Capim-Limão",
    lavanda: "Lavanda",
    aromaTitle: "Selecione o Aroma:",
    sizeTitle: "Selecione o Peso:",
    btnLabel: "Acessar Anúncio",
  },
  "en-US": {
    tradicional: "Original",
    "capim-limao": "Lemongrass",
    lavanda: "Lavender",
    aromaTitle: "Select the Scent:",
    sizeTitle: "Select the Weight:",
    btnLabel: "Buy on Mercado Livre",
  },
  "es-ES": {
    tradicional: "Tradicional",
    "capim-limao": "Hierba Limón",
    lavanda: "Lavanda",
    aromaTitle: "Selecciona el Aroma:",
    sizeTitle: "Selecciona el Peso:",
    btnLabel: "Comprar en Mercado Livre",
  },
};

const linksML = {
  tradicional: {
    "2kg": "https://www.mercadolivre.com.br/areia-higienica-gatos-biodegradavel-tradicional-2kg/up/MLBU3123720247?pdp_filters=item_id:MLB5352430650",
    "4kg": "https://www.mercadolivre.com.br/areia-higienica-gatos-biodegradavel-tradicional-4kg/up/MLBU3129177274?pdp_filters=item_id:MLB5352432562",
  },
  "capim-limao": {
    "2kg": "https://www.mercadolivre.com.br/areia-organica-biodegradavel-amigo-meu-capim-limao-2kg/up/MLBU3123737651?pdp_filters=item_id:MLB5352420074",
  },
  lavanda: {
    "2kg": "https://www.mercadolivre.com.br/areia-organica-biodegradavel-amigo-meu-lavanda-2kg/up/MLBU3123733291",
  },
};

export default function ComprarOnline() {
  const { t, locale } = useI18n();
  const [selectedAroma, setSelectedAroma] = useState<"tradicional" | "capim-limao" | "lavanda">("tradicional");
  const [selectedSize, setSelectedSize] = useState<"2kg" | "4kg">("2kg");

  const onlineChannels = t.buy.channels.map((channel, idx) => ({
    ...channel,
    url: channelUrls[idx],
    icon: channelIcons[idx],
    color: channelColors[idx],
    hoverColor: channelHovers[idx],
  }));

  const currentMLLink = selectedAroma === "tradicional"
    ? linksML.tradicional[selectedSize]
    : selectedAroma === "capim-limao"
      ? linksML["capim-limao"]["2kg"]
      : linksML.lavanda["2kg"];

  return (
    <main className="overflow-hidden min-h-screen">
      <Helmet>
        <title>{t.nav.buy} | Amigo Meu</title>
        <meta
          name="description"
          content={t.buy.description}
        />
      </Helmet>

      {/* Hero — Brand Blue Block */}
      <section className="relative min-h-0 lg:h-[93dvh] flex items-center bg-[#5bbced] text-white overflow-hidden pt-[73px] lg:pt-0 py-12 lg:py-0">
        <div className="page-container relative z-10 text-left">
          <FadeInSection>
            <div className="flex h-24 w-24 items-center justify-center bg-white/20 border-2 border-white/30 backdrop-blur-md rounded-full text-white mb-10">
              <ShoppingCart strokeWidth={1.5} className="h-10 w-10" />
            </div>
            <span className="section-kicker !bg-white/20 !text-white !border-white/30 uppercase tracking-[0.2em]">
              {t.buy.kicker}
            </span>
            <h1 className="heading-xl !text-white mt-8 uppercase tracking-tight leading-[0.95]">
              {t.buy.title} <br />
              <span className="text-white/70 italic font-black">{t.buy.titleHighlight}</span>
            </h1>
            <p className="mt-8 max-w-xl text-[1.25rem] text-white/80 font-light leading-relaxed">
              {t.buy.description}
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Sales Channels */}
      <section className="py-16 lg:py-32 bg-[#fafafa]">
        <div className="page-container max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2 max-w-4xl mx-auto items-stretch">
            {onlineChannels.map((channel, i) => {
              const isML = i === 1;

              if (!isML) {
                return (
                  <FadeInSection key={channel.name} delay={i * 100} className="h-full">
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-center p-12 bg-white border-4 border-white shadow-xl h-full transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl group rounded-[2rem]"
                    >
                      <div className="h-20 w-20 bg-[#f0f0f0] flex items-center justify-center mb-10 text-[#1a1a1a] transition-all duration-500 group-hover:bg-[#5bbced] group-hover:text-white">
                        <channel.icon strokeWidth={1.5} className="h-10 w-10" />
                      </div>
                      <h3 className="text-[0.9rem] font-black uppercase tracking-[0.2em] mb-6 text-[#1a1a1a]">
                        {channel.name}
                      </h3>
                      <p className="text-[1rem] text-[#666666] font-light leading-relaxed flex-grow">
                        {channel.description}
                      </p>
                      <div className="mt-10 flex items-center gap-3 text-[0.8rem] font-black uppercase tracking-[0.15em] text-[#5bbced]">
                        {t.buy.access} <ArrowRight className="h-4 w-4" />
                      </div>
                    </a>
                  </FadeInSection>
                );
              }

              const copyML = aromaLabelsByLocale[locale as keyof typeof aromaLabelsByLocale] || aromaLabelsByLocale["pt-BR"];

              return (
                <FadeInSection key={channel.name} delay={i * 100} className="h-full">
                  <div className="flex flex-col items-center text-center p-12 bg-white border-4 border-white shadow-xl h-full rounded-[2rem]">
                    <div className="h-20 w-20 bg-[#f0f0f0] flex items-center justify-center mb-10 text-[#1a1a1a] transition-all duration-500">
                      <channel.icon strokeWidth={1.5} className="h-10 w-10" />
                    </div>
                    <h3 className="text-[0.9rem] font-black uppercase tracking-[0.2em] mb-6 text-[#1a1a1a]">
                      {channel.name}
                    </h3>
                    <p className="text-[1rem] text-[#666666] font-light leading-relaxed mb-6">
                      {channel.description}
                    </p>

                    {/* Selector Area */}
                    <div className="w-full flex flex-col gap-6 flex-grow items-center justify-center border-t border-b border-gray-100 py-6 mb-8">
                      {/* Aroma Selector */}
                      <div className="w-full flex flex-col gap-2.5">
                        <span className="text-[0.7rem] font-black uppercase tracking-wider text-gray-400">
                          {copyML.aromaTitle}
                        </span>
                        <div className="flex gap-2 justify-center">
                          {(["tradicional", "capim-limao", "lavanda"] as const).map((aroma) => (
                            <button
                              key={aroma}
                              onClick={() => {
                                setSelectedAroma(aroma);
                                if (aroma !== "tradicional") {
                                  setSelectedSize("2kg");
                                }
                              }}
                              className="px-4 py-2 border-2 text-[0.72rem] font-bold uppercase tracking-wider transition-all cursor-pointer rounded-lg"
                              style={{
                                borderColor: selectedAroma === aroma ? "#5bbced" : "#e8e8e8",
                                backgroundColor: selectedAroma === aroma ? "#5bbced10" : "transparent",
                                color: selectedAroma === aroma ? "#5bbced" : "#1a1a1a",
                              }}
                            >
                              {copyML[aroma]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Size Selector */}
                      {selectedAroma === "tradicional" && (
                        <div className="w-full flex flex-col gap-2.5">
                          <span className="text-[0.7rem] font-black uppercase tracking-wider text-gray-400">
                            {copyML.sizeTitle}
                          </span>
                          <div className="flex gap-2 justify-center">
                            {(["2kg", "4kg"] as const).map((size) => (
                              <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className="px-5 py-2 border-2 text-[0.72rem] font-bold uppercase tracking-wider transition-all cursor-pointer rounded-lg"
                                style={{
                                  borderColor: selectedSize === size ? "#5bbced" : "#e8e8e8",
                                  backgroundColor: selectedSize === size ? "#5bbced10" : "transparent",
                                  color: selectedSize === size ? "#5bbced" : "#1a1a1a",
                                }}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <a
                      href={currentMLLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-between px-8 py-5 text-white text-[0.8rem] font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] duration-300 rounded-xl"
                      style={{ backgroundColor: "#5bbced" }}
                    >
                      <span>{copyML.btnLabel}</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* B2B Footer CTA */}
      <section className="py-16 lg:py-32 bg-[#111118]">
        <div className="page-container max-w-5xl">
          <FadeInSection>
            <div className="relative overflow-hidden bg-white px-10 py-20 lg:flex lg:items-center lg:justify-between lg:text-left shadow-2xl border-l-[12px] border-[#5bbced]">
              <div className="relative z-10 space-y-4 max-w-xl text-center lg:text-left">
                <h3 className="text-[2rem] font-black text-[#1a1a1a] tracking-tight uppercase leading-none">{t.cta.title} <br /><span className="text-[#5bbced]">{t.cta.titleHighlight}</span></h3>
                <p className="text-[#666666] font-light text-lg mt-4">
                  {t.b2b.description}
                </p>
              </div>
              <Link
                to="/b2b"
                className="relative z-10 px-10 py-5 bg-[#1a1a1a] text-white font-black uppercase tracking-[0.15em] text-[0.8rem] hover:bg-black transition-all flex items-center justify-center gap-4 group mt-10 lg:mt-0 whitespace-nowrap shadow-xl"
              >
                {t.cta.btnPartner}
                <ArrowRight strokeWidth={2} className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </main>
  );
}
