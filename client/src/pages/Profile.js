import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";

const Profile = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const userDataString = localStorage.getItem("iao-user");
  const userData = JSON.parse(userDataString);

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex flex-col pt-28" // Added padding-top to create space for the header
      style={{ backgroundColor: theme.colors.bgPrimary }}
    >
      <Header />
      <button
        onClick={handleBackClick}
        style={{
          backgroundColor: theme.colors.bgAccent,
          color: theme.colors.textPrimary,
        }}
      >
        Back to Home
      </button>
      <span style={{ color: theme.colors.textPrimary }}>
        {userData.username}
      </span>
    </div>
  );
};

export default Profile;
