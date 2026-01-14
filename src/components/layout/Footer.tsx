import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-12 transition-colors duration-300 
                 bg-white border-t border-slate-200 
                 /* CAMBIO DE FONDO: De negro puro a un azul noche profundo (#0B1121) */
                 dark:bg-[#0B1121] dark:border-white/5"
    >
      <div className="max-w-6xl px-6 mx-auto flex flex-col items-center gap-4">
        
        {/* LOGO PERSONALIZADO: Sin enlace y con animación */}
        <div className="flex-shrink-0 cursor-default">
          <div className="group relative flex items-center text-xl font-black tracking-tighter uppercase transition-colors">
            
            {/* Letra J */}
            <span className="text-slate-900 dark:text-white transition-colors z-10">
              J
            </span>

            {/* CONTENEDOR DE LA ESFERA Y EL KI */}
            <div className="relative mx-0.5 flex items-center justify-center">
              {/* EL AURA DE KI */}
              <div
                className="absolute inset-0 rounded-full blur-md opacity-0 transition-all duration-500 ease-out
                           group-hover:opacity-100 group-hover:scale-150 group-hover:animate-pulse
                           bg-orange-500 dark:bg-[#FCD34D]"
              />

              {/* LA ESFERA DEL DRAGÓN */}
              <img
                src="/logo.png"
                alt="Esfera del Dragón"
                className="relative z-10 h-6 w-auto object-contain transition-transform duration-300"
              />
            </div>

            {/* TEXTO UNIDO */}
            <span className="text-slate-900 dark:text-white transition-colors z-10">
              hnDev<span className="text-[#FCD34D]">.</span>
            </span>
          </div>
        </div>

        {/* COPYRIGHT & NOMBRE */}
        <div className="text-center">
          <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
            © {currentYear}{" "}
            <span className="text-slate-900 dark:text-white">
              John Esteban Liévano
            </span>
            . {t("footer.rights")}
          </p>

          {/* Atribución Traducible */}
          <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-2 opacity-70">
            {t("footer.attribution")}
          </p>
        </div>
      </div>
    </footer>
  );
};