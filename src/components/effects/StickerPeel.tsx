import { useRef, useEffect, useMemo } from "react";
import type { CSSProperties, FC } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import "./StickerPeel.css";

gsap.registerPlugin(Draggable);

interface InitialPositionObj {
  x: number;
  y: number;
}

export interface StickerPeelProps {
  imageSrc: string;
  rotate?: number;
  peelBackHoverPct?: number;
  peelBackActivePct?: number;
  peelEasing?: string;
  peelHoverEasing?: string;
  width?: number;
  shadowIntensity?: number;
  lightingIntensity?: number;
  initialPosition?:
    | "center"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | InitialPositionObj;
  peelDirection?: number;
  className?: string;
  dragBounds?: string | HTMLElement; // NUEVO
}

interface CustomCSSProperties extends CSSProperties {
  "--sticker-rotate"?: string;
  "--sticker-p"?: string;
  "--sticker-peelback-hover"?: string;
  "--sticker-peelback-active"?: string;
  "--sticker-peel-easing"?: string;
  "--sticker-peel-hover-easing"?: string;
  "--sticker-width"?: string;
  "--sticker-shadow-opacity"?: number;
  "--sticker-lighting-constant"?: number;
  "--peel-direction"?: string;
}

const StickerPeel: FC<StickerPeelProps> = ({
  imageSrc,
  rotate = 30,
  peelBackHoverPct = 30,
  peelBackActivePct = 40,
  peelEasing = "power3.out",
  peelHoverEasing = "power2.out",
  width = 100,
  shadowIntensity = 0.6,
  lightingIntensity = 0.1,
  initialPosition = "center",
  peelDirection = 0,
  className = "",
  dragBounds = "body",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragTargetRef = useRef<HTMLDivElement>(null);
  const pointLightRef = useRef<SVGFEPointLightElement>(null);
  const pointLightFlippedRef = useRef<SVGFEPointLightElement>(null);
  const draggableInstanceRef = useRef<Draggable | null>(null);

  // Refs para la animación de retorno sin depender del namespace NodeJS
  const startPosRef = useRef({ x: 0, y: 0 });
  const returnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const defaultPadding = 10;

  useEffect(() => {
    const target = dragTargetRef.current;
    if (!target) return;

    let startX = 0;
    let startY = 0;

    if (
      typeof initialPosition === "object" &&
      initialPosition.x !== undefined &&
      initialPosition.y !== undefined
    ) {
      startX = initialPosition.x;
      startY = initialPosition.y;
    }

    startPosRef.current = { x: startX, y: startY };
    gsap.set(target, { x: startX, y: startY });
  }, [initialPosition]);

  useEffect(() => {
    const target = dragTargetRef.current;
    if (!target) return;

    draggableInstanceRef.current = Draggable.create(target, {
      type: "x,y",
      bounds: dragBounds, // Al poner 'body', puedes arrastrar el sticker por toda la ventana de tu portafolio
      inertia: true,
      onPress() {
        if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
        target.style.cursor = "grabbing";
        gsap.set(target, { zIndex: 9999 });
      },
      onDrag() {
        const rot = gsap.utils.clamp(-24, 24, this.deltaX * 0.4);
        gsap.to(target, { rotation: rot, duration: 0.15, ease: "power1.out" });
      },
      onRelease() {
        target.style.cursor = "grab";
      },
      onDragEnd() {
        if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
        returnTimeoutRef.current = setTimeout(() => {
          gsap.to(target, {
            x: startPosRef.current.x,
            y: startPosRef.current.y,
            rotation: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.6)",
          });
          gsap.set(target, { zIndex: 50 });
        }, 4000);
      },
    })[0];

    target.style.cursor = "grab";

    return () => {
      if (draggableInstanceRef.current) draggableInstanceRef.current.kill();
      if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const updateLight = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.set(pointLightRef.current, { attr: { x, y } });
      const normalizedAngle = Math.abs(peelDirection % 360);
      if (normalizedAngle !== 180) {
        gsap.set(pointLightFlippedRef.current, {
          attr: { x, y: rect.height - y },
        });
      } else {
        gsap.set(pointLightFlippedRef.current, {
          attr: { x: -1000, y: -1000 },
        });
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", updateLight);
      return () => container.removeEventListener("mousemove", updateLight);
    }
  }, [peelDirection]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleTouchStart = () => container.classList.add("touch-active");
    const handleTouchEnd = () => container.classList.remove("touch-active");
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("touchcancel", handleTouchEnd);
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  const cssVars = useMemo<CustomCSSProperties>(
    () => ({
      "--sticker-rotate": `${rotate}deg`,
      "--sticker-p": `${defaultPadding}px`,
      "--sticker-peelback-hover": `${peelBackHoverPct}%`,
      "--sticker-peelback-active": `${peelBackActivePct}%`,
      "--sticker-peel-easing": peelEasing,
      "--sticker-peel-hover-easing": peelHoverEasing,
      "--sticker-width": `${width}px`,
      "--sticker-shadow-opacity": shadowIntensity,
      "--sticker-lighting-constant": lightingIntensity,
      "--peel-direction": `${peelDirection}deg`,
    }),
    [
      rotate,
      peelBackHoverPct,
      peelBackActivePct,
      peelEasing,
      peelHoverEasing,
      width,
      shadowIntensity,
      lightingIntensity,
      peelDirection,
    ],
  );

  return (
    <div
      className={`draggable ${className}`}
      ref={dragTargetRef}
      style={cssVars}
    >
      <svg width="0" height="0">
        <defs>
          <filter id="pointLight">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity}
              lightingColor="white"
            >
              <fePointLight ref={pointLightRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>
          <filter id="pointLightFlipped">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity * 7}
              lightingColor="white"
            >
              <fePointLight
                ref={pointLightFlippedRef}
                x="100"
                y="100"
                z="300"
              />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>
          <filter id="dropShadow">
            <feDropShadow
              dx="2"
              dy="4"
              stdDeviation={3 * shadowIntensity}
              floodColor="black"
              floodOpacity={shadowIntensity}
            />
          </filter>
          <filter id="expandAndFill">
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
            <feFlood floodColor="rgb(179,179,179)" result="flood" />
            <feComposite operator="in" in="flood" in2="shape" />
          </filter>
        </defs>
      </svg>

      <div className="sticker-container" ref={containerRef}>
        <div className="sticker-main">
          <div className="sticker-lighting">
            <img
              src={imageSrc}
              alt=""
              className="sticker-image"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
        <div className="flap">
          <div className="flap-lighting">
            <img
              src={imageSrc}
              alt=""
              className="flap-image"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickerPeel;
