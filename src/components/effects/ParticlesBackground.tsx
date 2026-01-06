import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "../../hooks/useTheme";

export const ParticlesBackground = () => {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  // COLOR: 
  // Light Mode: "#1e293b" (Gris oscuro/Azul) para que resalte sobre blanco.
  // Dark Mode: "#FCD34D" (Dorado) para resaltar sobre negro.
  const color = theme === "dark" ? "#FCD34D" : "#1e293b";

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      key={theme} // Reinicia al cambiar tema
      className="fixed inset-0 z-0 pointer-events-none"
      options={{
        fpsLimit: 60,
        interactivity: {
          // RESTAURADO: Interactividad con el mouse
          events: {
            onHover: {
              enable: true,
              mode: "grab", // "grab" crea líneas hacia el mouse
            },
            onClick: {
              enable: true,
              mode: "push", // Click crea más partículas
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 1, // Las líneas al mouse son sólidas
              },
            },
            push: {
              quantity: 4,
            },
          },
        },
        particles: {
          number: { value: 100, density: { enable: true } },
          color: { value: color },
          links: {
            enable: true,
            distance: 150,
            color: color,
            // En modo claro (light) aumentamos opacidad para que se vea bien
            opacity: theme === "dark" ? 0.2 : 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5, // Velocidad para que se note el movimiento
            outModes: "out",
          },
          opacity: { value: theme === "dark" ? 0.3 : 0.6 },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
        background: { color: "transparent" },
      }}
    />
  );
};