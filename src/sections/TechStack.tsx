import { useTranslation } from "react-i18next";
import StickerPeel from "../components/effects/StickerPeel";

type Skill = {
  name: string;
  icon: string;
  darkInvert?: boolean;
};

type SkillCategory = {
  id: string;
  title: string;
  skills: Skill[];
};

// Datos actualizados con tus tecnologías exactas
const getStackData = (t: (key: string) => string): SkillCategory[] => [
  {
    id: "frontend",
    title: t("stack.categories.frontend"),
    skills: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
        darkInvert: true,
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      },
      {
        name: "JavaScript (ES6+)",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      },
    ],
  },
  {
    id: "backend",
    title: t("stack.categories.backend"),
    skills: [
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "NestJS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
      },
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      },
    ],
  },
  {
    id: "database",
    title: t("stack.categories.database_cloud"),
    skills: [
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "Google BigQuery",
        icon: "https://www.vectorlogo.zone/logos/google_bigquery/google_bigquery-icon.svg",
      },
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      },
    ],
  },
  {
    id: "tools",
    title: t("stack.categories.tools"),
    skills: [
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      },
      {
        name: "GitHub",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
        darkInvert: true,
      },
      {
        name: "VS Code",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
      },
      {
        name: "Vite",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
      },
    ],
  },
];

const SkillCard = ({ s }: { s: Skill }) => (
  <div
  className="group relative flex flex-col items-center justify-center p-6 h-full w-full min-h-[160px] transition-all duration-200 
             border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rounded-none
             dark:bg-slate-900 dark:border-slate-700 dark:shadow-[4px_4px_0px_0px_rgba(30,41,59,1)]
             hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] hover:border-amber-400
             dark:hover:shadow-[8px_8px_0px_0px_rgba(253,211,77,1)] dark:hover:border-amber-300 z-10 hover:z-20"
>
    {/* Contenedor relativo estricto para anclar el sticker antes de que se mueva */}
    <div className="relative w-20 h-20 mb-4 flex items-center justify-center shrink-0">
      <StickerPeel
        imageSrc={s.icon}
        width={64}
        rotate={Math.floor(Math.random() * 30) - 15}
        peelBackHoverPct={35}
        peelBackActivePct={50}
        shadowIntensity={0.8}
        lightingIntensity={0.15}
        dragBounds="#stack"
        className={s.darkInvert ? "dark:invert" : ""}
      />
    </div>
    <span className="text-sm font-bold uppercase tracking-wider text-center text-slate-900 dark:text-white font-mono">
      {s.name}
    </span>
  </div>
);

export const TechStack = () => {
  const { t } = useTranslation();
  const STACK_DATA = getStackData(t);

  return (
    <section
      id="stack"
      className="relative py-24 transition-colors duration-300 bg-transparent"
    >
      <div className="max-w-6xl px-6 mx-auto">
        <div className="mb-16 text-center">
          <h3 className="text-sm font-bold tracking-[0.5em] uppercase font-mono transition-colors text-slate-500 dark:text-gray-400 mb-4">
            {t("stack.overline")}
          </h3>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase transition-colors text-slate-900 dark:text-white">
            {t("stack.title")}
          </h2>
        </div>

        <div className="flex flex-col gap-12">
          {STACK_DATA.map((category) => (
            <div key={category.id}>
              <h4 className="text-xs font-bold tracking-widest uppercase font-mono text-slate-400 dark:text-gray-500 mb-4">
                {category.title}
              </h4>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {category.skills.map((s) => (
                  <SkillCard key={s.name} s={s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
