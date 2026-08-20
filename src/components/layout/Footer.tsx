import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

// --- SIMULACIÓN DE TETRIS EN CANVAS ---
const TetrisSimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CELL = 22; // Tamaño de cada "cuadro"
    let cols = 0;
    let rows = 0;
    let offsetY = 0; // Calcularemos esto para alinear el grid al fondo
    let board: (string | null)[][] = [];

    // Formas clásicas de Tetris
    const SHAPES = [
      [[1, 1, 1, 1]], // I horizontal
      [[1], [1], [1], [1]], // I vertical
      [[1, 1], [1, 1]], // O
      [[1, 1, 1], [0, 1, 0]], // T
      [[0, 1, 0], [1, 1, 1]], // T invertida
      [[1, 0], [1, 0], [1, 1]], // L
      [[0, 1], [0, 1], [1, 1]], // J
      [[1, 1, 0], [0, 1, 1]], // Z
      [[0, 1, 1], [1, 1, 0]], // S
    ];

    const COLORS = ["#F97316", "#F59E0B", "#FCD34D", "#FFFFFF", "#94A3B8"];

    let currentPiece: any = null;
    let dropCounter = 0;
    let dropInterval = 25; // Velocidad de caída
    let lastTime = 0;
    let animationId: number;

    // Estados de animación
    let gameState = "PLAYING"; // 'PLAYING', 'CLEARING', 'GAME_OVER'
    let linesToClear: number[] = [];
    let clearLinesTimer = 0;
    
    // Variables para el efecto barrido (Game Over)
    let gameOverRow = 0;
    let gameOverTimer = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      cols = Math.ceil(canvas.width / CELL);
      rows = Math.ceil(canvas.height / CELL);
      
      // EL TRUCO: Calculamos el sobrante para empujar todo hacia arriba
      offsetY = canvas.height - (rows * CELL);
      
      board = Array.from({ length: rows }, () => Array(cols).fill(null));
    };

    window.addEventListener("resize", resize);
    resize();

    const collide = (b: any[][], p: any) => {
      for (let y = 0; y < p.shape.length; y++) {
        for (let x = 0; x < p.shape[y].length; x++) {
          if (p.shape[y][x] !== 0) {
            const bX = p.x + x;
            const bY = p.y + y;
            if (bX < 0 || bX >= cols || bY >= rows) return true;
            if (bY >= 0 && b[bY][bX] !== null) return true;
          }
        }
      }
      return false;
    };

    const merge = (b: any[][], p: any) => {
      for (let y = 0; y < p.shape.length; y++) {
        for (let x = 0; x < p.shape[y].length; x++) {
          if (p.shape[y][x] !== 0) {
            const bY = p.y + y;
            if (bY >= 0 && bY < rows) b[bY][p.x + x] = p.color;
          }
        }
      }
    };

    // Función que detecta líneas y activa la animación (TU VERSIÓN PREFERIDA)
    const checkLines = () => {
      linesToClear = [];
      for (let y = rows - 1; y >= 0; y--) {
        if (board[y].every((cell) => cell !== null)) {
          linesToClear.push(y);
        }
      }
      
      if (linesToClear.length > 0) {
        gameState = "CLEARING";
        clearLinesTimer = 0;
        // Ponemos las líneas completadas en blanco puro de inmediato
        for (let y of linesToClear) {
          for (let c = 0; c < cols; c++) {
            board[y][c] = "#FFFFFF";
          }
        }
      }
    };

    const spawnPiece = () => {
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const x = Math.floor(Math.random() * (cols - shape[0].length));
      currentPiece = { shape, color, x, y: 0 };

      if (collide(board, currentPiece)) {
        gameState = "GAME_OVER";
        gameOverRow = rows - 1; 
        gameOverTimer = 0;
        currentPiece = null;
      }
    };

    const update = (time = 0) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      if (gameState === "GAME_OVER") {
        gameOverTimer += deltaTime;
        if (gameOverTimer > 25) { 
          if (gameOverRow >= 0) {
            for (let c = 0; c < cols; c++) {
              if (board[gameOverRow][c]) board[gameOverRow][c] = "#FCD34D";
            }
            gameOverRow--;
            gameOverTimer = 0;
          } else {
            if (gameOverTimer > 600) { 
              board = Array.from({ length: rows }, () => Array(cols).fill(null));
              gameState = "PLAYING";
            }
          }
        }
      } else if (gameState === "CLEARING") {
        // TU VERSIÓN PREFERIDA: Espera 250ms en blanco y desaparece
        clearLinesTimer += deltaTime;
        if (clearLinesTimer > 250) { 
          for (let y of linesToClear) {
            board.splice(y, 1);
            board.unshift(Array(cols).fill(null));
          }
          linesToClear = [];
          gameState = "PLAYING";
        }
      } else {
        dropCounter += deltaTime;
        if (dropCounter > dropInterval) {
          if (!currentPiece) {
            spawnPiece();
          } else {
            currentPiece.y++;
            if (collide(board, currentPiece)) {
              currentPiece.y--;
              merge(board, currentPiece);
              checkLines();
              currentPiece = null;
            }
          }
          dropCounter = 0;
        }
      }

      draw();
      animationId = requestAnimationFrame(update);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar cuadrícula de fondo (Con el offsetY aplicado)
      ctx.fillStyle = "rgba(148, 163, 184, 0.12)";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx.fillRect(c * CELL + 1, r * CELL + 1 + offsetY, CELL - 2, CELL - 2);
        }
      }

      // Dibujar piezas en el tablero
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (board[r][c]) {
            ctx.fillStyle = board[r][c] as string;
            ctx.fillRect(c * CELL + 1, r * CELL + 1 + offsetY, CELL - 2, CELL - 2);
          }
        }
      }

      // Dibujar pieza cayendo
      if (currentPiece && gameState === "PLAYING") {
        ctx.fillStyle = currentPiece.color;
        for (let y = 0; y < currentPiece.shape.length; y++) {
          for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
              ctx.fillRect(
                (currentPiece.x + x) * CELL + 1,
                (currentPiece.y + y) * CELL + 1 + offsetY,
                CELL - 2,
                CELL - 2
              );
            }
          }
        }
      }
    };

    animationId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40 dark:opacity-50 transition-opacity duration-500"
    />
  );
};

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative py-12 overflow-hidden transition-colors duration-300
                 bg-white border-t border-slate-200 
                 dark:bg-[#0B1121] dark:border-white/5"
    >
      {/* 
        El fondo simulador se renderiza de fondo absoluto. 
        Al ser un canvas, calcula automáticamente el tamaño del footer.
      */}
      <TetrisSimulation />

      {/* CONTENIDO DEL FOOTER (Aseguramos que esté por encima del fondo con z-10) */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 mx-auto max-w-6xl">
        
        {/* LOGO PERSONALIZADO */}
        <div className="flex-shrink-0 cursor-default">
          <div className="relative flex items-center text-xl font-black tracking-tighter uppercase transition-colors group">
            <span className="z-10 transition-colors text-slate-900 dark:text-white">
              J
            </span>

            <div className="relative flex items-center justify-center mx-0.5">
              <div
                className="absolute inset-0 transition-all duration-500 ease-out rounded-full opacity-0 blur-md
                           group-hover:opacity-100 group-hover:scale-150 group-hover:animate-pulse
                           bg-orange-500 dark:bg-[#FCD34D]"
              />
              <img
                src="/esferas/esfera1.png"
                alt="Esfera del Dragón"
                className="relative z-10 w-auto h-6 transition-transform duration-300 object-contain"
              />
            </div>

            <span className="z-10 transition-colors text-slate-900 dark:text-white">
              hnDev<span className="text-[#FCD34D]">.</span>
            </span>
          </div>
        </div>

        {/* COPYRIGHT & NOMBRE */}
        <div className="text-center">
          <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
            © {currentYear}{" "}
            <span className="text-slate-900 dark:text-white">
              John Esteban Liévano
            </span>
            . {t("footer.rights")}
          </p>

          <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-2 opacity-70">
            {t("footer.attribution")}
          </p>
        </div>
      </div>
    </footer>
  );
};