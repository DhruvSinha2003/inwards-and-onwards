import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export const PromptCard = ({ prompt, onClick }) => {
  const { colors } = useTheme();

  return (
    <div
      onClick={onClick}
      className="p-6 rounded-lg cursor-pointer transition-all duration-300 hover:scale-102"
      style={{
        backgroundColor: colors.surfaceAccent,
        border: `1px solid ${colors.borderAccent}`,
      }}
    >
      <p
        className="text-lg font-serif italic"
        style={{ color: colors.textAccent }}
      >
        {prompt}
      </p>
    </div>
  );
};
