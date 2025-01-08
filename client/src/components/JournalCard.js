import React from "react";
import { useTheme } from "../contexts/ThemeContext";
export const JournalCard = ({ title, date, preview, onClick }) => {
  const { colors } = useTheme();

  return (
    <div
      onClick={onClick}
      className="p-6 rounded-lg cursor-pointer transition-all duration-300 hover:scale-102"
      style={{
        backgroundColor: colors.surfacePrimary,
        borderLeft: `4px solid ${colors.accent}`,
        boxShadow: `0 4px 6px ${colors.bgOverlay}`,
      }}
    >
      <h3
        className="text-xl font-serif mb-2"
        style={{ color: colors.textPrimary }}
      >
        {title}
      </h3>
      <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
        {date}
      </p>
      <p className="line-clamp-3" style={{ color: colors.textMuted }}>
        {preview}
      </p>
    </div>
  );
};

// src/components/JournalInput.js
export const JournalInput = ({ placeholder, value, onChange }) => {
  const { colors } = useTheme();

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full min-h-[200px] p-6 rounded-lg font-serif resize-none transition-colors duration-300"
      style={{
        backgroundColor: colors.inputBg,
        color: colors.inputText,
        borderColor: colors.inputBorder,
      }}
    />
  );
};
