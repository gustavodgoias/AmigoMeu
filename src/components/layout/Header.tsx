import { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingCart, ChevronDown, Phone, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
import { useI18n } from "../../i18n";
import type { Locale } from "../../i18n";
import LanguageSwitcher from "../LanguageSwitcher";

const headerCopyByLocale: Record<Locale, { catalog: string; toggleMenu: string; contact: string }> = {
  "pt-BR": {
    catalog: "Catálogo",
    toggleMenu: "Abrir menu",
    contact: "Contato",
  },
  "en-US": {
    catalog: "Catalog",
    toggleMenu: "Open menu",
    contact: "Contact",
  },
  "es-ES": {
    catalog: "Catálogo",
    toggleMenu: "Abrir menú",
    contact: "Contacto",
  },
};

function ContactDropdown({ copy }: { copy: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<any>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`inline-flex items-center gap-1 px-3 py-2 text-[0.72rem] font-bold tracking-[0.14em] uppercase transition-all duration-200 relative ${
          isOpen ? "text-primary-500" : "text-[#1a1a1a] hover:text-primary-500"
        }`}
      >
        {copy.contact}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#f2f2f2] overflow-hidden"
          >
            <div className="p-2 flex flex-col gap-1">
              <a href="https://wa.me/5519999902520" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 text-[0.8rem] text-[#1a1a1a] hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors">
                <MessageCircle className="h-4 w-4 text-primary-500" />
                <span>(19) 9 9990-2520</span>
              </a>
              <a href="tel:+551935823633" className="flex items-center gap-3 px-4 py-3 text-[0.8rem] text-[#1a1a1a] hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors">
                <Phone className="h-4 w-4 text-primary-500" />
                <span>(19) 3582-3633</span>
              </a>
              <div className="h-[1px] bg-[#f2f2f2] my-1 mx-2" />
              <a href="https://www.instagram.com/amigomeu.petfeliz/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 text-[0.8rem] text-[#1a1a1a] hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors">
                <Instagram className="h-4 w-4 text-primary-500" />
                <span>Instagram</span>
              </a>
              <a href="https://www.facebook.com/amigomeu.petfeliz/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 text-[0.8rem] text-[#1a1a1a] hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors">
                <Facebook className="h-4 w-4 text-primary-500" />
                <span>Facebook</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileContactMenu({ copy, closeMenu }: { copy: any; closeMenu: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col border-b border-[#f2f2f2] last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between py-4 text-[0.8rem] font-bold tracking-[0.14em] uppercase text-[#1a1a1a] hover:text-primary-500 transition-colors w-full text-left"
      >
        {copy.contact}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1 pb-4 pl-4">
              <a href="https://wa.me/5519999902520" onClick={closeMenu} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 text-[0.85rem] text-[#666] hover:text-primary-500">
                <MessageCircle className="h-4 w-4" />
                <span>(19) 9 9990-2520</span>
              </a>
              <a href="tel:+551935823633" onClick={closeMenu} className="flex items-center gap-3 py-3 text-[0.85rem] text-[#666] hover:text-primary-500">
                <Phone className="h-4 w-4" />
                <span>(19) 3582-3633</span>
              </a>
              <a href="https://www.instagram.com/amigomeu.petfeliz/" onClick={closeMenu} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 text-[0.85rem] text-[#666] hover:text-primary-500">
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
              </a>
              <a href="https://www.facebook.com/amigomeu.petfeliz/" onClick={closeMenu} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 text-[0.85rem] text-[#666] hover:text-primary-500">
                <Facebook className="h-4 w-4" />
                <span>Facebook</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const { t, locale } = useI18n();
  const copy = headerCopyByLocale[locale];
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { label: t.nav.areias, href: "/areias" },
    { label: t.nav.toppers, href: "/toppers" },
    { label: t.nav.sobre, href: "/sobre" },
    { label: copy.catalog, href: "/catalogo" },
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
                <ContactDropdown copy={copy} />
              </div>
            </nav>

            <div className="hidden items-center gap-4 lg:flex shrink-0">
              <LanguageSwitcher />
              <Link to="/catalogo" className="btn-primary py-2.5 px-6 flex items-center gap-2">
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

      </header>

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
                    `py-4 text-[0.8rem] font-bold tracking-[0.14em] uppercase border-b border-[#f2f2f2] transition-colors ${
                      isActive ? "text-primary-500" : "text-[#1a1a1a] hover:text-primary-500"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <MobileContactMenu copy={copy} closeMenu={() => setMobileMenuOpen(false)} />
              <div className="mt-6">
                <Link
                  to="/catalogo"
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

      <div className={scrolled ? "h-[54px] lg:h-[57px]" : "h-[62px] lg:h-[73px]"} style={{ transition: "height 0.3s" }} />
    </>
  );
}
