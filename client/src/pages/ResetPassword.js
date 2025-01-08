import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import api from "../utils/api";

const ResetPassword = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      setError("Invalid reset link");
      return;
    }
    setToken(tokenParam);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.post("api/auth/reset-password", {
        token,
        newPassword: password,
      });

      setSuccess(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: theme.colors.bgPrimary }}
    >
      <div
        className="w-full max-w-md p-8 rounded-lg shadow-lg"
        style={{ backgroundColor: theme.colors.surfacePrimary }}
      >
        <h2
          className="text-3xl font-serif mb-8 text-center"
          style={{ color: theme.colors.textPrimary }}
        >
          Set New Password
        </h2>

        {error && (
          <div
            className="p-3 rounded-md text-center mb-4"
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
            className="p-3 rounded-md text-center mb-4"
            style={{
              backgroundColor: theme.colors.success,
              color: theme.colors.buttonText,
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md font-serif border-2"
              style={{
                backgroundColor: theme.colors.inputBg,
                color: theme.colors.inputText,
                borderColor: theme.colors.inputBorder,
              }}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                Setting New Password...
              </div>
            ) : (
              "Set New Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
