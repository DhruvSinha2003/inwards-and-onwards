// pages/Home.js
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const Home = () => {
  const { theme } = useTheme();

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: theme.colors.bgPrimary }}
    >
      <h1
        className="text-4xl font-serif"
        style={{ color: theme.colors.textPrimary }}
      >
        Welcome Home
      </h1>
    </div>
  );
};

export default Home;
