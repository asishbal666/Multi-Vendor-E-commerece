import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";

export default function CustomerDashboard() {

  const userId = localStorage.getItem("customerId");

  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const orders = await api.get(`/orders/customer/${userId}`);

      const orderList = Array.isArray(orders.data) ? orders.data : [];
      const pending = orderList.filter(o => o.status === "PENDING").length;
      const delivered = orderList.filter(o => o.status === "DELIVERED").length;

      setStats({
        totalOrders: orderList.length,
        pendingOrders: pending,
        deliveredOrders: delivered,
      });
    } catch (err) {
      console.error("Error fetching customer stats", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="container" style={{ padding: "20px 16px" }}>
        <h1>Customer Dashboard</h1>

      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <section className="admin-stats">
          <div className="stat-grid">
            <div className="stat-card">
              <h4>Total Orders</h4>
              <div className="value">{stats.totalOrders}</div>
            </div>

            <div className="stat-card">
              <h4>Pending Deliveries</h4>
              <div className="value">{stats.pendingOrders}</div>
            </div>

            <div className="stat-card">
              <h4>Delivered Orders</h4>
              <div className="value">{stats.deliveredOrders}</div>
            </div>
          </div>
        </section>
      )}

      <hr style={{ margin: "1.25rem 0" }} />

      <h2>Quick Links</h2>

      <div className="quick-links">
        <ul>
          <li><Link to="/products">Browse Products</Link></li>
          <li><Link to="/cart">Go to Cart</Link></li>
          <li><Link to="/orders">My Orders</Link></li>
        </ul>
      </div>
      </main>
    </div>
  );
}
