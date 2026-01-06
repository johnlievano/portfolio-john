import { WhatsappLogo, EnvelopeSimple, GithubLogo } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const { t } = useTranslation();

  const social = [
    { 
      icon: <WhatsappLogo size={32} />, 
      label: t('contact.whatsapp_label'), 
      link: "https://wa.me/573044702082", 
      val: "304 470 2082" 
    },
    { 
      icon: <EnvelopeSimple size={32} />, 
      label: t('contact.email_label'), 
      link: "mailto:johnestebanlievanomendez@gmail.com", 
      val: t('contact.send_msg') 
    },
    { 
      icon: <GithubLogo size={32} />, // Icono cambiado
      label: "GITHUB", // Nombre directo (es igual en ambos idiomas)
      link: "https://github.com/johnlievano", 
      val: t('contact.check_repo') // Nueva clave para "Ver código" o "Ver perfil"
    },
  ];

  return (
    <section 
      id="contacto" 
      className="relative py-24 transition-colors duration-300 
                 bg-gradient-to-b from-slate-200 to-slate-300 
                 dark:bg-gradient-to-b dark:from-[#050505] dark:to-[#0f172a]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-black mb-12 text-center tracking-tighter transition-colors text-slate-900 dark:text-white">
          {t('contact.title')}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {social.map((s, i) => (
            <a 
              key={i} 
              href={s.link} 
              target="_blank" 
              className="group p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300
                         border border-slate-300 bg-white shadow-lg
                         dark:border-white/10 dark:bg-white/5 dark:shadow-none
                         
                         hover:-translate-y-2 hover:shadow-xl hover:border-amber-400/50
                         dark:hover:border-[#FCD34D]/50 dark:hover:bg-white/10"
            >
              {/* Icono */}
              <div className="mb-4 transition-transform group-hover:scale-110 text-amber-600 dark:text-[#FCD34D]">
                {s.icon}
              </div>
              
              {/* Label */}
              <p className="font-mono text-[10px] uppercase tracking-widest mb-2 transition-colors text-slate-500 dark:text-gray-400">
                {s.label}
              </p>
              
              {/* Valor */}
              <p className="font-bold transition-colors text-slate-900 dark:text-white">
                {s.val}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};