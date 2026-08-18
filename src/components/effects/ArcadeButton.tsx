import { useState } from "react";

interface ToggleButtonProps {
  showAll: boolean;
  onClick: () => void;
  labelMore: string;
  labelLess: string;
}

const HUE = 45;
const SAT = 96;

// 1. ESTADO DE REPOSO: Profundidad total de 10px
const restShadow = [
  `0px 1px 0px hsl(${HUE},${SAT}%,58%)`,
  `0px 2px 0px hsl(${HUE},${SAT}%,55%)`,
  `0px 3px 0px hsl(${HUE},${SAT}%,52%)`,
  `0px 4px 0px hsl(${HUE},${SAT}%,49%)`,
  `0px 5px 0px hsl(${HUE},${SAT}%,46%)`,
  `0px 6px 0px hsl(${HUE},${SAT}%,43%)`,
  `0px 7px 0px hsl(${HUE},${SAT}%,40%)`,
  `0px 8px 0px hsl(${HUE},${SAT}%,37%)`,
  `0px 9px 0px hsl(${HUE},${SAT}%,34%)`,
  `0px 10px 0px hsl(${HUE},${SAT}%,22%)`,
  `0px 11px 10px rgba(0,0,0,0.6)`,
].join(", ");

// 2. ESTADO HOVER: Profundidad de 6px (Quitamos 4px)
const hoverShadow = [
  `0px 1px 0px hsl(${HUE},${SAT}%,55%)`,
  `0px 2px 0px hsl(${HUE},${SAT}%,50%)`,
  `0px 3px 0px hsl(${HUE},${SAT}%,45%)`,
  `0px 4px 0px hsl(${HUE},${SAT}%,40%)`,
  `0px 5px 0px hsl(${HUE},${SAT}%,35%)`,
  `0px 6px 0px hsl(${HUE},${SAT}%,22%)`,
  `0px 7px 8px rgba(0,0,0,0.6)`,
].join(", ");

// 3. ESTADO PRESIONADO: Profundidad de 2px (Quitamos 8px)
const pressedShadow = [
  `0px 1px 0px hsl(${HUE},${SAT}%,45%)`,
  `0px 2px 0px hsl(${HUE},${SAT}%,22%)`,
  `0px 3px 4px rgba(0,0,0,0.6)`,
].join(", ");

export const ArcadeToggleButton = ({
  showAll,
  onClick,
  labelMore,
  labelLess,
}: ToggleButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Manejo de eventos del mouse/tacto
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };
  const handlePressDown = () => setIsPressed(true);
  const handlePressUp = () => setIsPressed(false);

  // Lógica para decidir qué estilos aplicar
  let currentShadow = restShadow;
  let currentTransform = "translateY(0px)";
  
  if (isPressed) {
    currentShadow = pressedShadow;
    currentTransform = "translateY(8px)"; // Baja 8px exactos
  } else if (isHovered) {
    currentShadow = hoverShadow;
    currentTransform = "translateY(4px)"; // Baja 4px exactos al pasar el cursor
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handlePressDown}
      onMouseUp={handlePressUp}
      onTouchStart={handlePressDown}
      onTouchEnd={handlePressUp}
      onTouchCancel={handleMouseLeave}
      className="select-none outline-none border-none cursor-pointer rounded-md px-8 py-3.5 font-mono text-xs md:text-sm font-bold tracking-[0.2em] uppercase"
      style={{
        background: isHovered && !isPressed ? `hsl(${HUE},${SAT}%,68%)` : `hsl(${HUE},${SAT}%,64%)`, // Brilla un poquito extra en hover
        color: "#1a1200",
        boxShadow: currentShadow,
        transform: currentTransform,
        transition: "transform 80ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 80ms cubic-bezier(0.2, 0.8, 0.2, 1), background 150ms ease-out",
      }}
    >
      <span className="flex items-center justify-center gap-3">
        {showAll ? (
          <>
            <span>▲</span>
            <span>{labelLess}</span>
          </>
        ) : (
          <>
            <span>▼</span>
            <span>{labelMore}</span>
          </>
        )}
      </span>
    </button>
  );
};