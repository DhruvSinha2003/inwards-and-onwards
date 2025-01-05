// src/pages/Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSelector from "../components/ThemeSelector";
import { useTheme } from "../contexts/ThemeContext";

const Register = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          Create Account
        </h2>

        <form className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
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
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              placeholder="Password"
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
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="w-full py-3 rounded-md font-serif tracking-wide text-lg transition-colors duration-300 hover:opacity-90"
            style={{
              backgroundColor: theme.colors.buttonBg,
              color: theme.colors.buttonText,
            }}
          >
            Create Account
          </button>

          <div className="text-center mt-6">
            <Link
              to="/login"
              className="font-serif text-sm hover:underline"
              style={{ color: theme.colors.textSecondary }}
            >
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
