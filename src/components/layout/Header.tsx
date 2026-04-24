import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "../../i18n";
import type { Locale } from "../../i18n";
import LanguageSwitcher from "../LanguageSwitcher";

const headerCopyByLocale: Record<Locale, { catalog: string; toggleMenu: string }> = {
  "pt-BR": {
    catalog: "Catálogo",
    toggleMenu: "Abrir menu",
  },
  "en-US": {
    catalog: "Catalog",
    toggleMenu: "Open menu",
  },
  "es-ES": {
    catalog: "Catálogo",
    toggleMenu: "Abrir menú",
  },
};

export default function Header() {
  const { t, locale } = useI18n();
  const copy = headerCopyByLocale[locale];
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { label: t.nav.areias, href: "/areias" },
    { label: t.nav.toppers, href: "/toppers" },
    { label: copy.catalog, href: "/catalogo" },
    { label: t.nav.sobre, href: "/sobre" },
    { label: t.nav.b2b, href: "/b2b" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center px-3 py-2 text-[0.72rem] font-bold tracking-[0.14em] uppercase transition-all duration-200 relative ${
      isActive
        ? "text-primary-500 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-primary-500"
        : "text-[#1a1a1a] hover:text-primary-500"
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
          scrolled
            ? "py-2 lg:py-3 bg-white/96 backdrop-blur-md border-b border-[#e8e8e8] shadow-sm"
            : "py-3 lg:py-5 bg-white border-b border-[#e8e8e8]/70"
        }`}
      >
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-primary-500 z-50 pointer-events-none"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="page-container">
          <div className="flex items-center justify-between gap-8">
            <Link to="/" className="flex items-center group shrink-0">
              <img
                src="/images/brand/amigomeu-logo-preferencial.png"
                alt="Amigo Meu Pet Feliz"
                className={`w-auto transition-all duration-300 ${scrolled ? "h-6 lg:h-7" : "h-7 lg:h-9"}`}
              />
            </Link>

            <nav className="hidden flex-1 items-center justify-center lg:flex">
              <div className="flex items-center gap-0.5">
                {navItems.map((item) => (
                  <NavLink key={item.href} to={item.href} className={navLinkClass}>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </nav>

            <div className="hidden items-center gap-4 lg:flex shrink-0">
              <LanguageSwitcher />
              <Link to="/comprar" className="btn-primary py-2.5 px-6 flex items-center gap-2">
                <ShoppingCart className="h-3.5 w-3.5" />
                {t.nav.buy}
              </Link>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <LanguageSwitcher />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex p-2 text-[#1a1a1a] hover:text-primary-500 transition-colors"
                aria-label={copy.toggleMenu}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className={`fixed inset-0 ${scrolled ? 'top-[54px]' : 'top-[62px]'} bg-white lg:hidden z-[100] overflow-y-auto`}
            >
              <motion.nav 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col px-8 py-10 h-full"
              >
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      `py-4 text-[0.8rem] font-bold tracking-[0.14em] uppercase border-b border-[#f2f2f2] last:border-0 transition-colors ${
                        isActive ? "text-primary-500" : "text-[#1a1a1a] hover:text-primary-500"
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
                <div className="mt-6">
                  <Link
                    to="/comprar"
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {t.nav.buy}
                  </Link>
                </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className={scrolled ? "h-[54px] lg:h-[57px]" : "h-[62px] lg:h-[73px]"} style={{ transition: "height 0.3s" }} />
    </>
  );
}
