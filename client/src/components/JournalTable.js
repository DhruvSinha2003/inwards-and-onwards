import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export const JournalTable = ({ entries }) => {
  const { colors } = useTheme();

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ backgroundColor: colors.surfacePrimary }}
    >
      <table className="w-full">
        <thead>
          <tr style={{ backgroundColor: colors.bgSecondary }}>
            <th
              className="px-6 py-3 text-left font-serif"
              style={{ color: colors.textPrimary }}
            >
              Date
            </th>
            <th
              className="px-6 py-3 text-left font-serif"
              style={{ color: colors.textPrimary }}
            >
              Title
            </th>
            <th
              className="px-6 py-3 text-left font-serif"
              style={{ color: colors.textPrimary }}
            >
              Words
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr
              key={index}
              className="border-t transition-colors duration-300 hover:opacity-80"
              style={{ borderColor: colors.borderPrimary }}
            >
              <td className="px-6 py-4" style={{ color: colors.textSecondary }}>
                {entry.date}
              </td>
              <td className="px-6 py-4" style={{ color: colors.textPrimary }}>
                {entry.title}
              </td>
              <td className="px-6 py-4" style={{ color: colors.textSecondary }}>
                {entry.wordCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
