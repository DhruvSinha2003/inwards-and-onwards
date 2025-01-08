// src/components/JournalCard.js
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

export const JournalCard = ({ title, date, preview, content }) => {
  const { colors } = useTheme();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsPopupOpen(false);
    };

    if (isPopupOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isPopupOpen]);

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setIsPopupOpen(true)}
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

      {/* Popup */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsPopupOpen(false);
          }}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg transition-transform duration-200 transform"
            style={{
              backgroundColor: colors.surfacePrimary,
              boxShadow: `0 4px 20px ${colors.bgOverlay}`,
              borderLeft: `4px solid ${colors.accent}`,
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 left-4 p-1.5 rounded-full transition-colors duration-200 hover:opacity-80"
              style={{
                backgroundColor: colors.bgSecondary,
                color: colors.textPrimary,
              }}
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="p-8 pt-16">
              {/* Date */}
              <p
                className="text-sm mb-2"
                style={{ color: colors.textSecondary }}
              >
                {date}
              </p>

              {/* Title */}
              <h2
                className="text-2xl font-serif mb-6"
                style={{ color: colors.textPrimary }}
              >
                {title}
              </h2>

              {/* Content */}
              <div
                className="prose max-w-none"
                style={{ color: colors.textPrimary }}
              >
                <div
                  className="space-y-4 font-serif leading-relaxed"
                  style={{
                    backgroundColor: colors.surfacePrimary,
                    borderRadius: "4px",
                  }}
                >
                  {content.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
