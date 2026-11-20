import './i18n';
import { useTranslation } from "react-i18next"; // 1. Hook para detectar el idioma
import { motion, AnimatePresence } from "framer-motion"; // 2. Para las animaciones
import { useState, useEffect, Suspense, lazy } from "react";

import { Navbar } from "./components/layout/Navbar";
import { Home } from "./sections/Hero";
const Projects = lazy(async () => {
  const module = await import("./sections/Projects");
  return { default: module.Projects };
});
const Highlights = lazy(async () => {
  const module = await import("./sections/Certificados");
  return { default: module.Highlights };
});
const TechStack = lazy(async () => {
  const module = await import("./sections/TechStack");
  return { default: module.TechStack };
});
const Contact = lazy(async () => {
  const module = await import("./sections/Contact");
  return { default: module.Contact };
});
const ParticlesBackground = lazy(async () => {
  const module = await import("./components/effects/ParticlesBackground");
  return { default: module.ParticlesBackground };
});
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { DeferredSection } from './components/layout/DeferredSection';
import { BuildLayers } from './sections/BuildLayers';
const Footer = lazy(async () => {
  const module = await import("./components/layout/Footer");
  return { default: module.Footer };
});

function App() {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(true); // Controla si se muestra el contenido
  const [nextLang, setNextLang] = useState<string | null>(null); // Guarda el idioma pendiente
  const [effectsReady, setEffectsReady] = useState(false);

  useEffect(() => {
    // Decorative canvas yields to the initial content and its entrance animation.
    const timer = window.setTimeout(() => setEffectsReady(true), 6000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Escuchar el evento que lanza el botón
    const handleLanguageChange = (e: Event) => {
      setNextLang((e as CustomEvent<string>).detail); // Guardamos el idioma al que queremos ir
      setIsVisible(false);   // Disparamos la animación de SALIDA primero
    };

    window.addEventListener("language-change-request", handleLanguageChange);
    return () => window.removeEventListener("language-change-request", handleLanguageChange);
  }, []);

  return (
    <main className="relative min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-[#050505]">
      <Suspense fallback={null}>
                {effectsReady && <ParticlesBackground />}
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
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Home />
              <BuildLayers />
              <Suspense fallback={null}>
                <Projects />
              </Suspense>
              <DeferredSection id="certificados"><Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                <Highlights />
              </Suspense></DeferredSection>
              <DeferredSection id="stack"><Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                <TechStack />
              </Suspense></DeferredSection>
              <DeferredSection id="contacto"><Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                <Contact />
              </Suspense></DeferredSection>
              <DeferredSection><Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                <Footer />
              </Suspense></DeferredSection>
            </motion.div>
          )}
        </AnimatePresence>

        <ScrollToTop />
      </div>
    </main>
  );
}

export default App;
