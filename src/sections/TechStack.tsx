import { useTranslation } from "react-i18next";

type Skill = {
  name: string;
  icon: string;
  darkInvert?: boolean;
  githubIcon?: boolean;
};

export const TechStack = () => {
  const { t } = useTranslation();

  const frontendSkills: Skill[] = [
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "JavaScript (ES6+)",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      darkInvert: true,
    },
  ];

  const backendSkills: Skill[] = [
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
  ];

  const databaseSkills: Skill[] = [
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
  ];

  const versionSkills: Skill[] = [
    {
      name: "Git / GitHub",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      githubIcon: true,
    },
  ];

  // Componente reutilizable para las tarjetas de skills
  const SkillCard = ({ s }: { s: Skill }) => (
    <div
      key={s.name}
      className="group relative flex flex-col items-center justify-center p-6 h-full w-full min-h-[140px] transition-all duration-300 border rounded-xl cursor-default
                 bg-white border-slate-300 shadow-sm
                 dark:bg-white/5 dark:border-white/10 dark:shadow-none
                 hover:-translate-y-2 hover:shadow-lg hover:border-amber-400
                 dark:hover:bg-white/10 dark:hover:border-[#FCD34D]"
    >
      <div className="relative w-12 h-12 mb-4 transition-all duration-300 group-hover:scale-110 shrink-0">
        <img
          src={s.icon}
          alt={s.name}
          className={`object-contain w-full h-full ${
            s.githubIcon || s.darkInvert ? "dark:invert" : ""
          }`}
        />
      </div>
      <span className="text-sm font-bold text-center transition-colors text-slate-900 dark:text-white">
        {s.name}
      </span>
    </div>
  );

  return (
    <section id="stack" className="relative py-24 transition-colors duration-300 bg-transparent">
      <div className="max-w-6xl px-6 mx-auto">
        <div className="mb-16 text-center">
          <h3 className="text-sm font-bold tracking-[0.5em] uppercase transition-colors text-slate-500 dark:text-gray-500 mb-4">
            {t("stack.overline")}
          </h3>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter transition-colors text-slate-900 dark:text-white">
            {t("stack.title")}
          </h2>
        </div>

        <div className="flex flex-col gap-12">
          {/* FRONTEND */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-gray-500 mb-4">
              {t("stack.categories.frontend")}
            </h4>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {frontendSkills.map((s) => <SkillCard key={s.name} s={s} />)}
            </div>
          </div>

          {/* BACKEND Y DATABASE */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="col-span-2">
              <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-gray-500 mb-4">
                {t("stack.categories.backend")}
              </h4>
              <div className="grid grid-cols-2 gap-6">
                {backendSkills.map((s) => <SkillCard key={s.name} s={s} />)}
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-gray-500 mb-4">
                {t("stack.categories.database")}
              </h4>
              <div className="grid grid-cols-1 gap-6">
                {databaseSkills.map((s) => <SkillCard key={s.name} s={s} />)}
              </div>
            </div>
          </div>

          {/* CONTROL DE VERSIONES */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-gray-500 mb-4">
              {t("stack.categories.version_control")}
            </h4>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {versionSkills.map((s) => <SkillCard key={s.name} s={s} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};