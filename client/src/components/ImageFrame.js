// src/components/ImageFrame.js
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export const ImageFrame = ({ src, alt }) => {
  const { colors } = useTheme();

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Main container with aspect ratio */}
      <div className="relative aspect-square">
        {/* Image container */}
        <div className="absolute inset-4 overflow-hidden">
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>

        {/* Frame borders */}
        <div className="absolute inset-0">
          {/* Top border */}
          <div
            className="absolute top-0 left-2 right-2 h-4 rounded-b-md"
            style={{ backgroundColor: colors.surfacePrimary }}
          />

          {/* Bottom border */}
          <div
            className="absolute bottom-0 left-2 right-2 h-4 rounded-t-md"
            style={{ backgroundColor: colors.surfacePrimary }}
          />

          {/* Left border */}
          <div
            className="absolute left-0 top-2 bottom-2 w-4 rounded-r-md"
            style={{ backgroundColor: colors.surfacePrimary }}
          />

          {/* Right border */}
          <div
            className="absolute right-0 top-2 bottom-2 w-4 rounded-l-md"
            style={{ backgroundColor: colors.surfacePrimary }}
          />

          {/* Corner pieces */}
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

          {/* Corner accents */}
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
