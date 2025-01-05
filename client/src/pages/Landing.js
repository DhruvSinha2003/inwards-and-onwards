// src/pages/Landing.js

import React from "react";
import ThemeSelector from "../components/ThemeSelector";
import { useTheme } from "../contexts/ThemeContext";

const LandingPage = () => {
  const { theme, cycleTheme } = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: theme.colors.bgPrimary }}
    >
      <nav className="fixed w-full top-0 flex justify-between items-center px-4 py-3">
        <div
          className="w-8 h-8 rounded-full cursor-pointer"
          style={{ backgroundColor: theme.colors.surfaceAccent }}
          onClick={cycleTheme}
        >
          {" "}
          <ThemeSelector />
        </div>
      </nav>
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-5xl md:text-6xl font-serif tracking-wider mb-16"
            style={{ color: theme.colors.textPrimary }}
          >
            <span className="block md:inline">INWARDS</span>
            <span className="mx-4 italic">&</span>
            <span className="block md:inline">ONWARDS</span>
          </h1>

          <button
            className="font-serif tracking-wide text-xl px-12 py-4 transition-colors duration-300"
            style={{
              backgroundColor: theme.colors.buttonBg,
              color: theme.colors.buttonText,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor =
                theme.colors.buttonHoverBg;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.buttonBg;
            }}
          >
            LOGIN/REGISTER
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
