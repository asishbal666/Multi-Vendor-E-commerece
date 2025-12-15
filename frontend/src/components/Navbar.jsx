import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const username= localStorage.getItem("username");
  const customerId = localStorage.getItem("customerId");


  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  

  return (
    <header className="navbar container">
      <div className="nav-left">
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/cart" className="nav-link">Cart</Link>
        <Link to="/orders" className="nav-link">Orders</Link>
        {role === "ADMIN" && (
          <Link to="/addProduct" className="nav-link">Add Products</Link>
        )}
      </div>

      <div className="nav-actions">
        <div className="user-badge" title={`Logged in as ${username}`}>
          <div className="avatar" aria-hidden>
            {String(username).charAt(0).toUpperCase()}
          </div>
          <div className="username">{username}</div>
          <button
            className="logout-btn"
            onClick={logout}
            aria-label="Logout"
            title="Logout"
          >
            <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M10 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M15 12H3" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
