import { createContext, useContext, useEffect, useState } from "react";
import { coolTheme } from "../themes/cool.js";
import { darkTheme } from "../themes/dark.js";
import { warmTheme } from "../themes/warm.js";

const THEME_KEY = "inwards-and-onwards-theme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return savedTheme ? JSON.parse(savedTheme) : coolTheme;
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));

    // Update CSS variables
    const root = document.documentElement;
    root.style.setProperty("--scroll-thumb", theme.colors.textPrimary);
    root.style.setProperty("--scroll-bg", theme.colors.bgPrimary);
  }, [theme]);

  const cycleTheme = () => {
    setTheme((currentTheme) => {
      switch (currentTheme.name) {
        case "cool":
          return warmTheme;
        case "warm":
          return darkTheme;
        case "dark":
        default:
          return coolTheme;
      }
    });
  };

  const value = {
    theme,
    cycleTheme,
    colors: theme.colors,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
