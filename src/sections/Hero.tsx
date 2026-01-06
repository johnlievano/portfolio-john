import { motion } from "framer-motion";
import { DownloadSimple } from "@phosphor-icons/react";
import { ParticlesBackground } from "../components/effects/ParticlesBackground";
import { useTranslation, Trans } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation();
  
  // Ruta de tu archivo PDF
  const cvFileUrl = "/CV John Esteban Lievano.pdf";

  // Función mágica para hacer las dos cosas
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault(); // Evita el comportamiento por defecto del enlace

  // 1. Abrir el PDF en una nueva pestaña
  window.open(cvFileUrl, '_blank');

  // 2. Forzar la descarga
  const link = document.createElement('a');
  link.href = cvFileUrl;
  link.download = 'CV John Esteban Lievano.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
  
  return (
    <section
      id="inicio"
      className="relative flex items-center justify-center min-h-screen px-6 overflow-hidden bg-transparent pt-20 md:pt-0"
    >
      {/* Fondo de Partículas */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      <div className="
        relative z-10
        grid
        max-w-6xl
        w-full
        gap-6
        md:grid-cols-2
        items-center
      ">

        {/* COLUMNA 1: TEXTO */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left order-2 md:order-1"
        >
          {/* NOMBRE */}
          <h1 className="mb-6 font-black tracking-tighter leading-tight transition-colors text-slate-900 dark:text-white
                          text-4xl sm:text-5xl md:text-6xl">
            JOHN ESTEBAN <br />
            <span className="text-slate-500 dark:text-slate-400">
              {t('hero.name_last')}
            </span>
          </h1>

          {/* ROL */}
          <h2 className="mb-6 font-mono text-base font-bold tracking-[0.2em] uppercase transition-colors text-amber-600 dark:text-[#FCD34D] md:text-lg">
            {t('hero.role')}
          </h2>

          {/* DESCRIPCIÓN */}
          <p className="max-w-lg mx-auto md:mx-0 mb-8 text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed">
             <Trans 
                i18nKey="hero.description"
                components={{ 
                  bold: <strong className="font-semibold text-slate-900 dark:text-white" /> 
                }}
             />
          </p>

          {/* BOTONES */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-start">
            <a
              href="#proyectos"
              className="w-full md:w-auto px-8 py-3.5 font-bold text-center text-black transition-transform rounded-full bg-[#FCD34D] hover:scale-105 shadow-[0_0_20px_rgba(252,211,77,0.3)] hover:shadow-[0_0_30px_rgba(252,211,77,0.5)]"
            >
              {t('hero.cta_projects')}
            </a>

            {/* BOTÓN CV MODIFICADO */}
            <a
              href={cvFileUrl}
              onClick={handleDownload} // Aquí llamamos a la función
              className="w-full md:w-auto flex justify-center items-center gap-2 px-8 py-3.5 font-bold transition-all duration-300 border-2 rounded-full cursor-pointer
                         border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white hover:shadow-lg
                         dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              {t('hero.cta_cv')} <DownloadSimple size={20} weight="bold" />
            </a>
          </div>
        </motion.div>

        {/* COLUMNA 2: FOTO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center md:justify-end order-1 md:order-2"
        >
          <div className="relative w-64 h-64 md:w-[400px] md:h-[400px]">
            <div className="absolute inset-0 transform translate-x-4 translate-y-4
                            bg-gradient-to-tr from-amber-400 to-purple-500 
                            rounded-3xl blur-2xl opacity-30 dark:opacity-20" />
            <div className="relative w-full h-full overflow-hidden border-4 shadow-2xl rounded-3xl border-white/80 dark:border-white/10 bg-white dark:bg-black/20">
              <img
                src="/perfil_white.png"
                alt="John Esteban - Modo Claro"
                className="block dark:hidden w-full h-full object-cover"
              />
              <img
                src="/perfil_black.png"
                alt="John Esteban - Modo Oscuro"
                className="hidden dark:block w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};