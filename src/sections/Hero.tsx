import { motion } from "framer-motion";
import { 
  DownloadSimple, 
  GithubLogo, 
  LinkedinLogo, 
  Envelope, 
  WhatsappLogo 
} from "@phosphor-icons/react";
import { ParticlesBackground } from "../components/effects/ParticlesBackground";
import { useTranslation, Trans } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation();
  
  // Ruta de tu archivo PDF
  const cvFileUrl = "/CV John Esteban Lievano.pdf";

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(cvFileUrl, '_blank');
    const link = document.createElement('a');
    link.href = cvFileUrl;
    link.download = 'CV John Esteban Lievano.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- DATOS REALES CONFIGURADOS ---
  const socialLinks = [
    { 
      icon: <WhatsappLogo size={28} />, 
      label: "WhatsApp", 
      // "gustaría" -> "gustar%C3%ADa"
      href: "https://wa.me/573044702082?text=Hola%20John%20Esteban,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20trabajar%20contigo.", 
    },
    { 
      icon: <Envelope size={28} />, 
      label: "Email", 
      // "gustaría" -> "gustar%C3%ADa"
      href: "mailto:johnestebanlievanomendez@gmail.com?subject=Contacto%20desde%20tu%20Portafolio&body=Hola%20John%20Esteban,%20vi%20tu%20portafolio%20y%20me%20interesa%20trabajar%20contigo.", 
    },
    { 
      icon: <LinkedinLogo size={28} />, 
      label: "LinkedIn", 
      href: "https://www.linkedin.com/in/john-esteban-li%C3%A9vano-m%C3%A9ndez-b99532288/", 
    },
    { 
      icon: <GithubLogo size={28} />, 
      label: "GitHub", 
      href: "https://github.com/johnlievano", 
    },
  ];
  
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

          {/* CONTENEDOR DE ACCIONES (Botones + Redes) */}
          <div className="flex flex-col gap-6">
            
            {/* 1. BOTONES PRINCIPALES */}
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-start">
              <a
                href="#proyectos"
                className="w-full md:w-auto px-8 py-3.5 font-bold text-center text-black transition-transform rounded-full bg-[#FCD34D] hover:scale-105 shadow-[0_0_20px_rgba(252,211,77,0.3)] hover:shadow-[0_0_30px_rgba(252,211,77,0.5)]"
              >
                {t('hero.cta_projects')}
              </a>

              <a
                href={cvFileUrl}
                onClick={handleDownload}
                className="w-full md:w-auto flex justify-center items-center gap-2 px-8 py-3.5 font-bold transition-all duration-300 border-2 rounded-full cursor-pointer
                          border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white hover:shadow-lg
                          dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                {t('hero.cta_cv')} <DownloadSimple size={20} weight="bold" />
              </a>
            </div>

            {/* 2. REDES SOCIALES (Iconos circulares HD) */}
            <div className="flex items-center justify-center gap-4 md:justify-start">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center w-12 h-12 transition-all duration-300 border-2 rounded-full
                             border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white
                             dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>

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