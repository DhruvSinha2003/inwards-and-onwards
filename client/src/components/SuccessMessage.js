import { useTheme } from "../contexts/ThemeContext";

export const SuccessMessage = ({ message, onClose }) => {
  const { colors } = useTheme();

  return (
    <div
      className="fixed top-24 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 rounded-lg shadow-lg z-50"
      style={{ backgroundColor: colors.bgAccent }}
    >
      <div className="flex justify-between items-center">
        <p style={{ color: colors.textAccent }}>{message}</p>
        <button
          onClick={onClose}
          style={{ color: colors.textAccent }}
          className="hover:opacity-80"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
