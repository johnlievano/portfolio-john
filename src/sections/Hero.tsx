import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  DownloadSimple,
  GithubLogo,
  LinkedinLogo,
  Envelope,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { ParticlesBackground } from "../components/effects/ParticlesBackground";
import StrokeText from "../components/effects/StrokeText";
import { useTranslation } from "react-i18next";
import DragonBallsEffect from "../components/effects/DragonBallsEffect";

const TypewriterDescription = ({
  normalText,
  boldText,
}: {
  normalText: string;
  boldText: string;
}) => {
  const fullText = normalText + boldText;
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let currentText = "";
    let index = 0;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < fullText.length) {
          currentText += fullText[index];
          setTypedText(currentText);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 25);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timeout);
  }, [fullText]);

  return (
    <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed font-mono">
      <span className="text-amber-600 dark:text-[#FCD34D] mr-2 font-bold">
        {">"}
      </span>
      {typedText.slice(0, normalText.length)}
      {typedText.length > normalText.length && (
        <strong className="font-semibold text-slate-900 dark:text-white">
          {typedText.slice(normalText.length)}
        </strong>
      )}
    </p>
  );
};

export const Home = () => {
  const { t } = useTranslation();
  const [showText, setShowText] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkDevice = window.innerWidth < 1024;
    setIsMobileOrTablet(checkDevice);

    let timer: ReturnType<typeof setTimeout>;

    if (checkDevice) {
      // MÓVIL/TABLET:
      // Se mantiene oculto el texto por 2.8s para darle paso exclusivo
      // a la animación de la foto / esferas.
      timer = setTimeout(() => {
        setShowText(true);
      }, 2800);
    } else {
      // ESCRITORIO:
      // Muestra texto inmediatamente
      setShowText(true);
    }

    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      setIsMobileOrTablet(isMobile);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cvFileUrl = "/CV John Esteban Lievano.pdf";

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(cvFileUrl, "_blank");
    const link = document.createElement("a");
    link.href = cvFileUrl;
    link.download = "CV John Esteban Lievano.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const socialLinks = [
    {
      icon: <WhatsappLogo size={28} />,
      label: "WhatsApp",
      href: "https://wa.me/573044702082?text=Hola%20John%20Esteban,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20trabajar%20contigo.",
    },
    {
      icon: <Envelope size={28} />,
      label: "Email",
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
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      <div
        className="
        relative z-10
        grid
        max-w-6xl
        w-full
        gap-6
        md:grid-cols-2
        items-center
      "
      >
        {/* COLUMNA 1: TEXTO (Aparece únicamente tras terminar la foto en móvil) */}
        {showText ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left order-2 md:order-1"
          >
            {/* NOMBRE */}
            <h1 className="mb-6 font-black tracking-normal text-4xl sm:text-5xl md:text-6xl flex flex-col items-center md:items-start justify-start w-full">
              <span className="w-fit h-[1.1em] text-slate-900 dark:text-white relative -ml-1.5 md:-ml-2">
                <StrokeText
                  text="JOHN ESTEBAN"
                  strokeColor="currentColor"
                  fillColor="currentColor"
                  strokeWidth={1}
                  drawDuration={1.4}
                  fillDelay={0.15}
                  stagger={0.04}
                  ease="power2.out"
                  trigger="mount"
                  fillMode="wipe"
                  fontSize="inherit"
                  fontWeight="inherit"
                  fontFamily="inherit"
                  letterSpacing="inherit"
                />
              </span>

              <span className="w-fit h-[1.1em] text-slate-500 dark:text-slate-400 relative -ml-1.5 md:-ml-2">
                <StrokeText
                  text={t("hero.name_last", "LIEVANO")}
                  strokeColor="currentColor"
                  fillColor="currentColor"
                  strokeWidth={1}
                  drawDuration={1.4}
                  fillDelay={0.15}
                  stagger={0.04}
                  ease="power2.out"
                  trigger="mount"
                  fillMode="wipe"
                  fontSize="inherit"
                  fontWeight="inherit"
                  fontFamily="inherit"
                  letterSpacing="inherit"
                />
              </span>
            </h1>

            {/* ROL */}
            <div className="overflow-hidden mb-6 flex justify-center md:justify-start">
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="font-mono text-base font-bold tracking-[0.2em] uppercase transition-colors text-amber-600 dark:text-[#FCD34D] md:text-lg flex items-center gap-3 flex-wrap justify-center md:justify-start"
              >
                <span>{t("hero.role", "DESARROLLADOR WEB JUNIOR")}</span>
                <span className="text-slate-400 dark:text-slate-500 font-normal">
                  |
                </span>
                <span>{t("hero.experience", "+1 AÑO DE EXP")}</span>
              </motion.h2>
            </div>

            {/* DESCRIPCIÓN AISLADA */}
            <div className="max-w-lg mx-auto md:mx-0 mb-8 min-h-[80px]">
              <TypewriterDescription
                normalText={t("hero.description_normal")}
                boldText={t("hero.description_bold")}
              />
            </div>

            {/* ACCIONES */}
            <div className="flex flex-col gap-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2, delayChildren: 0.5 },
                  },
                }}
                className="flex flex-col items-center gap-4 md:flex-row md:justify-start"
              >
                <motion.a
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  href="#proyectos"
                  className="w-full md:w-auto px-8 py-3.5 font-bold text-center text-black transition-transform rounded-sm bg-[#FCD34D] hover:scale-105 shadow-[0_0_20px_rgba(252,211,77,0.3)] hover:shadow-[0_0_30px_rgba(252,211,77,0.5)]"
                >
                  {t("hero.cta_projects", "Ver Proyectos")}
                </motion.a>

                <motion.a
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  href={cvFileUrl}
                  onClick={handleDownload}
                  className="w-full md:w-auto flex justify-center items-center gap-2 px-8 py-3.5 font-bold transition-all duration-300 border-2 rounded-sm cursor-pointer
        border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white hover:shadow-lg
        dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  {t("hero.cta_cv", "Descargar CV")}{" "}
                  <DownloadSimple size={20} weight="bold" />
                </motion.a>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.8 },
                  },
                }}
                className="flex items-center justify-center gap-4 md:justify-start"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    variants={{
                      hidden: { opacity: 0, scale: 0 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: { type: "spring", stiffness: 200 },
                      },
                    }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center justify-center w-12 h-12 transition-all duration-300 border-2 rounded-full
                               border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white hover:-translate-y-1
                               dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <div className="order-2 md:order-1 min-h-[300px]"></div>
        )}

        {/* COLUMNA 2: FOTO DE PERFIL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center md:justify-end order-1 md:order-2 z-10"
        >
          {/*
            En móvil (isMobileOrTablet = true) le enviamos textEndTime={0.2}
            para que las esferas arranquen al instante mientras la foto entra.
            En escritorio le enviamos 5 para esperar a la escritura de texto.
          */}
          <DragonBallsEffect textEndTime={isMobileOrTablet ? 0.2 : 5} />
        </motion.div>
      </div>
    </section>
  );
};
