import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  es: {
    translation: {
      nav: {
        home: "Inicio",
        projects: "Proyectos",
        certificates: "Certificados",
        skills: "Herramientas",
        contact: "Contáctame"
      },
      hero: {
        name_last: "LIEVANO",
        role: "DESARROLLADOR WEB JUNIOR",
        description: "Especializado en transformar ideas complejas en productos digitales funcionales, optimizados para <bold>rendimiento, escalabilidad y diseño responsive</bold>.",
        cta_projects: "Ver Proyectos",
        cta_cv: "Descargar CV"
      },
      projects: {
        section_title: "Proyectos",
        section_subtitle: "Proyectos creados con enfoque funcional, visual y escalable.",
        code: "Código",
        demo: "Demo Live",
        aurea: {
          category: "Plataforma Corporativa",
          title: "Áurea Web",
          desc: "Desarrollo integral del sitio web de la agencia. Enfoque en identidad de marca y velocidad de carga crítica."
        },
        template: {
          category: "Infraestructura E-commerce",
          title: "Template AureaShop",
          desc: "Plantilla base modular para tiendas online. Arquitectura diseñada para escalabilidad y fácil mantenimiento."
        }
      },
      stack: {
        overline: "Arsenal Tecnológico",
        title: "Herramientas & Frameworks"
      },
      certifications: {
        overline: "Certificaciones",
        title: "Formación & Aprendizaje",
        view_more: "Ver más",
        view_less: "Ver menos",
        items: {
          html: "Fundamentos sólidos de estructura semántica y estándares web modernos.",
          python: "Introducción a la programación con Python y trabajo básico con datos.",
          js: "Dominio del lenguaje, ES6+, asincronía y manipulación del DOM.",
          cyber: "Principios de seguridad informática y protección de activos digitales.",
          scrum: "Metodologías ágiles para gestión de proyectos y trabajo en equipo.",
          english: "Capacidad técnica para lectura de documentación y comunicación global."
        }
      },
      contact: {
        title: "CONTACTO",
        // --- NUEVO SUBTÍTULO ---
        subtitle: "¿Te gustaría hablar conmigo, o te gustaría tener tu propia página web? No dudes en contactarme.",
        whatsapp_label: "WhatsApp",
        email_label: "Correo",
        send_msg: "Enviar mensaje",
        // --- NUEVAS CLAVES ---
        connect: "Conectemos",
        check_repo: "Ver perfil"
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        projects: "Projects",
        certificates: "Certificates",
        skills: "Skills",
        contact: "Contact Me"
      },
      hero: {
        name_last: "LIEVANO",
        role: "JUNIOR WEB DEVELOPER",
        description: "Specialized in transforming complex ideas into functional digital products, optimized for <bold>performance, scalability, and responsive design</bold>.",
        cta_projects: "View Projects",
        cta_cv: "Download CV"
      },
      projects: {
        section_title: "Projects",
        section_subtitle: "Projects built with a functional, visual, and scalable approach.",
        code: "Code",
        demo: "Live Demo",
        aurea: {
          category: "Corporate Platform",
          title: "Áurea Web",
          desc: "Comprehensive development of the agency website. Focus on brand identity and critical load speed."
        },
        template: {
          category: "E-commerce Infrastructure",
          title: "AureaShop Template",
          desc: "Modular base template for online stores. Architecture designed for scalability and easy maintenance."
        }
      },
      stack: {
        overline: "Tech Arsenal",
        title: "Tools & Frameworks"
      },
      certifications: {
        overline: "Certifications",
        title: "Education & Learning",
        view_more: "View more",
        view_less: "View less",
        items: {
          html: "Solid fundamentals of semantic structure and modern web standards.",
          python: "Introduction to programming with Python and basic data handling.",
          js: "Language mastery, ES6+, asynchrony, and DOM manipulation.",
          cyber: "Principles of computer security and digital asset protection.",
          scrum: "Agile methodologies for project management and teamwork.",
          english: "Technical ability for documentation reading and global communication."
        }
      },
      contact: {
        title: "CONTACT",
        // --- TRADUCCIÓN INGLÉS ---
        subtitle: "Would you like to talk to me, or are you looking for your own website? Don't hesitate to reach out.",
        whatsapp_label: "WhatsApp",
        email_label: "Email",
        send_msg: "Send Message",
        connect: "Let's Connect",
        check_repo: "View Profile"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "es", 
    fallbackLng: "es",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;