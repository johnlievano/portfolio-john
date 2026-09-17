import { WhatsappLogo, EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import "../components/effects/ProjectCassette.css"; // reutiliza .section-title-arcade
import "../components/effects/ContactCard.css";

export const Contact = () => {
  const { t } = useTranslation();

  const social = [
    {
      icon: <WhatsappLogo size={32} weight="bold" />,
      label: t('contact.whatsapp_label', 'WHATSAPP'),
      link: "https://wa.me/573044702082?text=Hola%20John%20Esteban,%20vi%20tu%20portafolio%20y%20me%20gustaría%20trabajar%20contigo.",
      val: "304 470 2082",
    },
    {
      icon: <EnvelopeSimple size={32} weight="bold" />,
      label: t('contact.email_label', 'EMAIL'),
      link: "mailto:johnestebanlievanomendez@gmail.com?subject=Contacto%20desde%20tu%20Portafolio&body=Hola%20John%20Esteban,%20vi%20tu%20portafolio%20y%20me%20interesa%20trabajar%20contigo.",
      val: t('contact.send_msg', 'Enviar mensaje'),
    },
    {
      icon: <LinkedinLogo size={32} weight="bold" />,
      label: "LINKEDIN",
      link: "https://www.linkedin.com/in/john-esteban-li%C3%A9vano-m%C3%A9ndez-b99532288/",
      val: t('contact.connect', 'Conectemos'),
    },
    {
      icon: <GithubLogo size={32} weight="bold" />,
      label: "GITHUB",
      link: "https://github.com/johnlievano",
      val: t('contact.check_repo', 'Ver perfil'),
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

        <h2 className="section-title-arcade mb-6 text-center text-slate-900 dark:text-white">
          {t('contact.title', 'CONTACTO')}
        </h2>

        <p className="text-center mb-14 text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t('contact.subtitle', '¿Te gustaría hablar conmigo o te gustaría tener tu propia página web? No dudes en contactarme.')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {social.map((s, i) => (
            <a
              key={i}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card group"
            >
              <div className="contact-icon-box">
                {s.icon}
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.25em] mt-4 mb-1 text-slate-500 dark:text-gray-400">
                {s.label}
              </p>

              <p className="font-bold text-lg text-slate-900 dark:text-white">
                {s.val}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};