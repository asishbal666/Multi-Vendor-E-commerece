import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function VendorDashboard() {

  const navigate = useNavigate();
  const username = localStorage.getItem("username") || localStorage.getItem("customerId") || "Vendor";
  const vendorId = localStorage.getItem("vendorId");

  const [stats, setStats] = useState({
    myProducts: 0,
    myOrders: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      // Parallelize requests to speed up load time
      const [productsRes, ordersRes] = await Promise.all([
        api.get(`/products/getAllProductByVendorId/${1}`),
        api.get(`/vendors/getOrderByVendor/${vendorId}`),
      ]);

      const revenueData = Array.isArray(ordersRes.data)
        ? ordersRes.data.reduce((sum, o) => sum + o.totalAmount, 0)
        : 0;

      setStats({
        myProducts: Array.isArray(productsRes.data) ? productsRes.data.length : 0,
        myOrders: Array.isArray(ordersRes.data) ? ordersRes.data.length : 0,
        revenue: revenueData,
      });
    } catch (err) {
      console.error("Error fetching vendor stats", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ padding: "20px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ margin: 0 }}>Vendor Dashboard</h1>
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
              <h4>Your Products</h4>
              <div className="value">{stats.myProducts}</div>
            </div>

            <div className="stat-card">
              <h4>Your Orders</h4>
              <div className="value">{stats.myOrders}</div>
            </div>

            <div className="stat-card">
              <h4>Total Revenue</h4>
              <div className="value">₹ {stats.revenue}</div>
            </div>
          </div>
        </section>
      )}

      <hr style={{ margin: "1.25rem 0" }} />

      <h2>Quick Links</h2>

      <div className="quick-links">
        <ul>
          <li><Link to="/vendor/products">Manage My Products</Link></li>
          <li><Link to="/addProduct">Add New Product</Link></li>
          <li><Link to="/vendor/orders">View Orders</Link></li>
        </ul>
      </div>
    </main>
  );
}
