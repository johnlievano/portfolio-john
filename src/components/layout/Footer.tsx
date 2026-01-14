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
        {/* LOGO PERSONALIZADO (Copia del Navbar con animación Ki) */}
        <div className="flex-shrink-0">
          <a
            href="#inicio"
            className="group relative flex items-center text-xl font-black tracking-tighter uppercase transition-colors"
          >
            {/* Letra J */}
            <span className="text-slate-900 dark:text-white transition-colors z-10">
              J
            </span>

            {/* CONTENEDOR DE LA ESFERA Y EL KI */}
            <div className="relative mx-0.5">
              {/* --- EL AURA DE KI (ONDA DE ENERGÍA) --- 
                  - absolute inset-0: Se coloca justo detrás de la imagen.
                  - scale-0 opacity-0: Invisible por defecto.
                  - group-hover: Se expande (scale-150) y aparece.
                  - blur-md: Se difumina para parecer energía/gas.
                  - animate-pulse: Palpita como energía viva.
              */}
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

            {/* Resto del nombre */}
            <span className="text-slate-900 dark:text-white transition-colors z-10">
              hnDev<span className="text-[#FCD34D]">.</span>
            </span>
          </a>
        </div>

        {/* COPYRIGHT & NOMBRE */}
        <div className="text-center">
          <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
            © {currentYear}{" "}
            <span className="text-slate-900 dark:text-white">
              John Esteban Liévano
            </span>
            .{t("footer.rights", " Todos los derechos reservados.")}
          </p>

          {/* Atribución pequeña solo por el icono */}
          <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-2 opacity-70">
            Dragon Ball icon by ©Toei Animation
          </p>
        </div>
      </div>
    </footer>
  );
};
