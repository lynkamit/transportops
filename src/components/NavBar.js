import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = ({ isAuthenticated, handleLogout = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to={isAuthenticated ? "/home" : "/"}>T</Link>
      </div>
      {isAuthenticated && (
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/invoices/new">Create Invoice</Link>
          <Link to="/invoices">Invoices</Link>
          <Link to="/clients/new">Create Client</Link>
          <Link to="/clients">Clients</Link>
        </div>
      )}
      <div className="nav-actions">
        {isAuthenticated ? (
          <button onClick={onLogout}>Logout</button>
        ) : (
          location.pathname !== "/login" && (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default NavBar;
