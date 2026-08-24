import { motion, useReducedMotion } from "framer-motion";

interface DragonBallsEffectProps {
  imgLight?: string;
  imgDark?: string;
  altLight?: string;
  altDark?: string;
  textEndTime?: number;
}

// 1. Cambiamos a 7 esferas
const BALL_COUNT = 7;
const ORBIT_RADIUS = 90; // px

const DragonBallsEffect = ({
  imgLight = "/perfil_white.webp",
  imgDark = "/perfil_black.webp",
  altLight = "John Esteban - Modo Claro",
  altDark = "John Esteban - Modo Oscuro",
  textEndTime = 5, 
}: DragonBallsEffectProps) => {
  const balls = Array.from({ length: BALL_COUNT });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="relative w-64 h-64 md:w-[400px] md:h-[400px]">
        <div className="absolute inset-0 transform translate-x-4 translate-y-4 bg-gradient-to-tr from-amber-400 to-purple-500 rounded-3xl blur-2xl opacity-30 dark:opacity-20" />
        <div className="relative w-full h-full overflow-hidden border-4 shadow-2xl rounded-3xl border-white/80 dark:border-white/10 bg-white dark:bg-black/20">
          <img src={imgLight} alt={altLight} width={400} height={400} loading="eager" fetchPriority="high" decoding="async" className="block dark:hidden w-full h-full object-cover" />
          <img src={imgDark} alt={altDark} width={400} height={400} loading="eager" fetchPriority="high" decoding="async" className="hidden dark:block w-full h-full object-cover" />
        </div>
      </div>
    );
  }

  const d = textEndTime; 
  const animationDuration = 4; 
  const explosionTime = d + animationDuration; 

  return (
    <div className="relative w-64 h-64 md:w-[400px] md:h-[400px] flex items-center justify-center overflow-visible">

      {/* GLOW DE FONDO */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: d, ease: "easeOut" }}
        className="absolute inset-0 translate-x-4 translate-y-4 bg-gradient-to-tr from-amber-400 to-purple-500 rounded-3xl blur-2xl dark:opacity-20"
      />

      {/* CAMPO DE ENERGÍA CENTRAL */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 0.8, 0], opacity: [0, 0.6, 0] }}
        transition={{ duration: animationDuration, delay: d, times: [0, 0.7, 1], ease: "easeInOut" }}
        className="absolute w-32 h-32 md:w-48 md:h-48 bg-amber-400/50 rounded-full blur-2xl z-10 pointer-events-none"
      />

      {/* ANILLO DE ESFERAS */}
      <motion.div
        initial={{ rotate: 0, opacity: 1, scale: 1 }}
        animate={{
          rotate: [0, 360, 720],
          opacity: [1, 1, 0],
          scale: [1, 1, 0.1],
        }}
        transition={{
          duration: animationDuration,
          delay: d,
          times: [0, 0.75, 1],
          ease: "easeInOut",
        }}
        className="absolute inset-0 z-20 pointer-events-none"
        // 1. Agregamos willChange al contenedor que rota
        style={{ transformOrigin: "50% 50%", willChange: "transform, opacity" }} 
      >
        {balls.map((_, index) => {
          const angle = (index * 360) / BALL_COUNT;
          return (
            <div
              key={index}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${ORBIT_RADIUS}px) rotate(-${angle}deg)`,
              }}
            >
              {/* 2. Modificamos las esferas */}
              <motion.img
                src={`/esferas/esfera${index + 1}.webp`}
                alt={`Esfera del dragón ${index + 1}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: d + (index * 0.3),
                  ease: "backOut",
                }}
                // Agregamos willChange a la imagen
                style={{ willChange: "transform, opacity" }}
                // Modificamos el drop-shadow para que solo aplique de tablet (md:) para arriba
                className="relative w-8 h-8 md:w-10 md:h-10 md:drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]"
              />
            </div>
          );
        })}
      </motion.div>

      {/* ONDA DE CHOQUE */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 3.5], opacity: [0.8, 0] }}
        transition={{ duration: 0.8, delay: explosionTime, ease: "easeOut" }}
        className="absolute w-40 h-40 rounded-full border-2 border-amber-300/80 z-30 pointer-events-none md:shadow-[0_0_20px_rgba(245,158,11,0.5)]"
        style={{ willChange: "transform, opacity" }} // <-- AGREGAR ESTO
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2.5], opacity: [1, 0] }}
        transition={{ duration: 0.6, delay: explosionTime + 0.05, ease: "easeOut" }}
        className="absolute w-40 h-40 rounded-full border border-white/80 z-30 pointer-events-none"
        style={{ willChange: "transform, opacity" }} // <-- AGREGAR ESTO
      />

      {/* DESTELLO BLANCO CENTRAL */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2.5, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 0.5, delay: explosionTime }}
        className="absolute w-40 h-40 bg-white rounded-full blur-2xl z-30 pointer-events-none"
        style={{ willChange: "transform, opacity" }} // <-- AGREGAR ESTO
      />

      {/* FOTO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: explosionTime, type: "spring", stiffness: 120, damping: 12 }}
        className="relative w-full h-full overflow-hidden border-4 shadow-2xl rounded-3xl border-white/80 dark:border-white/10 bg-white dark:bg-black/20 z-10"
      >
        <img src={imgLight} alt={altLight} width={400} height={400} loading="eager" fetchPriority="high" decoding="async" className="block dark:hidden w-full h-full object-cover" />
        <img src={imgDark} alt={altDark} width={400} height={400} loading="eager" fetchPriority="high" decoding="async" className="hidden dark:block w-full h-full object-cover" />
        
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: explosionTime + 0.1 }}
          className="absolute inset-0 bg-amber-200 mix-blend-overlay pointer-events-none"
        />
      </motion.div>

    </div>
  );
};

export default DragonBallsEffect;