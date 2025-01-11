import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const AlertDialog = ({
  open,
  onClose,
  title,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
}) => {
  const { colors } = useTheme();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transition-all transform"
        style={{ backgroundColor: colors.surfaceSecondary }}
      >
        <div className="p-6">
          <h2
            className="text-xl font-medium mb-2"
            style={{ color: colors.textPrimary }}
          >
            {title}
          </h2>

          <p className="mb-6" style={{ color: colors.textSecondary }}>
            {description}
          </p>

          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 rounded-lg font-medium transition-opacity"
              style={{ color: colors.textSecondary }}
              onClick={onClose}
            >
              {cancelText}
            </button>

            <button
              className="px-4 py-2 rounded-lg font-medium transition-opacity"
              style={{
                backgroundColor: colors.buttonBg,
                color: colors.buttonText,
              }}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
