import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();
  const username = localStorage.getItem("username") || localStorage.getItem("customerId") || "Admin";

  const [stats, setStats] = useState({
    totalVendors: 0,
    totalOrders: 0,
    totalProducts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      // Run the three requests in parallel so total wait equals the slowest one,
      // instead of summing each request time (which happens with sequential await).
      const [vendorsRes, ordersRes, productsRes] = await Promise.all([
        api.get("/vendors"),
        api.get("/orders/getAll"),
        api.get("/products"),
      ]);

      setStats({
        totalVendors: Array.isArray(vendorsRes.data) ? vendorsRes.data.length : 0,
        totalOrders: Array.isArray(ordersRes.data) ? ordersRes.data.length : 0,
        totalProducts: Array.isArray(productsRes.data) ? productsRes.data.length : 0,
      });
    } catch (err) {
      console.error("Error fetching admin stats", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ padding: "20px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
        <div className="user-badge">
          <div className="avatar">{String(username).charAt(0).toUpperCase()}</div>
          <div className="username">{username}</div>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
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

      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <section className="admin-stats">
          <div className="stat-grid">
            <div className="stat-card">
              <h4>Total Vendors</h4>
              <div className="value">{stats.totalVendors}</div>
            </div>

            <div className="stat-card">
              <h4>Total Products</h4>
              <div className="value">{stats.totalProducts}</div>
            </div>

            <div className="stat-card">
              <h4>Total Orders</h4>
              <div className="value">{stats.totalOrders}</div>
            </div>
          </div>
        </section>
      )}

      <hr style={{ margin: "1.25rem 0" }} />

      <h2>Quick Links</h2>

      <div className="quick-links">
        <ul>
          <li><Link to="/admin/vendors">Manage Vendors</Link></li>
          <li><Link to="/admin/orders">Manage Orders</Link></li>
          <li><Link to="/addProduct">Add Product</Link></li>
        </ul>
      </div>
    </main>
  );
}
