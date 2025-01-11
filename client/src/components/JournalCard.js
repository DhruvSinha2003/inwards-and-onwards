import { Edit, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export const JournalCard = ({
  title,
  date,
  preview,
  content = "",
  entryId,
}) => {
  const { colors } = useTheme();
  const navigate = useNavigate();
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

  // Safely split content into paragraphs
  const paragraphs = content?.split("\n") || [];

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent card click event from firing
    navigate(`/edit/${entryId}`);
  };

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setIsPopupOpen(true)}
        className="p-6 rounded-lg cursor-pointer transition-all duration-300 hover:scale-102 relative"
        style={{
          backgroundColor: colors.surfacePrimary,
          borderLeft: `4px solid ${colors.accent}`,
          boxShadow: `0 4px 6px ${colors.bgOverlay}`,
        }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3
              className="text-xl font-serif mb-2"
              style={{ color: colors.textPrimary }}
            >
              {title || "Untitled"}
            </h3>
            <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
              {date || "No date"}
            </p>
          </div>
          <button
            onClick={handleEdit}
            className="p-2 rounded-full hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: colors.buttonBg,
              color: colors.textInverted,
            }}
          >
            <Edit size={16} />
          </button>
        </div>
        <p className="line-clamp-3" style={{ color: colors.textMuted }}>
          {preview || "No preview available"}
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
            {/* Header with close and edit buttons */}
            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="p-1.5 rounded-full transition-colors duration-200 hover:opacity-80"
                style={{
                  backgroundColor: colors.bgSecondary,
                  color: colors.textPrimary,
                }}
              >
                <X size={20} />
              </button>
              <button
                onClick={handleEdit}
                className="p-1.5 rounded-full transition-colors duration-200 hover:opacity-80 flex items-center gap-2"
                style={{
                  backgroundColor: colors.buttonBg,
                  color: colors.textInverted,
                }}
              >
                <Edit size={16} />
                <span className="text-sm">Edit</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-8 pt-16">
              {/* Date */}
              <p
                className="text-sm mb-2"
                style={{ color: colors.textSecondary }}
              >
                {date || "No date"}
              </p>

              {/* Title */}
              <h2
                className="text-2xl font-serif mb-6"
                style={{ color: colors.textPrimary }}
              >
                {title || "Untitled"}
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
                  {paragraphs.length > 0 ? (
                    paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  ) : (
                    <p>No content available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JournalCard;
