import { useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../ui/ThemeToggle";
import { LanguageBtn } from "../ui/LanguageBtn";

export const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { name: t("nav.home"), href: "#inicio" },
    { name: t("nav.projects"), href: "#proyectos" },
    { name: t("nav.certificates"), href: "#certificados" },
    { name: t("nav.skills"), href: "#stack" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
        ${
          scrolled || isOpen
            ? "backdrop-blur-md border-b bg-white/80 border-slate-200 dark:bg-[#050505]/80 dark:border-white/5"
            : "bg-transparent border-transparent"
        }`}
    >
      <div className="relative flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        
        {/* IZQUIERDA: Logo con Onda de Ki */}
        <div className="flex-shrink-0">
          <a
            href="#inicio"
            className="group relative flex items-center text-xl font-black tracking-tighter uppercase transition-colors"
          >
            <span className="text-slate-900 dark:text-white transition-colors z-10">J</span>
            
            {/* CONTENEDOR DE LA ESFERA Y EL KI */}
            <div className="relative mx-0.5 flex items-center justify-center">
              
              {/* ONDA DE KI (AURORA) */}
              <div className="absolute inset-0 rounded-full blur-md opacity-0 transition-all duration-500 ease-out
                              group-hover:opacity-100 group-hover:scale-150 group-hover:animate-pulse
                              bg-orange-500 dark:bg-[#FCD34D]" 
              />

              {/* LA ESFERA DEL DRAGÓN */}
              <img 
                src="/logo.png" 
                alt="Esfera del Dragón" 
                className="relative z-10 h-6 w-auto object-contain transition-all duration-300"
              />
            </div>
            
            <span className="text-slate-900 dark:text-white transition-colors z-10">
              hnDev<span className="text-[#FCD34D]">.</span>
            </span>
          </a>
        </div>

        {/* CENTRO: Enlaces (Desktop) */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-8 text-sm font-mono text-slate-600 dark:text-gray-400">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-medium transition-colors hover:text-[#FCD34D]"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* DERECHA: CTA + Preferencias (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contacto"
            className="px-4 py-2 font-bold text-black transition-transform rounded-sm bg-[#FCD34D] hover:scale-105"
          >
            {t("nav.contact")}
          </a>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-300 dark:border-white/10">
            <LanguageBtn />
            <ThemeToggle />
          </div>
        </div>

        {/* MÓVIL: Idioma + Tema + Menú */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageBtn />
          <ThemeToggle />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-7 h-7 flex items-center justify-center text-slate-900 dark:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <List
              size={28}
              className={`absolute transition-all duration-300 transform 
                ${isOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}
            />
            <X
              size={28}
              className={`absolute transition-all duration-300 transform 
                ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}
            />
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL ANIMADO */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-[#050505]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-6 py-6 flex flex-col gap-6 shadow-xl transition-all duration-300 ease-in-out transform origin-top
          ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-5 invisible pointer-events-none"}`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium transition-colors text-slate-700 dark:text-gray-300 hover:text-[#FCD34D]"
          >
            {link.name}
          </a>
        ))}

        <div className="w-full h-[1px] bg-slate-200 dark:bg-white/10" />

        <a
          href="#contacto"
          onClick={() => setIsOpen(false)}
          className="w-full px-4 py-3 mt-2 font-bold text-center text-black rounded-sm bg-[#FCD34D]"
        >
          {t("nav.contact")}
        </a>
      </div>
    </nav>
  );
};