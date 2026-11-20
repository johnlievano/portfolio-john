import { motion } from "framer-motion";
import { useState, useEffect, Suspense, lazy } from "react";
import {
  DownloadSimple,
  GithubLogo,
  LinkedinLogo,
  Envelope,
  WhatsappLogo,
} from "@phosphor-icons/react";
import StrokeText from "../components/effects/StrokeText";
import { useTranslation } from "react-i18next";




const DragonBallsEffect = lazy(async () => {
  const module = await import("../components/effects/DragonBallsEffect");
  return { default: module.default };
});

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
    // 1. Reinicia el texto inmediatamente al cambiar el idioma
    setTypedText("");

    let intervalId: ReturnType<typeof setInterval>;
    let currentText = "";
    let index = 0;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (index < fullText.length) {
          currentText += fullText[index];
          setTypedText(currentText);
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, 25);
    }, 1800);

    // 2. Limpia de forma estricta TANTO el timeout COMO el interval activo
    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [fullText]);


  return (
    <p className="relative text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed font-mono">
      <span className="invisible" aria-hidden="true">{'> '}{normalText}<strong className="font-semibold">{boldText}</strong></span>
      <span className="absolute inset-0">
      <span className="text-amber-600 dark:text-[#FCD34D] mr-2 font-bold">
        {">"}
      </span>
      {typedText.slice(0, normalText.length)}
      {typedText.length > normalText.length && (
        <strong className="font-semibold text-slate-900 dark:text-white">
          {typedText.slice(normalText.length)}
        </strong>
      )}
      </span>
    </p>
  );
};

export const Home = () => {
  const { t, i18n } = useTranslation();
  const showText = true;

  const [showDecorativeEffects, setShowDecorativeEffects] = useState(false);


  useEffect(() => {
    const timer = window.setTimeout(() => setShowDecorativeEffects(true), 500);
    return () => window.clearTimeout(timer);
  }, []);

  const currentLang = i18n.language || "es";

  const cvFileUrl = currentLang.startsWith("en")
    ? "/CV John Esteban Liévano-en.pdf"
    : "/CV_John_Esteban_Lievano.pdf";


  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(cvFileUrl, "_blank", "noopener,noreferrer");
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
        {/* COLUMNA 1: TEXTO */}
        {showText && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-center md:text-left order-2 md:order-1"
          >
            {/* NOMBRE */}
            <h1 className="mb-6 font-black tracking-normal text-4xl sm:text-5xl md:text-6xl flex flex-col items-center md:items-start justify-start w-full">
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="w-fit h-[1.1em] text-slate-900 dark:text-white relative -ml-1.5 md:-ml-2"
              >
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
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
                className="w-fit h-[1.1em] text-slate-500 dark:text-slate-400 relative -ml-1.5 md:-ml-2"
              >
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
              </motion.span>
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
                    transition: { staggerChildren: 0.4, delayChildren: 0.5 },
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
                  className="w-full md:w-auto inline-flex items-center justify-center min-h-14 border-2 border-transparent px-8 py-3.5 leading-6 font-bold text-center text-black transition-transform rounded-sm bg-[#FCD34D] hover:scale-105 shadow-[0_0_20px_rgba(252,211,77,0.3)] hover:shadow-[0_0_30px_rgba(252,211,77,0.5)]"
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
        )}

        {/* COLUMNA 2: FOTO DE PERFIL */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="flex justify-center md:justify-end order-1 md:order-2 z-10"
        >
          <div className="relative w-64 h-64 md:w-[400px] md:h-[400px] shrink-0">
          {showDecorativeEffects ? (
            <Suspense fallback={<div className="w-full h-full rounded-3xl bg-white dark:bg-black/20" />}>
              <DragonBallsEffect textEndTime={0.2} />
            </Suspense>
          ) : (
            <div className="relative w-64 h-64 md:w-[400px] md:h-[400px] overflow-hidden border-4 shadow-2xl rounded-3xl border-white/80 dark:border-white/10 bg-white dark:bg-black/20 z-10">
              <img
                src="/perfil_white.webp"
                alt="John Esteban - Modo Claro"
                width={400}
                height={400}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="block dark:hidden w-full h-full object-cover"
              />
              <img
                src="/perfil_black.webp"
                alt="John Esteban - Modo Oscuro"
                width={400}
                height={400}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="hidden dark:block w-full h-full object-cover"
              />
            </div>
          )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
