import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// ✅ Interfaz
interface Certification {
  title: string;
  year: string;
  desc: string;
  images: string[];
}

// ✅ Props Carousel
interface ImageCarouselProps {
  images: string[];
  title: string;
}

const ImageCarousel = ({ images, title }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide]);

  return (
    // Se mantiene tu estructura, se adaptará al nuevo ancho del padre (max-w-2xl)
    <div className="relative w-full h-64 md:h-80 bg-slate-100 dark:bg-black/40 rounded-lg overflow-hidden group/slider">
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
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute top-1/2 left-2 -translate-y-1/2 p-2 rounded-full 
                       bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm
                       transition-all opacity-0 group-hover/slider:opacity-100"
            aria-label="Imagen anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute top-1/2 right-2 -translate-y-1/2 p-2 rounded-full 
                       bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm
                       transition-all opacity-0 group-hover/slider:opacity-100"
            aria-label="Siguiente imagen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((_, idx: number) => (
              <div
                key={idx}
                className={`transition-all duration-300 rounded-full shadow-sm
                  ${idx === currentIndex 
                    ? 'bg-amber-500 w-6 h-2' 
                    : 'bg-slate-300/50 dark:bg-white/30 w-2 h-2'
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const Highlights = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const { t } = useTranslation();

  const certifications: Certification[] = [
    {
      title: "Fundamentals Python",
      year: "2025",
      desc: t('certifications.items.python'),
      images: [
        "Python_Essentials_1_certificate_john_lievano.jpg",
        "Python_Essentials_2_certificate_john_lievano.jpg"
      ]
    },
    {
      title: "JavaScript Essentials",
      year: "2025",
      desc: t('certifications.items.js'),
      images: ["JavaScript_Essentials_certificate_john_lievano.jpg"]
    },
    {
      title: "HTML Essentials",
      year: "2025",
      desc: t('certifications.items.html'),
      images: ["HTML_Essentials_certificate_john_llievano.jpg"]
    },
    {
      title: "Cybersecurity (CAPC)",
      year: "2024",
      desc: t('certifications.items.cyber'),
      images: ["Cybersecurity_Awareness_john_lievano.jpg"]
    },
    {
      title: "Scrum Foundation (SFPC)",
      year: "2024",
      desc: t('certifications.items.scrum'),
      images: ["Certificate_Scrum_Foundation_john_lievano.jpg"]
    },
    {
      title: "UOnline Inglés",
      year: "2022",
      desc: t('certifications.items.english'),
      images: ["UOnline English Certificate.jpg"]
    },
  ];

  const visibleCertifications = showAll
  ? certifications
  : certifications.slice(0, window.innerWidth < 768 ? 3 : 4);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section
      id="certificados"
      className="relative py-32 transition-colors duration-300 
                 bg-gradient-to-b from-slate-100 to-slate-200 
                 dark:bg-gradient-to-b dark:from-[#050505] dark:to-[#0B1120]"
    >
      <div className="max-w-6xl px-6 mx-auto relative z-10">

        <div className="mb-16 text-center">
          <h3 className="mb-4 text-sm font-bold tracking-[0.5em] uppercase transition-colors text-slate-500 dark:text-gray-500">
            {t('certifications.overline')}
          </h3>
          <h2 className="text-4xl font-black tracking-tighter transition-colors md:text-5xl text-slate-900 dark:text-white">
            {t('certifications.title')}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {visibleCertifications.map((cert) => (
            <div
              key={cert.title}
              onClick={() => setSelectedCert(cert)}
              className="group relative rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-pointer
                         border bg-white border-slate-300 shadow-xl shadow-slate-300/40
                         dark:bg-white/[0.03] dark:backdrop-blur-xl dark:border-white/10 dark:shadow-none
                         hover:-translate-y-1 hover:border-amber-400/50 
                         dark:hover:border-[#FCD34D]/40 dark:hover:bg-[#FCD34D]/[0.04]"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-mono transition-colors text-slate-400 dark:text-gray-500">
                  {cert.year}
                </span>
                
                <div className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-gray-500 group-hover:bg-amber-100 dark:group-hover:bg-[#FCD34D]/20 group-hover:text-amber-600 dark:group-hover:text-[#FCD34D] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  </svg>
                </div>
              </div>

              <h4 className="mb-3 text-xl font-bold transition-colors text-slate-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-[#FCD34D]">
                {cert.title}
              </h4>

              <p className="text-sm leading-relaxed transition-colors text-slate-600 dark:text-gray-400">
                {cert.desc}
              </p>
            </div>
          ))}
        </div>

        {certifications.length > 4 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 text-sm font-bold tracking-wider uppercase transition-all duration-300 border rounded-full 
                         text-slate-600 border-slate-300 hover:bg-slate-200 hover:text-slate-900
                         dark:text-gray-400 dark:border-white/10 dark:hover:bg-white/5 dark:hover:text-white
                         active:scale-95"
            >
              {showAll ? t('certifications.view_less') : t('certifications.view_more')}
            </button>
          </div>
        )}
      </div>

      {/* --- MODAL AJUSTADO (MÁS PEQUEÑO Y BAJADO) --- */}
      {selectedCert && (
        <div 
          // 1. AJUSTE: Cambiamos 'items-center' por 'items-start' + 'pt-24'
          // Esto baja la modal para que no toque el navbar
          className="fixed inset-0 z-[999] flex items-start justify-center pt-24 p-4
                     bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCert(null)} 
        >
          <div 
            // 2. AJUSTE: Cambiamos 'max-w-4xl' por 'max-w-2xl' (más pequeña)
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl rounded-2xl animate-in zoom-in-95 duration-200
                       bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} 
          >
            <div className="flex items-center justify-between p-4 px-6 border-b border-slate-100 dark:border-white/10 sticky top-0 bg-white dark:bg-[#111] z-10">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {selectedCert.title}
              </h3>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-full transition-colors text-slate-400 hover:bg-red-50 hover:text-red-500 
                           dark:hover:bg-red-500/10 dark:hover:text-red-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 12"/></svg>
              </button>
            </div>

            <div className="p-6">
              <ImageCarousel images={selectedCert.images} title={selectedCert.title} />
              
              <div className="mt-6 flex justify-between items-center text-sm border-t border-slate-100 dark:border-white/5 pt-4">
                 <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 font-mono text-xs">
                    {selectedCert.year}
                 </span>
                 <p className="text-slate-600 dark:text-gray-400 max-w-lg text-right">
                    {selectedCert.desc}
                 </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none 
                      bg-gradient-to-t 
                      from-slate-100 via-slate-200/50 to-transparent 
                      dark:from-[#050505] dark:via-[#050505]/50 dark:to-transparent"
      />
    </section>
  );
};