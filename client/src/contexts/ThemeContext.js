// src/contexts/ThemeContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { coolTheme } from "../themes/cool.js";
import { darkTheme } from "../themes/dark.js";
import { warmTheme } from "../themes/warm.js";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : coolTheme;
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
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
