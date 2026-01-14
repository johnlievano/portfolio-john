import './i18n';
import { useTranslation } from "react-i18next"; // 1. Hook para detectar el idioma
import { motion, AnimatePresence } from "framer-motion"; // 2. Para las animaciones
import { useState, useEffect } from "react";

import { Navbar } from "./components/layout/Navbar";
import { Home } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Highlights } from "./sections/Certificados";
import { TechStack } from "./sections/TechStack";
import { Contact } from "./sections/Contact";
import { ParticlesBackground } from "./components/effects/ParticlesBackground";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { Footer } from "./components/layout/Footer";

function App() {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(true); // Controla si se muestra el contenido
  const [nextLang, setNextLang] = useState<string | null>(null); // Guarda el idioma pendiente

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
      <ParticlesBackground />
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
              <Projects />
              <Highlights />
              <TechStack />
              <Contact />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>

        <ScrollToTop />
      </div>
    </main>
  );
}

export default App;