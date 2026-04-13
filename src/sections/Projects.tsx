import { useState, useEffect, useRef } from "react";
import { ArrowSquareOut, GithubLogo } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

export const Projects = () => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Estado para controlar la animación de salida
  const [isExiting, setIsExiting] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const projects = [
    {
      id: "alirio",
      title: t("projects.alirio.title", "Energías Renovables Polo a Tierra"),
      category: t("projects.alirio.category", "Landing Page Corporativa"),
      desc: t("projects.alirio.desc", "Frontend moderno para la presentación de servicios y proyectos de la empresa Energías Renovables Polo a Tierra."),
      stack: ["React", "Tailwind CSS", "Vite", "Responsive Design"],
      link: "https://www.energiaspoloatierra.com/",
      github: "https://github.com/aureawebinfo/energias-renovables-polo-a-tierra",
      imageLight: "/energias_polo_a_tierra.webp",
      imageDark: "/energias_polo_a_tierra.webp",
    },
    {
      id: "aurea",
      title: t("projects.aurea.title"),
      category: t("projects.aurea.category"),
      desc: t("projects.aurea.desc"),
      stack: ["React", "TypeScript", "Vite", "Frontend Moderno"],
      link: "https://aurea-web.com/Index",
      github: "https://github.com/aureawebinfo/aurea-web",
      imageLight: "/aurea-banner-black.webp",
      imageDark: "/aurea-banner-black.webp",
    },
    {
      id: "template",
      title: t("projects.template.title"),
      category: t("projects.template.category"),
      desc: t("projects.template.desc"),
      stack: ["Next.js", "UX/UI", "Context API", "Rutas Dinámicas", "Arquitectura Frontend"],
      link: "https://template-aurea-shop.vercel.app/",
      github: "https://github.com/johnlievano/Template_AureaShop",
      imageLight: "/aurea-template-white.webp",
      imageDark: "/aurea-template-black.webp",
    },
    {
      id: "flights",
      title: t("projects.flights.title", "Áurea Airlines"),
      category: t("projects.flights.category", "Plataforma Full-Stack"),
      desc: t("projects.flights.desc", "Sistema de gestión de reservas aéreas con selección visual de asientos, estado de vuelos en tiempo real y autenticación segura."),
      stack: ["Node.js", "Express", "Prisma", "PostgreSQL", "React", "Tailwind CSS"],
      link: "https://flight-booking-platform-eight.vercel.app/",
      github: "https://github.com/johnlievano/flight-booking-platform",
      imageLight: "/flight-booking-platform.webp",
      imageDark: "/flight-booking-platform.webp",
    },
    {
      id: "crud",
      title: t("projects.crud.title", "Sistema de Seguimiento de Proyectos"),
      category: t("projects.crud.category", "Arquitectura Desacoplada"),
      desc: t("projects.crud.desc", "Sistema integral para gestión de proyectos usando Google Apps Script como API backend y Google Sheets como base de datos relacional con control de roles."),
      stack: ["HTML5", "Vanilla JS", "Tailwind CSS", "Google Apps Script", "Google Sheets"],
      link: "https://prueba-tecnica-lilac.vercel.app/",
      github: "https://github.com/johnlievano/Prueba-Tecnica",
      imageLight: "/crud.webp",
      imageDark: "/crud.webp",
    },
  ];

  const initialLimit = isMobile ? 3 : 4;
  
  // Si estamos en proceso de salida, mantenemos todos visibles pero con opacidad 0
  const visibleProjects = (showAll || isExiting) ? projects : projects.slice(0, initialLimit);

  const handleToggle = () => {
    if (!showAll) {
      setShowAll(true);
      setTimeout(() => {
        window.scrollBy({ top: 150, behavior: 'smooth' });
      }, 100);
    } else {
      // 1. Iniciamos la animación de salida
      setIsExiting(true);
      // 2. Subimos un poco el scroll
      window.scrollBy({ top: -450, behavior: 'smooth' });
      
      // 3. Esperamos a que la transición de CSS termine (300ms)
      setTimeout(() => {
        setShowAll(false);
        setIsExiting(false);
      }, 300);
    }
  };

  return (
    <section id="proyectos" ref={sectionRef} className="relative z-10 py-20 transition-colors duration-300 mt-20 md:mt-0 rounded-t-[3rem] md:rounded-none bg-gradient-to-b from-slate-100 to-slate-300 dark:bg-gradient-to-b dark:from-[#050505] dark:to-[#0B1120]">
      <div className="max-w-6xl px-6 mx-auto">
        <h2 className="mb-2 text-4xl font-bold transition-colors text-slate-900 dark:text-white">
          {t("projects.section_title")}
        </h2>
        <p className="mb-12 transition-colors text-slate-600 dark:text-gray-400">
          {t("projects.section_subtitle")}
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {visibleProjects.map((p, index) => {
            // Lógica para aplicar la clase de desvanecimiento solo a los proyectos extra
            const isExtraProject = index >= initialLimit;
            
            return (
              <div
                key={p.id}
                className={`group flex flex-col border rounded-2xl overflow-hidden bg-white border-slate-300 shadow-xl shadow-slate-300/40 dark:bg-white/5 dark:border-white/10 dark:shadow-none hover:border-amber-400/50 dark:hover:border-[#FCD34D]/50
                transition-all duration-300 
                ${isExtraProject && isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
                ${isExtraProject && !showAll && !isExiting ? 'hidden' : 'flex'}`}
              >
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="relative w-full h-72 overflow-hidden bg-slate-200 dark:bg-slate-800 block">
                  <img src={p.imageLight} alt={p.title} className="block dark:hidden w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <img src={p.imageDark} alt={p.title} className="hidden dark:block w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                </a>

                <div className="flex flex-col flex-grow p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-[#FCD34D]">{p.category}</span>
                  <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="mt-4 mb-6 text-slate-600 dark:text-gray-400 flex-grow text-sm">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.stack.map((s) => (
                      <span key={s} className="px-3 py-1 text-xs font-medium border rounded bg-slate-100 text-slate-700 border-slate-200 dark:bg-black/30 dark:text-gray-300 dark:border-white/10">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-5 pt-4 border-t border-slate-200 dark:border-white/10 text-slate-700 dark:text-white mt-auto">
                    <a href={p.github} target="_blank"><GithubLogo size={24} /></a>
                    <a href={p.link} target="_blank"><ArrowSquareOut size={24} /></a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={handleToggle}
            className="px-8 py-3 font-semibold transition-all duration-300 rounded-full bg-slate-200 text-slate-800 hover:bg-amber-400 hover:text-slate-900 dark:bg-white/10 dark:text-white dark:hover:bg-[#FCD34D] dark:hover:text-black shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            {showAll ? t("projects.show_less", "Ver menos") : t("projects.show_more", "Ver más proyectos")}
          </button>
        </div>
      </div>
    </section>
  );
};