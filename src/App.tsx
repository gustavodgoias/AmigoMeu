import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Areias from "./pages/Areias";
import Toppers from "./pages/Toppers";
import B2B from "./pages/B2B";
import ComprarOnline from "./pages/ComprarOnline";
import Sobre from "./pages/Sobre";
import HistoriaMandioca from "./pages/HistoriaMandioca";
import Catalogo from "./pages/Catalogo";
import NotFound from "./pages/NotFound";
import { useI18n } from "./i18n";
import type { Locale } from "./i18n";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);

  const coreX = useSpring(mouseX, { damping: 42, stiffness: 1200, mass: 0.2 });
  const coreY = useSpring(mouseY, { damping: 42, stiffness: 1200, mass: 0.2 });
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 420, mass: 0.35 });
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 420, mass: 0.35 });
  const glowX = useSpring(mouseX, { damping: 24, stiffness: 200, mass: 0.6 });
  const glowY = useSpring(mouseY, { damping: 24, stiffness: 200, mass: 0.6 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateEnabled = () => setEnabled(mediaQuery.matches);

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);
    return () => mediaQuery.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("cursor-enhanced");
      return;
    }

    const updateCursor = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest(
          "a, button, [role='button'], input, textarea, select, [data-cursor='active']",
        ),
      );
      setInteractive(isInteractive);
    };

    const onLeave = (event: MouseEvent) => {
      if (!event.relatedTarget) setVisible(false);
    };
    const onMouseDown = () => setPressed(true);
    const onMouseUp = () => setPressed(false);

    document.body.classList.add("cursor-enhanced");
    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      document.body.classList.remove("cursor-enhanced");
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9996] hidden lg:block h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
        style={{
          x: glowX,
          y: glowY,
          opacity: visible ? (interactive ? 0.52 : 0.3) : 0,
          scale: pressed ? 0.88 : interactive ? 1.1 : 1,
          background:
            "radial-gradient(circle, rgba(41,116,180,0.35) 0%, rgba(41,116,180,0.12) 35%, rgba(41,116,180,0) 72%)",
        }}
      />

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997] hidden lg:block h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-500/45 bg-white/30 backdrop-blur-[2px]"
        style={{
          x: ringX,
          y: ringY,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.82 : interactive ? 1.34 : 1,
        }}
      />

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden lg:block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500"
        style={{
          x: coreX,
          y: coreY,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.7 : interactive ? 1.35 : 1,
        }}
      />
    </>
  );
}

const helmetContext = {};

const schemaDescriptionByLocale: Record<Locale, string> = {
  "pt-BR":
    "Produtos naturais e super premium para gatos e cães. Areias biodegradáveis e toppers funcionais.",
  "en-US":
    "Natural super-premium products for cats and dogs. Biodegradable litter and functional toppers.",
  "es-ES":
    "Productos naturales super premium para gatos y perros. Arenas biodegradables y toppers funcionales.",
};

export default function App() {
  const { locale } = useI18n();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Amigo Meu Pet Feliz",
    "url": "https://amigomeu.pet",
    "logo": "https://amigomeu.pet/images/brand/amigomeu-logo-preferencial.png",
    "description": schemaDescriptionByLocale[locale],
    "sameAs": ["https://instagram.com/amigomeu"],
  };

  return (
    <HelmetProvider context={helmetContext}>
      <Router>
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
          </script>
        </Helmet>
        <ScrollToTop />
        <CustomCursor />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/areias" element={<Areias />} />
              <Route path="/toppers" element={<Toppers />} />
              <Route path="/b2b" element={<B2B />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/mandioca" element={<HistoriaMandioca />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/comprar" element={<ComprarOnline />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
