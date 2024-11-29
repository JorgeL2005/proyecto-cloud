import React from "react";
import { useNavigate } from "react-router-dom";

const BackToHomeButton = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <button onClick={handleGoHome} style={{ margin: "20px 0", padding: "10px 15px", cursor: "pointer" }}>
      Back to Home
    </button>
  );
};

export default BackToHomeButton;
