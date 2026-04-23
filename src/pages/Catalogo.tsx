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
      categoryLabel: copy.categoryAreias,
    })),
    ...toppersAssets.map((asset, index) => ({
      ...asset,
      name: t.toppers.products[index]?.name ?? asset.id,
      categoryLabel: copy.categoryToppers,
    })),
  ];

  return (
    <main className="overflow-hidden h-[100dvh]">
      <Helmet>
        <title>{copy.pageTitle} | Amigo Meu</title>
        <meta name="description" content={copy.pageDescription} />
      </Helmet>

      {/* Hero — Brand Blue Block */}
      <section className="h-[100dvh] flex items-center bg-[#5bbced] text-white pt-20">
        <div className="page-container text-left">
          <FadeInSection>
            <span className="section-kicker !bg-white/20 !text-white !border-white/30 uppercase tracking-[0.2em]">
              {copy.kicker}
            </span>
            <h1 className="heading-xl !text-white mt-8 uppercase tracking-tight leading-[0.95]">
              {copy.headingPrefix}{" "}
              <span className="text-white/70 italic font-bold">
                {copy.headingHighlight}
              </span>
            </h1>
            <p className="mt-8 text-white/80 font-light max-w-xl text-[1.25rem] leading-relaxed">
              {copy.intro}
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="py-24 bg-[#fafafa]">
        <div className="page-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {allProducts.map((product, idx) => (
              <FadeInSection key={product.id} delay={idx * 50}>
                <div className="group bg-white border-4 border-white shadow-xl overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-500 rounded-[1.5rem]">
                  <div className="relative aspect-[4/5] flex items-center justify-center p-12 bg-[#f0f0f0] group-hover:bg-white transition-colors overflow-hidden">
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
                    <h3 className="text-2xl font-black text-[#1a1a1a] leading-none uppercase tracking-tight">
                      {product.name}
                    </h3>
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

      <section className="py-24 bg-[#111118] text-white">
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
