import { Moon, Palette, Sun } from "lucide-react";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeSelector = () => {
  const { theme, cycleTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme.name) {
      case "cool":
        return <Palette size={20} />;
      case "warm":
        return <Sun size={20} />;
      case "dark":
        return <Moon size={20} />;
      default:
        return <Palette size={20} />;
    }
  };

  return (
    <button
      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
      style={{
        backgroundColor: theme.colors.surfaceAccent,
        color: theme.colors.textPrimary,
      }}
      onClick={cycleTheme}
      aria-label="Toggle theme"
    >
      {getThemeIcon()}
    </button>
  );
};

export default ThemeSelector;
