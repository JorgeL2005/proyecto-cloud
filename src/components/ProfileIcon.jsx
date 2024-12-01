import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileIcon = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/home/profile"); // Redirige a la página de Perfil
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={handleProfileClick}
    >
      <img
        src="https://via.placeholder.com/50"
        alt="User Profile"
        style={{
          borderRadius: "50%",
          marginRight: "10px",
          border: "2px solid #007bff",
        }}
      />
    </div>
  );
};

export default ProfileIcon;
