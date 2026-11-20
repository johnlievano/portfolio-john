import { createContext, useContext } from "react";
export type Theme = "light" | "dark";
export const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | undefined>(undefined);
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme debe usarse dentro de ThemeProvider");
  return context;
};
