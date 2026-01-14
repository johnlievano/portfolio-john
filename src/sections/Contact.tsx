import { WhatsappLogo, EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const { t } = useTranslation();

  const social = [
    { 
      icon: <WhatsappLogo size={32} />, 
      label: t('contact.whatsapp_label', 'WHATSAPP'), 
      // Usamos 'link' para que coincida con s.link abajo
      link: "https://wa.me/573044702082?text=Hola%20John%20Esteban,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20contactarte.", 
      val: "304 470 2082" 
    },
    { 
      icon: <EnvelopeSimple size={32} />, 
      label: t('contact.email_label', 'EMAIL'), 
      link: "mailto:johnestebanlievanomendez@gmail.com?subject=Contacto%20desde%20tu%20Portafolio&body=Hola%20John%20Esteban,%20vi%20tu%20portafolio%20y%20me%20gustaria%20contactarte.", 
      val: t('contact.send_msg', 'Enviar mensaje') 
    },
    { 
      icon: <LinkedinLogo size={32} />, 
      label: "LINKEDIN", 
      link: "https://www.linkedin.com/in/john-esteban-li%C3%A9vano-m%C3%A9ndez-b99532288/", 
      val: t('contact.connect', 'Conectemos') 
    },
    { 
      icon: <GithubLogo size={32} />, 
      label: "GITHUB", 
      link: "https://github.com/johnlievano", 
      val: t('contact.check_repo', 'Ver perfil') 
    },
  ];

  return (
    <section 
      id="contacto" 
      className="relative py-24 transition-colors duration-300 
                 bg-gradient-to-b from-slate-200 to-slate-300 
                 dark:bg-gradient-to-b dark:from-[#050505] dark:to-[#0f172a]"
    >
      <div className="max-w-5xl mx-auto px-6">
        
        <h2 className="text-4xl font-black mb-4 text-center tracking-tighter transition-colors text-slate-900 dark:text-white">
          {t('contact.title', 'CONTACTO')}
        </h2>

        <p className="text-center mb-12 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t('contact.subtitle', '¿Te gustaría hablar conmigo o te gustaría tener tu propia página web? No dudes en contactarme.')}
        </p>
        
        {/* GRID 2x2 en pantallas medianas (md:grid-cols-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {social.map((s, i) => (
            <a 
              key={i} 
              href={s.link} // Antes decía s.link y en tu objeto decía href. Ahora ambos son link.
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300
                         border border-slate-300 bg-white shadow-lg
                         dark:border-white/10 dark:bg-white/5 dark:shadow-none
                         hover:-translate-y-2 hover:shadow-xl hover:border-amber-400/50
                         dark:hover:border-[#FCD34D]/50 dark:hover:bg-white/10"
            >
              <div className="mb-4 transition-transform group-hover:scale-110 text-amber-600 dark:text-[#FCD34D]">
                {s.icon}
              </div>
              
              <p className="font-mono text-[10px] uppercase tracking-widest mb-2 transition-colors text-slate-500 dark:text-gray-400">
                {s.label}
              </p>
              
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