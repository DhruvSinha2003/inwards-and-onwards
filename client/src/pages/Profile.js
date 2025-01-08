import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleBackClick}>Back</button>
      <h1>Profile Page</h1>
    </div>
  );
};

export default Profile;
