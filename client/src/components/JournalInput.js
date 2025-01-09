import React from "react";
import { useTheme } from "../contexts/ThemeContext";

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

export default JournalInput;
