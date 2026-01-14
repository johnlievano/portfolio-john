import { ArrowSquareOut, GithubLogo } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

export const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      id: "aurea",
      title: t('projects.aurea.title'),
      category: t('projects.aurea.category'),
      desc: t('projects.aurea.desc'),
      stack: ["React", "TypeScript", "Vite", "Frontend Moderno"],
      link: "https://aurea-web.com/Index",
      github: "https://github.com/aureawebinfo/aurea-web",
      imageLight: "/aurea-banner-white.webp",
      imageDark: "/aurea-banner-black.webp",
    },
    {
      id: "template",
      title: t('projects.template.title'),
      category: t('projects.template.category'),
      desc: t('projects.template.desc'),
      stack: ["Next.js", "UX/UI", "Context API", "Rutas Dinámicas", "Arquitectura Frontend"],
      link: "https://template-aurea-shop.vercel.app/",
      github: "https://github.com/johnlievano/Template_AureaShop",
      imageLight: "/aurea-template-white.webp",
      imageDark: "/aurea-template-black.webp",
    },
  ];

  return (
    <section
      id="proyectos"
      className="relative z-10 py-20 transition-colors duration-300
                 mt-20 md:mt-0 
                 rounded-t-[3rem] md:rounded-none
                 bg-gradient-to-b from-slate-100 to-slate-300 
                 dark:bg-gradient-to-b dark:from-[#050505] dark:to-[#0B1120]"
    >
      <div className="max-w-6xl px-6 mx-auto">
        <h2 className="mb-2 text-4xl font-bold transition-colors text-slate-900 dark:text-white">
          {t('projects.section_title')}
        </h2>

        <p className="mb-12 transition-colors text-slate-600 dark:text-gray-400">
          {t('projects.section_subtitle')}
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <div
              key={p.id}
              className="group flex flex-col transition-all duration-300 border rounded-2xl overflow-hidden
                           bg-white border-slate-300 shadow-xl shadow-slate-300/40 
                           dark:bg-white/5 dark:border-white/10 dark:shadow-none 
                           hover:border-amber-400/50 dark:hover:border-[#FCD34D]/50"
            >
              {/* IMAGEN DEL PROYECTO */}
              <a 
                href={p.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative w-full h-72 overflow-hidden bg-slate-200 dark:bg-slate-800 block"
              >
                <img
                  src={p.imageLight}
                  alt={`Portada de ${p.title} - Light`}
                  loading="lazy"
                  className="block dark:hidden w-full h-full object-cover object-top 
                             transition-transform duration-700 group-hover:scale-105"
                />
                <img
                  src={p.imageDark}
                  alt={`Portada de ${p.title} - Dark`}
                  loading="lazy"
                  className="hidden dark:block w-full h-full object-cover object-top 
                             transition-transform duration-700 group-hover:scale-105"
                />
              </a>

              {/* CONTENIDO TEXTUAL */}
              <div className="flex flex-col flex-grow p-6">
                <span className="text-xs font-bold uppercase tracking-wider transition-colors text-amber-600 dark:text-[#FCD34D]">
                  {p.category}
                </span>

                <h3 className="mt-2 text-2xl font-bold transition-colors text-slate-900 dark:text-white">
                  {p.title}
                </h3>

                <p className="mt-4 mb-6 transition-colors text-slate-600 dark:text-gray-400 flex-grow">
                  {p.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 text-xs font-medium border rounded transition-colors
                                   bg-slate-100 text-slate-700 border-slate-200
                                   dark:bg-black/30 dark:text-gray-300 dark:border-white/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-5 pt-4 border-t border-slate-200 dark:border-white/10 text-slate-700 dark:text-white mt-auto">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-amber-600 dark:hover:text-[#FCD34D]"
                    title="GitHub"
                  >
                    <GithubLogo size={24} />
                  </a>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-amber-600 dark:hover:text-[#FCD34D]"
                    title="Live Demo"
                  >
                    <ArrowSquareOut size={24} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};