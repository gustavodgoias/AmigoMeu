import { Helmet } from "react-helmet-async";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeInSection } from "./Home";
import { useI18n } from "../i18n";
import type { Locale } from "../i18n";

type CatalogAsset = {
  id: string;
  image: string;
  color: string;
  link: string;
  category: "areias" | "toppers";
};

type CatalogProduct = CatalogAsset & {
  name: string;
  subtitle: string;
  categoryLabel: string;
};

const areiasAssets: CatalogAsset[] = [
  {
    id: "tradicional",
    image: "/images/produtos/AMIGO-MEU-2KG-2025-TRADICIONAL.png",
    category: "areias",
    color: "#F37021",
    link: "/areias",
  },
  {
    id: "capim-limao",
    image: "/images/produtos/AMIGO-MEU-2KG-2025-CAPIM-LIMAO.png",
    category: "areias",
    color: "#90C63E",
    link: "/areias",
  },
  {
    id: "lavanda",
    image: "/images/produtos/AMIGO-MEU-2KG-2025-LAVANDA.png",
    category: "areias",
    color: "#4aa8d8",
    link: "/areias",
  },
];

const toppersAssets: CatalogAsset[] = [
  {
    id: "frango",
    image: "/images/produtos/AMIGOMEU-TOPPER-FRANGO-100G.png",
    category: "toppers",
    color: "#C8A21A",
    link: "/toppers",
  },
  {
    id: "carne",
    image: "/images/produtos/AMIGOMEU-TOPPER-CARNE-100G.png",
    category: "toppers",
    color: "#b53c2f",
    link: "/toppers",
  },
  {
    id: "figado",
    image: "/images/produtos/AMIGOMEU-TOPPER-FIGADO-100G.png",
    category: "toppers",
    color: "#5c2a7f",
    link: "/toppers",
  },
];

const catalogCopyByLocale: Record<
  Locale,
  {
    pageTitle: string;
    pageDescription: string;
    kicker: string;
    headingPrefix: string;
    headingHighlight: string;
    intro: string;
    detailsButton: string;
    buyButton: string;
    resellTitlePrefix: string;
    resellTitleHighlight: string;
    resellDescription: string;
    b2bButton: string;
    categoryAreias: string;
    categoryToppers: string;
  }
> = {
  "pt-BR": {
    pageTitle: "Catálogo Completo",
    pageDescription:
      "Explore toda a nossa linha de areias super premium e toppers nutricionais.",
    kicker: "Linha Completa",
    headingPrefix: "Nosso",
    headingHighlight: "Catálogo.",
    intro:
      "Produtos desenvolvidos com biotecnologia natural para elevar o bem-estar do seu pet no dia a dia.",
    detailsButton: "Ver detalhes",
    buyButton: "Comprar agora",
    resellTitlePrefix: "Interessado em",
    resellTitleHighlight: "Revender?",
    resellDescription:
      "Oferecemos condições especiais para lojistas e distribuidores parceiros.",
    b2bButton: "Seja um parceiro B2B",
    categoryAreias: "Areias",
    categoryToppers: "Toppers",
  },
  "en-US": {
    pageTitle: "Full Catalog",
    pageDescription:
      "Explore our complete line of super-premium litters and nutritional toppers.",
    kicker: "Complete Line",
    headingPrefix: "Our",
    headingHighlight: "Catalog.",
    intro:
      "Products developed with natural biotechnology to improve your pet's well-being every day.",
    detailsButton: "View details",
    buyButton: "Buy now",
    resellTitlePrefix: "Interested in",
    resellTitleHighlight: "Reselling?",
    resellDescription:
      "We offer special conditions for partner retailers and distributors.",
    b2bButton: "Become a B2B partner",
    categoryAreias: "Cat Litter",
    categoryToppers: "Toppers",
  },
  "es-ES": {
    pageTitle: "Catálogo Completo",
    pageDescription:
      "Explora nuestra línea completa de arenas super premium y toppers nutricionales.",
    kicker: "Línea Completa",
    headingPrefix: "Nuestro",
    headingHighlight: "Catálogo.",
    intro:
      "Productos desarrollados con biotecnología natural para elevar el bienestar de tu mascota cada día.",
    detailsButton: "Ver detalles",
    buyButton: "Comprar ahora",
    resellTitlePrefix: "¿Interesado en",
    resellTitleHighlight: "Revender?",
    resellDescription:
      "Ofrecemos condiciones especiales para tiendas y distribuidores socios.",
    b2bButton: "Sé un socio B2B",
    categoryAreias: "Arenas",
    categoryToppers: "Toppers",
  },
};

