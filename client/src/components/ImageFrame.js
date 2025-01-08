import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export const ImageFrame = ({ src, alt }) => {
  const { colors } = useTheme();

  return (
    <div className="relative inline-block">
      {/* Organic shape background */}
      <div
        className="absolute inset-0 transform scale-110"
        style={{
          backgroundColor: colors.bgAccent,
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        }}
      />

      {/* Image container */}
      <div className="relative">
        <div
          className="p-3 rounded-lg overflow-hidden"
          style={{ backgroundColor: colors.surfacePrimary }}
        >
          <img
            src={src}
            alt={alt}
            className="w-64 h-64 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
