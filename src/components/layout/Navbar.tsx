import { useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next"; // IMPORTANTE
import ThemeToggle from "../ui/ThemeToggle";
import { LanguageBtn } from "../ui/LanguageBtn";

export const Navbar = () => {
  const { t } = useTranslation(); // HOOK
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
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">

        {/* IZQUIERDA: Logo */}
        <div className="flex-shrink-0">
          <a
            href="#inicio"
            className="text-xl font-black tracking-tighter uppercase transition-colors text-slate-900 dark:text-white"
          >
            JohnDev<span className="text-[#FCD34D]">.</span>
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

          {/* Idioma + Tema */}
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
            className="transition-colors text-slate-900 dark:text-white"
          >
            {isOpen ? <X size={28} /> : <List size={28} />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#050505]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-6 py-6 flex flex-col gap-6 shadow-xl">
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

          <a
            href="#contacto"
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-3 mt-2 font-bold text-center text-black rounded-sm bg-[#FCD34D]"
          >
            {t("nav.contact")}
          </a>
        </div>
      )}
    </nav>
  );
};