export default function Catalogo() {
  const { t, locale } = useI18n();
  const copy = catalogCopyByLocale[locale];

  const allProducts: CatalogProduct[] = [
    ...areiasAssets.map((asset, index) => ({
      ...asset,
      name: t.areias.products[index]?.name ?? asset.id,
      subtitle: (t.areias.products[index] as any)?.subtitle ?? "",
      categoryLabel: copy.categoryAreias,
    })),
    ...toppersAssets.map((asset, index) => ({
      ...asset,
      name: t.toppers.products[index]?.name ?? asset.id,
      subtitle: (t.toppers.products[index] as any)?.subtitle ?? "",
      categoryLabel: copy.categoryToppers,
    })),
  ];

  return (
    <main className="overflow-hidden min-h-screen">
      <Helmet>
        <title>{copy.pageTitle} | Amigo Meu</title>
        <meta name="description" content={copy.pageDescription} />
      </Helmet>

      {/* Hero — Immersive Video Background */}
      <section className="relative h-[80dvh] lg:h-[93dvh] flex items-center bg-[#5bbced] text-white pt-[73px] lg:pt-0 overflow-hidden">
        {/* Background Video — very subtle texture */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute h-full w-full object-cover opacity-100"
          >
            <source src="/videos/catalogo.mp4" type="video/mp4" />
          </video>
          {/* Strong solid overlay */}
          <div className="absolute inset-0 bg-[#5bbced]/90" />
        </div>

        <div className="page-container relative z-10 text-center flex flex-col items-center justify-center gap-0">
          <FadeInSection>
            {/* Kicker */}
            <span className="section-kicker !bg-white/10 !text-white/80 !border-white/20 uppercase tracking-[0.4em] text-[0.65rem] mx-auto">
              {copy.kicker}
            </span>

            {/* Main heading */}
            <h1 className="text-[4rem] lg:text-[7rem] font-black !text-white mt-10 uppercase tracking-tight leading-[0.85]">
              {copy.headingPrefix}{" "}
              <span className="text-white/40 italic font-light">
                {copy.headingHighlight}
              </span>
            </h1>

            {/* Decorative divider */}
            <div className="mt-12 mb-10 mx-auto w-24 h-[3px] bg-white/40 rounded-full" />

            {/* Intro text */}
            <p className="text-white/80 max-w-2xl mx-auto text-[1.3rem] leading-[1.8] tracking-wider font-light">
              {copy.intro}
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="py-16 lg:py-32 bg-[#fafafa]">
        <div className="page-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {allProducts.map((product, idx) => (
              <FadeInSection key={product.id} delay={idx * 50}>
                <div className="group bg-white border-4 border-white shadow-xl overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-500 rounded-[1.5rem]">
                  <div className="hidden lg:flex relative aspect-[4/5] items-center justify-center p-12 bg-[#f0f0f0] group-hover:bg-white transition-colors overflow-hidden">
                    <div
                      className="absolute top-0 left-0 w-full h-2"
                      style={{ backgroundColor: product.color }}
                    />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-700 z-10"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                      style={{ backgroundColor: product.color }}
                    />
                    <div className="absolute top-6 right-6 px-4 py-2 bg-white border border-black/5 text-[0.7rem] font-black uppercase tracking-[0.15em] text-[#1a1a1a] shadow-sm">
                      {product.categoryLabel}
                    </div>
                  </div>

                  <div className="p-10 flex flex-col flex-grow gap-6">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-black text-[#1a1a1a] leading-none uppercase tracking-wider">
                        {product.name}
                      </h3>
                      {product.subtitle && (
                        <p className="text-base text-gray-600 font-medium leading-tight">
                          {product.subtitle}
                        </p>
                      )}
                    </div>
                    <div className="mt-auto pt-6 flex flex-col gap-4">
                      <Link
                        to={product.link}
                        className="inline-flex items-center justify-between w-full px-8 py-4 bg-[#1a1a1a] text-[0.8rem] font-bold uppercase tracking-widest text-white hover:bg-black transition-all"
                      >
                        {copy.detailsButton}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        to="/comprar"
                        className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 text-white text-[0.8rem] font-black uppercase tracking-widest transition-all hover:brightness-110 shadow-lg"
                        style={{ backgroundColor: product.color }}
                      >
                        <ShoppingCart className="h-5 w-5" />
                        {copy.buyButton}
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-32 bg-[#111118] text-white">
        <div className="page-container text-center">
          <FadeInSection>
            <h2 className="heading-lg !text-white">
              {copy.resellTitlePrefix}{" "}
              <span className="text-primary-500">{copy.resellTitleHighlight}</span>
            </h2>
            <p className="mt-6 text-white/60 font-light mb-10 text-lg">
              {copy.resellDescription}
            </p>
            <Link to="/b2b" className="btn-primary inline-flex">
              {copy.b2bButton}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </FadeInSection>
        </div>
      </section>
    </main>
  );
}
