import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Replace with real authentication
    if (username && password) {
      localStorage.setItem("authToken", "your_token");
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Login to TransportOps</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username or Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <div className="login-links">
        <Link to="/">Home Page</Link>
        <Link to="/forgot-password">Forgot Password?</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
