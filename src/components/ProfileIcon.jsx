import React from "react";

const ProfileIcon = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src="https://via.placeholder.com/50"
        alt="User Profile"
        style={{
          borderRadius: "50%",
          marginRight: "10px",
          border: "2px solid #007bff",
        }}
      />
      <h3>Bienvenido al sistema académico!</h3>
    </div>
  );
};

export default ProfileIcon;
