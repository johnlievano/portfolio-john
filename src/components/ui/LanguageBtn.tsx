import { useTranslation } from "react-i18next";
import { Translate } from "@phosphor-icons/react";

export const LanguageBtn = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "es" ? "en" : "es";

    // Enviamos el evento con el idioma deseado en 'detail'
    // No cambiamos el idioma aquí, dejamos que App.tsx lo haga tras la animación
    window.dispatchEvent(new CustomEvent("language-change-request", { detail: newLang }));
  };

  return (
    <button
      onClick={toggleLanguage}
      className="relative flex items-center justify-center w-10 h-10 overflow-hidden transition-all duration-300 border rounded-full group 
                 bg-white border-slate-300 text-slate-700 
                 dark:bg-white/10 dark:border-white/10 dark:text-white 
                 hover:border-amber-400 dark:hover:border-[#FCD34D]"
      aria-label="Cambiar idioma"
    >
      <Translate 
        size={24} 
        className="absolute opacity-10 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" 
      />

      <div className="relative z-10 w-full h-full">
        {/* Tus spans con la lógica visual se mantienen igual, 
            ya que reaccionarán cuando App.tsx finalmente cambie el i18n.language */}
        <span
          className={`absolute inset-0 flex items-center justify-center text-xs font-bold transition-all duration-500 ease-in-out
            ${i18n.language === "es" 
              ? "opacity-100 translate-y-0 rotate-0" 
              : "opacity-0 -translate-y-4 -rotate-12 pointer-events-none"}`}
        >
          ES
        </span>

        <span
          className={`absolute inset-0 flex items-center justify-center text-xs font-bold transition-all duration-500 ease-in-out
            ${i18n.language === "en" 
              ? "opacity-100 translate-y-0 rotate-0" 
              : "opacity-0 translate-y-4 rotate-12 pointer-events-none"}`}
        >
          EN
        </span>
      </div>
    </button>
  );
};