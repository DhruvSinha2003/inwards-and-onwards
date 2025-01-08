// Updated ForgotPassword.js with email service
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSelector from "../components/ThemeSelector";
import { useTheme } from "../contexts/ThemeContext";
import api from "../utils/api";

const ForgotPassword = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.post("api/auth/forgot-password", { email });
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to process request");
    } finally {
      setIsLoading(false);
    }
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div
              className="p-3 rounded-md text-center"
              style={{
                backgroundColor: theme.colors.error,
                color: theme.colors.buttonText,
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              className="p-3 rounded-md text-center"
              style={{
                backgroundColor: theme.colors.success,
                color: theme.colors.buttonText,
              }}
            >
              {success}
            </div>
          )}

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
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-md font-serif tracking-wide text-lg transition-colors duration-300 hover:opacity-90"
            style={{
              backgroundColor: theme.colors.buttonBg,
              color: theme.colors.buttonText,
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending Reset Link...
              </div>
            ) : (
              "Send Reset Link"
            )}
          </button>

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
