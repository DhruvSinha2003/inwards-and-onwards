import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const ChartCard = ({ title, children }) => {
  const { colors } = useTheme();

  return (
    <div
      className="p-6 rounded-lg"
      style={{ backgroundColor: colors.surfaceSecondary }}
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
          {title}
        </h3>
      </div>
      <div style={{ width: "100%", minHeight: "300px" }}>{children}</div>
    </div>
  );
};

export default ChartCard;
