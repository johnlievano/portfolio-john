import './i18n';
import { useTranslation } from "react-i18next"; // 1. Hook para detectar el idioma
import { motion, AnimatePresence } from "framer-motion"; // 2. Para las animaciones
import { useState, useEffect, lazy, Suspense } from "react";

import { Navbar } from "./components/layout/Navbar";
import { Home } from "./sections/Hero";
import { ScrollToTop } from "./components/layout/ScrollToTop";

// Secciones/efectos debajo del pliegue: se cargan bajo demanda (code-splitting)
// para reducir el JS que el navegador debe parsear/ejecutar en la carga inicial.
const Highlights = lazy(() => import("./sections/Certificados").then(m => ({ default: m.Highlights })));
const Projects = lazy(() => import("./sections/Projects").then(m => ({ default: m.Projects })));
const TechStack = lazy(() => import("./sections/TechStack").then(m => ({ default: m.TechStack })));
const Contact = lazy(() => import("./sections/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("./components/layout/Footer").then(m => ({ default: m.Footer })));
const ParticlesBackground = lazy(() => import("./components/effects/ParticlesBackground").then(m => ({ default: m.ParticlesBackground })));

function App() {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(true); // Controla si se muestra el contenido
  const [nextLang, setNextLang] = useState<string | null>(null); // Guarda el idioma pendiente
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateParticleVisibility = () => setShowParticles(mediaQuery.matches);

    updateParticleVisibility();
    mediaQuery.addEventListener("change", updateParticleVisibility);
    return () => mediaQuery.removeEventListener("change", updateParticleVisibility);
  }, []);

  useEffect(() => {
    // Escuchar el evento que lanza el botón
    const handleLanguageChange = (e: any) => {
      setNextLang(e.detail); // Guardamos el idioma al que queremos ir
      setIsVisible(false);   // Disparamos la animación de SALIDA primero
    };

    window.addEventListener("language-change-request", handleLanguageChange);
    return () => window.removeEventListener("language-change-request", handleLanguageChange);
  }, []);

  return (
    <main className="relative min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-[#050505]">
      <div className="mobile-particle-field" aria-hidden="true" />
      <Suspense fallback={null}>
        {showParticles && <ParticlesBackground />}
      </Suspense>
      <Navbar />

      <div className="relative z-10">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            // ESTA ES LA CLAVE: Cambiamos el idioma solo cuando la animación de salida TERMINÓ
            if (nextLang) {
              i18n.changeLanguage(nextLang);
              setIsVisible(true); // Disparamos la animación de ENTRADA
              setNextLang(null);  // Limpiamos
            }
          }}
        >
          {isVisible && (
            <motion.div
              key="content-wrapper" // Key estática, la visibilidad la controla el booleano
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Home />
              <Suspense fallback={null}>
                <Projects />
                <Highlights />
                <TechStack />
                <Contact />
                <Footer />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>

        <ScrollToTop />
      </div>
    </main>
  );
}

export default App;