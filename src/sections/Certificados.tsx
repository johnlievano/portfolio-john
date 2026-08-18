import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";

interface Certification {
  title: string;
  year: string;
  desc: string;
  images: string[];
  iconType: "python" | "js" | "html" | "cyber" | "scrum" | "english";
}

interface ImageCarouselProps {
  images: string[];
  title: string;
}

const ImageCarousel = ({ images, title }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-64 md:h-80 bg-slate-100 dark:bg-black/40 rounded-2xl overflow-hidden group/slider border border-slate-200 dark:border-slate-800">
      <div className="w-full h-full flex items-center justify-center transition-opacity duration-500">
        <img
          src={`/${images[currentIndex]}`}
          alt={`${title} - imagen ${currentIndex + 1}`}
          className="w-full h-full object-contain p-2 animate-in fade-in duration-300"
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="absolute top-1/2 left-2 -translate-y-1/2 p-2 rounded-full bg-slate-800/50 hover:bg-slate-800/80 text-white backdrop-blur-sm transition-all opacity-0 group-hover/slider:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="absolute top-1/2 right-2 -translate-y-1/2 p-2 rounded-full bg-slate-800/50 hover:bg-slate-800/80 text-white backdrop-blur-sm transition-all opacity-0 group-hover/slider:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((_, idx) => (
              <div key={idx} className={`transition-all duration-300 rounded-full ${idx === currentIndex ? "bg-slate-600 dark:bg-slate-400 w-6 h-2" : "bg-slate-400/50 dark:bg-slate-600/50 w-2 h-2"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Íconos SVG para cada certificado
const getCertIcon = (type: string) => {
  switch (type) {
    case "python":
      return <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6"/><path d="M10 12h.01"/><path d="M14 12h.01"/><path d="M10 16h4"/></svg>;
    case "js":
      return <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
    case "html":
      return <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    case "cyber":
      return <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    case "scrum":
      return <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case "english":
      return <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M12 2v20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    default:
      return <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>;
  }
};

export const Highlights = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  useEffect(() => {
  if (selectedCert) {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  } else {
    document.body.style.overflow = 'unset';
    document.body.classList.remove('modal-open');
  }
  return () => {
    document.body.style.overflow = 'unset';
    document.body.classList.remove('modal-open');
  };
}, [selectedCert]);
  const { t } = useTranslation();

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const certifications: Certification[] = [
    {
      title: "Fundamentals Python",
      year: "2025",
      desc: t("certifications.items.python"),
      images: ["certificados/Python_Essentials_1_certificate_john_lievano.jpg", "certificados/Python_Essentials_2_certificate_john_lievano.jpg"],
      iconType: "python",
    },
    {
      title: "JavaScript Essentials",
      year: "2025",
      desc: t("certifications.items.js"),
      images: ["certificados/JavaScript_Essentials_certificate_john_lievano.jpg"],
      iconType: "js",
    },
    {
      title: "HTML Essentials",
      year: "2025",
      desc: t("certifications.items.html"),
      images: ["certificados/HTML_Essentials_certificate_john_llievano.jpg"],
      iconType: "html",
    },
    {
      title: "Cybersecurity (CAPC)",
      year: "2024",
      desc: t("certifications.items.cyber"),
      images: ["certificados/Cybersecurity_Awareness_john_lievano.jpg"],
      iconType: "cyber",
    },
    {
      title: "Scrum Foundation (SFPC)",
      year: "2024",
      desc: t("certifications.items.scrum"),
      images: ["certificados/Certificate_Scrum_Foundation_john_lievano.jpg"],
      iconType: "scrum",
    },
    {
      title: "UOnline Inglés",
      year: "2022",
      desc: t("certifications.items.english"),
      images: ["certificados/UOnline English Certificate.jpg"],
      iconType: "english",
    },
  ];

  const initialLimit = isMobile ? 3 : 4;
  const visibleCertifications = showAll ? certifications : certifications.slice(0, initialLimit);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedCert(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleToggle = () => {
    if (!showAll) {
      setShowAll(true);
      setTimeout(() => window.scrollBy({ top: 150, behavior: "smooth" }), 100);
    } else {
      window.scrollBy({ top: -450, behavior: "smooth" });
      setTimeout(() => setShowAll(false), 300);
    }
  };

  return (
    <>
      <style>{`
        @keyframes bounce-walk {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-4px) rotate(-10deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-4px) rotate(10deg); }
        }
        .animate-walk {
          animation: bounce-walk 0.8s infinite ease-in-out;
        }
      `}</style>

      <section 
        id="certificados" 
        ref={sectionRef} 
        className="relative py-32 transition-colors duration-300 bg-gradient-to-b from-slate-100 to-slate-200 dark:bg-gradient-to-b dark:from-[#050505] dark:to-[#0B1120]"
      >
        <div className="max-w-7xl px-6 mx-auto relative z-10">
          <div className="mb-20 text-center">
            <h3 className="mb-3 text-sm font-bold tracking-[0.4em] uppercase text-slate-600 dark:text-slate-400">
              {t("certifications.overline")}
            </h3>
            <h2 className="text-4xl font-black tracking-tighter md:text-5xl text-slate-900 dark:text-white">
              {t("certifications.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleCertifications.map((cert) => (
              <div
                key={cert.title}
                onClick={() => setSelectedCert(cert)}
                className="group flex flex-col sm:flex-row items-center gap-6 p-5 rounded-3xl cursor-pointer transition-all duration-300
                           bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 hover:-translate-y-1
                           dark:bg-[#131B2F] dark:border-slate-800 dark:hover:border-slate-600"
              >
                <div className="relative w-full sm:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 dark:bg-black/40 flex-shrink-0">
                  <img 
                    src={`/${cert.images[0]}`} 
                    alt={cert.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-30 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="group-hover:animate-walk text-slate-700 dark:text-slate-300">
                      {getCertIcon(cert.iconType)}
                      <div className="flex justify-center gap-2 mt-1">
                        <div className="w-1.5 h-1.5 bg-slate-700 dark:bg-slate-300 rounded-full" />
                        <div className="w-1.5 h-1.5 bg-slate-700 dark:bg-slate-300 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-2/3 flex flex-col justify-center text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 text-xs font-mono font-bold rounded bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      LVL {cert.year}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100 group-hover:text-slate-600 dark:group-hover:text-white transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {cert.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {certifications.length > initialLimit && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={handleToggle}
                className="group flex items-center gap-2 px-8 py-3 text-sm font-bold tracking-wider uppercase transition-all duration-300 rounded-full 
                           bg-slate-800 text-white hover:bg-slate-700 shadow-sm
                           dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
              >
                {showAll ? t("certifications.view_less") : t("certifications.view_more")}
              </button>
            </div>
          )}
        </div>

        {/* MODAL CENTRADO */}
        {selectedCert && (
          <div 
            className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedCert(null)}
          >
            <div 
              className="relative w-full max-w-2xl shadow-2xl rounded-2xl animate-in zoom-in-95 duration-200 bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 flex flex-col" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800/50 sticky top-0 bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-md z-10">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">LVL {selectedCert.year} COMPLETE</span>
                  <h3 className="text-xl font-black text-slate-800 dark:text-white pr-4">{selectedCert.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedCert(null)} 
                  className="p-2 flex-shrink-0 rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 12" /></svg>
                </button>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <ImageCarousel images={selectedCert.images} title={selectedCert.title} />
                <div className="mt-8 flex-grow">
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Información del Sistema</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedCert.desc}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className="absolute bottom-0 left-0 w-full h-32 pointer-events-none 
                     bg-gradient-to-t 
                     from-slate-100 via-slate-200/50 to-transparent 
                     dark:from-[#050505] dark:via-[#050505]/50 dark:to-transparent"
        />
      </section>
    </>
  );
};