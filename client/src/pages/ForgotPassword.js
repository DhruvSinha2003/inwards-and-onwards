// src/pages/ForgotPassword.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSelector from "../components/ThemeSelector";
import { useTheme } from "../contexts/ThemeContext";

const ForgotPassword = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleSubmitEmail = () => {
    // In a real app, this would send the verification code
    setShowCodeInput(true);
  };

  const handleVerifyCode = () => {
    // In a real app, this would verify the code
    setShowNewPassword(true);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: theme.colors.bgPrimary }}
    >
      <nav className="fixed w-full top-0 flex justify-between items-center px-4 py-3">
        <div className="w-8 h-8 rounded-full cursor-pointer">
          <ThemeSelector />
        </div>
      </nav>

      <div
        className="w-full max-w-md p-8 rounded-lg shadow-lg"
        style={{ backgroundColor: theme.colors.surfacePrimary }}
      >
        <h2
          className="text-3xl font-serif mb-8 text-center"
          style={{ color: theme.colors.textPrimary }}
        >
          Reset Password
        </h2>

        <form className="space-y-6">
          {!showCodeInput && (
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md font-serif border-2"
                style={{
                  backgroundColor: theme.colors.inputBg,
                  color: theme.colors.inputText,
                  borderColor: theme.colors.inputBorder,
                }}
              />
              <button
                type="button"
                onClick={handleSubmitEmail}
                className="w-full py-3 rounded-md font-serif tracking-wide text-lg mt-6 transition-colors duration-300 hover:opacity-90"
                style={{
                  backgroundColor: theme.colors.buttonBg,
                  color: theme.colors.buttonText,
                }}
              >
                Send Code
              </button>
            </div>
          )}

          {showCodeInput && !showNewPassword && (
            <div>
              <input
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 rounded-md font-serif border-2"
                style={{
                  backgroundColor: theme.colors.inputBg,
                  color: theme.colors.inputText,
                  borderColor: theme.colors.inputBorder,
                }}
              />
              <button
                type="button"
                onClick={handleVerifyCode}
                className="w-full py-3 rounded-md font-serif tracking-wide text-lg mt-6 transition-colors duration-300 hover:opacity-90"
                style={{
                  backgroundColor: theme.colors.buttonBg,
                  color: theme.colors.buttonText,
                }}
              >
                Verify Code
              </button>
            </div>
          )}

          {showNewPassword && (
            <div>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md font-serif border-2"
                style={{
                  backgroundColor: theme.colors.inputBg,
                  color: theme.colors.inputText,
                  borderColor: theme.colors.inputBorder,
                }}
              />
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full py-3 rounded-md font-serif tracking-wide text-lg mt-6 transition-colors duration-300 hover:opacity-90"
                style={{
                  backgroundColor: theme.colors.buttonBg,
                  color: theme.colors.buttonText,
                }}
              >
                Reset Password
              </button>
            </div>
          )}

          <div className="text-center mt-6">
            <Link
              to="/login"
              className="font-serif text-sm hover:underline"
              style={{ color: theme.colors.textSecondary }}
            >
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
