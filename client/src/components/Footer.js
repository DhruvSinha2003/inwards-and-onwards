import { Github } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Footer = () => {
  const { colors } = useTheme();
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handlePrivacy = () => {
    navigate("/privacy");
  };

  return (
    <footer
      className="w-full py-4 flex items-center justify-center gap-8 fixed bottom-0"
      style={{ backgroundColor: colors.bgPrimary }}
    >
      <div className="group relative">
        <span
          onClick={handlePrivacy}
          className="cursor-pointer text-sm hover:opacity-80 transition-opacity"
          style={{ color: colors.textPrimary }}
        >
          Privacy Policy
        </span>
      </div>

      <div className="group relative">
        <a
          href="https://github.com/DhruvSinha2003"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity inline-flex"
          style={{ color: colors.textPrimary }}
        >
          <Github size={18} />
        </a>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          GitHub
        </div>
      </div>

      <span
        className="text-sm opacity-70"
        style={{ color: colors.textPrimary }}
      >
        © {currentYear}
      </span>
    </footer>
  );
};

export default Footer;
