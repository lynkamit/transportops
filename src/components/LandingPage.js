import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Welcome to TransportOps</h1>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default LandingPage;
