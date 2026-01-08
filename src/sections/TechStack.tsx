import { useTranslation } from "react-i18next";

export const TechStack = () => {
  const { t } = useTranslation();

  const skills = [
    // Agregado TypeScript
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "JavaScript (ES6+)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    // Agregado Next.js
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    // Eliminado Django
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Git / GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  ];

  return (
    <section
      id="stack"
      className="relative py-24 transition-colors duration-300 bg-transparent"
    > 
      <div className="max-w-6xl px-6 mx-auto">
        
        <div className="mb-16 text-center">
          <h3 className="text-sm font-bold tracking-[0.5em] uppercase transition-colors text-slate-500 dark:text-gray-500 mb-4">
            {t('stack.overline')}
          </h3>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter transition-colors text-slate-900 dark:text-white">
            {t('stack.title')}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((s) => (
            <div
              key={s.name}
              className="group relative flex flex-col items-center justify-center p-6 transition-all duration-300 border rounded-xl cursor-default
                         bg-white border-slate-300 shadow-sm
                         dark:bg-white/5 dark:border-white/10 dark:shadow-none
                         hover:-translate-y-2 hover:shadow-lg hover:border-amber-400
                         dark:hover:bg-white/10 dark:hover:border-[#FCD34D]"
            >
              {/* Nota: El icono de Next.js original es negro. Si en modo oscuro (Dark Mode)
                  no se ve bien porque el fondo es oscuro, puedes agregar la clase "dark:invert" 
                  a la etiqueta <img> de abajo.
              */}
              <div className="relative w-12 h-12 mb-4 transition-all duration-300 filter grayscale group-hover:grayscale-0 group-hover:scale-110">
                <img 
                  src={s.icon} 
                  alt={s.name} 
                  className="object-contain w-full h-full"
                />
              </div>

              <span className="text-sm font-bold text-center transition-colors text-slate-600 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white">
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};