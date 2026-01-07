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
      className="fixed inset-0 z-0 pointer-events-none" // pointer-events-none es correcto para que no bloquee tus botones
      options={{
        fpsLimit: 60,
        interactivity: {
          // Importante: detecta el mouse en la ventana, ya que el canvas tiene pointer-events-none
          detectsOn: "window",
          events: {
            onHover: {
              enable: true,
              mode: "grab", // Conecta líneas al pasar el mouse
            },
            onClick: {
              enable: false, // DESACTIVADO: Evita crear partículas al hacer click/tap
              mode: "push",
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 1,
              },
            },
            // La configuración 'push' ya no es necesaria, pero no estorba si se deja
          },
        },
        particles: {
          // Consejo: Si aún sientes lag en móviles viejos, baja este valor a 50 o 60
          number: { value: 80, density: { enable: true } },
          color: { value: color },
          links: {
            enable: true,
            distance: 150,
            color: color,
            opacity: theme === "dark" ? 0.2 : 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1, // Reduje un poco la velocidad para que sea más "fondo tranquilo"
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