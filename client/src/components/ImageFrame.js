import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export const ImageFrame = ({ src, alt }) => {
  const { colors } = useTheme();

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative aspect-square">
        <div className="absolute inset-4 overflow-hidden">
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>

        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-2 right-2 h-4 rounded-b-md"
            style={{ backgroundColor: colors.surfacePrimary }}
          />

          <div
            className="absolute bottom-0 left-2 right-2 h-4 rounded-t-md"
            style={{ backgroundColor: colors.surfacePrimary }}
          />

          <div
            className="absolute left-0 top-2 bottom-2 w-4 rounded-r-md"
            style={{ backgroundColor: colors.surfacePrimary }}
          />

          <div
            className="absolute right-0 top-2 bottom-2 w-4 rounded-l-md"
            style={{ backgroundColor: colors.surfacePrimary }}
          />

          <div
            className="absolute top-0 left-0 w-8 h-8"
            style={{ backgroundColor: colors.surfacePrimary }}
          />
          <div
            className="absolute top-0 right-0 w-8 h-8"
            style={{ backgroundColor: colors.surfacePrimary }}
          />
          <div
            className="absolute bottom-0 left-0 w-8 h-8"
            style={{ backgroundColor: colors.surfacePrimary }}
          />
          <div
            className="absolute bottom-0 right-0 w-8 h-8"
            style={{ backgroundColor: colors.surfacePrimary }}
          />

          <div
            className="absolute top-1 left-1 w-4 h-4"
            style={{ backgroundColor: colors.accent }}
          />
          <div
            className="absolute top-1 right-1 w-4 h-4"
            style={{ backgroundColor: colors.accent }}
          />
          <div
            className="absolute bottom-1 left-1 w-4 h-4"
            style={{ backgroundColor: colors.accent }}
          />
          <div
            className="absolute bottom-1 right-1 w-4 h-4"
            style={{ backgroundColor: colors.accent }}
          />
        </div>
      </div>
    </div>
  );
};
