import { Link } from "react-router-dom";
import { AtSign, Phone, MessageCircle } from "lucide-react";
import { useI18n } from "../../i18n";
import type { Locale } from "../../i18n";

const logoSrc = "/images/brand/amigomeu-logo-preferencial.png";

const footerCopyByLocale: Record<Locale, { catalog: string; about: string }> = {
  "pt-BR": {
    catalog: "Catálogo",
    about: "Sobre a Marca",
  },
  "en-US": {
    catalog: "Catalog",
    about: "About the Brand",
  },
  "es-ES": {
    catalog: "Catálogo",
    about: "Sobre la Marca",
  },
};

export default function Footer() {
  const { t, locale } = useI18n();
  const copy = footerCopyByLocale[locale];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#111118] text-white overflow-hidden relative border-t-8 border-[#5bbced]">
      <div className="py-24 lg:py-32 relative z-10">
        <div className="w-full px-6 lg:px-20 mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 border-b border-white/10 pb-20">
            <div className="lg:col-span-5 space-y-8">
              <img
                src={logoSrc}
                alt="Amigo Meu Pet Feliz"
                className="h-14 w-auto brightness-0 invert opacity-100"
              />
              <p className="max-w-md text-[1rem] leading-relaxed text-white/60 font-light">
                {t.footer.tagline}
              </p>

              <div className="flex flex-col gap-3 pt-4">
                <a
                  href="tel:+551935823633"
                  className="flex items-center gap-3 text-[0.95rem] font-medium text-white/70 transition-colors hover:text-white"
                >
                  <Phone strokeWidth={1.5} className="h-5 w-5 opacity-50" />
                  <span>(19) 3582-3633</span>
                </a>
                <a
                  href="https://wa.me/5519999902520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[0.95rem] font-medium text-white/70 transition-colors hover:text-white"
                >
                  <MessageCircle strokeWidth={1.5} className="h-5 w-5 opacity-50" />
                  <span>(19) 9 9990-2520</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-3 lg:col-start-7 space-y-8">
              <h4 className="text-[0.75rem] font-bold tracking-[0.15em] text-white/40 uppercase">
                {t.footer.explore}
              </h4>
              <ul className="space-y-4 text-[0.95rem] font-medium text-white/70">
                <li>
                  <Link to="/areias" className="transition-colors hover:text-white inline-block">
                    {t.nav.areias}
                  </Link>
                </li>
                <li>
                  <Link to="/toppers" className="transition-colors hover:text-white inline-block">
                    {t.nav.toppers}
                  </Link>
                </li>
                <li>
                  <Link to="/b2b" className="transition-colors hover:text-white inline-block">
                    {t.nav.b2b}
                  </Link>
                </li>
                <li>
                  <Link to="/comprar" className="transition-colors hover:text-white inline-block">
                    {t.nav.buy}
                  </Link>
                </li>
                <li>
                  <Link to="/catalogo" className="transition-colors hover:text-white inline-block">
                    {copy.catalog}
                  </Link>
                </li>
                <li>
                  <Link to="/sobre" className="transition-colors hover:text-white inline-block">
                    {copy.about}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <h4 className="text-[0.75rem] font-bold tracking-[0.15em] text-white/40 uppercase">
                {t.footer.support}
              </h4>
              <div className="space-y-4 text-[0.95rem] font-medium text-white/70">
                <a
                  href="https://instagram.com/amigomeu.petfeliz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <AtSign strokeWidth={1.5} className="h-5 w-5 opacity-50" />
                  <span>@amigomeu.petfeliz</span>
                </a>
                <p className="block pt-4 text-[0.85rem] text-white/40 font-light leading-relaxed">
                  {t.footer.hours}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 pt-10 text-[0.85rem] font-medium text-white/40 md:flex-row md:items-center md:justify-between">
            <p>
              © {currentYear} Amigo Meu Pet Feliz. {t.footer.rights}
            </p>
            <div className="flex gap-8">
              <Link to="/areias" className="transition-colors hover:text-white">
                {t.nav.areias}
              </Link>
              <Link to="/toppers" className="transition-colors hover:text-white">
                {t.nav.toppers}
              </Link>
              <Link to="/b2b" className="transition-colors hover:text-white">
                {t.nav.b2b}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
