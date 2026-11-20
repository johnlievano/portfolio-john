import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export const MaskReveal = ({ image }: { image: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Suavizado del movimiento
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculamos posición relativa al contenedor
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-[#050505] cursor-none">
      {/* Imagen de fondo oscurecida (opcional) */}
      <img src={image} className="w-full h-full object-cover opacity-10 grayscale" alt="Background" />

      {/* Máscara de revelación */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitMaskImage: `radial-gradient(circle 150px at ${springX}px ${springY}px, black 100%, transparent 0%)`,
          maskImage: `radial-gradient(circle 150px at ${springX}px ${springY}px, black 100%, transparent 0%)`,
        }}
      />
    </div>
  );
};