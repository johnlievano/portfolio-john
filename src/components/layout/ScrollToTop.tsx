import { useState, useEffect } from 'react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar el botón cuando se baja de 400px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToHero = () => {
  // Cambiamos 'hero' por 'inicio'
  const heroSection = document.getElementById('inicio'); 
  if (heroSection) {
    heroSection.scrollIntoView({ behavior: 'smooth' });
  }
};

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <button
          onClick={scrollToHero}
          className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 
                     bg-white/80 border border-slate-300 text-slate-600 shadow-lg backdrop-blur-md
                     dark:bg-[#FCD34D]/10 dark:border-[#FCD34D]/20 dark:text-[#FCD34D]
                     hover:scale-110 hover:-translate-y-1 active:scale-95
                     group"
          aria-label="Volver arriba"
        >
          {/* Icono de flecha (SVG) */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-6 h-6 transition-transform group-hover:-translate-y-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}
    </div>
  );
};