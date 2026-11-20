import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ProjectCassette } from "../components/effects/ProjectCassette";
import { ArcadeToggleButton } from "../components/effects/ArcadeButton";
import { motion } from "framer-motion"; // <-- 1. Agregado framer-motion

export const Projects = () => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: "alirio",
      title: t("projects.alirio.title", "Energías Renovables Polo a Tierra"),
      category: t("projects.alirio.category", "Landing Page Corporativa"),
      desc: t(
        "projects.alirio.desc",
        "Frontend moderno para la presentación de servicios y proyectos de la empresa Energías Renovables Polo a Tierra.",
      ),
      stack: ["React", "Tailwind CSS", "Vite", "Responsive Design"],
      link: "https://energias-renovables-polo-a-tierra-m.vercel.app/",
      github:
        "https://github.com/aureawebinfo/energias-renovables-polo-a-tierra",
      imageLight: "/projects/energias_polo_a_tierra.webp",
      imageDark: "/projects/energias_polo_a_tierra.webp",
    },
    {
      id: "aurea",
      title: t("projects.aurea.title"),
      category: t("projects.aurea.category"),
      desc: t("projects.aurea.desc"),
      stack: ["React", "TypeScript", "Vite", "Frontend Moderno"],
      link: "https://aurea-web.com/Index",
      github: "https://github.com/aureawebinfo/aurea-web",
      imageLight: "/projects/aurea-banner-black.webp",
      imageDark: "/projects/aurea-banner-black.webp",
    },
    {
      id: "erp",
      title: t("projects.erp.title", "Plataforma ERP Empresarial"),
      category: t("projects.erp.category", "Sistema de Gestión Empresarial"),
      desc: t(
        "projects.erp.desc",
        "Solución ERP centralizada para la gestión de empresas, usuarios y beneficios para empleados. Incluye administración de roles, módulos de recursos humanos y panel de control administrativo.",
      ),
      stack: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "Dashboard",
        "Role Management",
      ],
      link: "https://proposal-template-one.vercel.app/",
      github: "https://github.com/aureawebinfo/ccb-template",
      imageLight: "/projects/ERP_Template.webp",
      imageDark: "/projects/ERP_Template.webp",
    },
    {
      id: "template",
      title: t("projects.template.title"),
      category: t("projects.template.category"),
      desc: t("projects.template.desc"),
      stack: [
        "Next.js",
        "UX/UI",
        "Context API",
        "Rutas Dinámicas",
        "Arquitectura Frontend",
      ],
      link: "https://template-aurea-shop.vercel.app/",
      github: "https://github.com/johnlievano/Template_AureaShop",
      imageLight: "/projects/aurea-template-white.webp",
      imageDark: "/projects/aurea-template-black.webp",
    },
    {
      id: "flights",
      title: t("projects.flights.title", "Áurea Airlines"),
      category: t("projects.flights.category", "Plataforma Full-Stack"),
      desc: t(
        "projects.flights.desc",
        "Sistema de gestión de reservas aéreas con selección visual de asientos, estado de vuelos en tiempo real y autenticación segura.",
      ),
      stack: [
        "Node.js",
        "Express",
        "Prisma",
        "PostgreSQL",
        "React",
        "Tailwind CSS",
      ],
      link: "https://flight-booking-platform-eight.vercel.app/",
      github: "https://github.com/johnlievano/flight-booking-platform",
      imageLight: "/projects/flight-booking-platform.webp",
      imageDark: "/projects/flight-booking-platform.webp",
    },
    {
      id: "crud",
      title: t("projects.crud.title", "Sistema de Seguimiento de Proyectos"),
      category: t("projects.crud.category", "Arquitectura Desacoplada"),
      desc: t(
        "projects.crud.desc",
        "Sistema integral para gestión de proyectos usando Google Apps Script como API backend y Google Sheets como base de datos relacional con control de roles.",
      ),
      stack: [
        "HTML5",
        "Vanilla JS",
        "Tailwind CSS",
        "Google Apps Script",
        "Google Sheets",
      ],
      link: "https://prueba-tecnica-lilac.vercel.app/",
      github: "https://github.com/johnlievano/Prueba-Tecnica",
      imageLight: "/projects/crud.webp",
      imageDark: "/projects/crud.webp",
    },
  ];

  const initialLimit = 4;
  const visibleProjects =
    showAll || isExiting ? projects : projects.slice(0, initialLimit);

  const handleToggle = () => {
    if (!showAll) {
      setShowAll(true);
      setTimeout(() => {
        window.scrollBy({ top: 150, behavior: "smooth" });
      }, 100);
    } else {
      setIsExiting(true);
      window.scrollBy({ top: -450, behavior: "smooth" });
      setTimeout(() => {
        setShowAll(false);
        setIsExiting(false);
      }, 300);
    }
  };

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="relative z-10 py-20 transition-colors duration-300 mt-20 md:mt-0 rounded-t-[3rem] md:rounded-none bg-gradient-to-b from-slate-100 to-slate-300 dark:bg-gradient-to-b dark:from-[#050505] dark:to-[#0B1120]"
    >
      <div className="max-w-6xl px-6 mx-auto">
        <h2 className="section-title-arcade mb-3 text-slate-900 dark:text-white transition-colors">
          {t("projects.section_title", "Proyectos")}
        </h2>

        {/* 2. Subtítulo actualizado con el mismo estilo y animación del Hero */}
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 font-mono text-sm font-bold tracking-[0.2em] uppercase transition-colors text-slate-600 dark:text-slate-400"
        >
          {t(
            "projects.section_subtitle",
            "Creados con enfoque funcional, visual y escalable.",
          )}
        </motion.p>

        <div className="grid gap-6 sm:grid-cols-2">
          {visibleProjects.map((p, index) => {
            const isExtraProject = index >= initialLimit;
            return (
              <ProjectCassette
                key={p.id}
                project={p}
                index={index}
                hidden={isExtraProject && !showAll && !isExiting}
                fading={isExtraProject && isExiting}
              />
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <ArcadeToggleButton
            showAll={showAll}
            onClick={handleToggle}
            labelMore={t("projects.show_more", "VER MÁS PROYECTOS")}
            labelLess={t("projects.show_less", "VER MENOS")}
          />
        </div>
      </div>
    </section>
  );
};
