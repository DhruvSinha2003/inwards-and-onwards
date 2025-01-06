import { User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import ThemeSelector from "./ThemeSelector";

const Header = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scroll Down: Hide header
        setIsVisible(false);
      } else {
        // Scroll Up: Show header
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 top-6 flex items-center justify-between px-6 py-3 rounded-full w-96 transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-20"
      }`}
      style={{
        backgroundColor: theme.colors.surfaceSecondary,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="p-1">
        <ThemeSelector />
      </div>

      <div
        className="font-serif tracking-wider text-base flex items-center gap-2 px-4"
        style={{ color: theme.colors.textPrimary }}
      >
        <span>INWARDS</span>
        <span className="italic">&</span>
        <span>ONWARDS</span>
      </div>

      <div className="p-1">
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300"
          style={{
            backgroundColor: theme.colors.surfaceAccent,
            color: theme.colors.textPrimary,
          }}
          aria-label="User profile"
        >
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
