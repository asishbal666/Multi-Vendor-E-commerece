import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function VendorOrders() {
  const vendorId = localStorage.getItem("vendorId");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendorOrders();
  }, []);

  const fetchVendorOrders = async () => {
    setLoading(true);
    try { debugger
      const res = await api.get(`/vendors/getOrderByVendor/${vendorId}`);
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching vendor orders", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const statusClass = (status = "") => {
    const s = String(status).toLowerCase();
    if (s === "pending") return "status-badge status-pending";
    if (s === "shipped") return "status-badge status-shipped";
    if (s === "delivered") return "status-badge status-delivered";
    if (s === "cancelled") return "status-badge status-cancelled";
    return "status-badge";
  };

  if (loading) return <h3>Loading vendor orders...</h3>;

  return (
    <main className="container" style={{ padding: "20px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ margin: 0 }}>Vendor Orders</h2>
        <Link to="/vendor/dashboard" className="btn btn-ghost">Back to Dashboard</Link>
      </div>

      {orders.length === 0 ? (
        <p>No orders found for this vendor.</p>
      ) : (
        <div className="card">
          <table className="orders-table" aria-label="Vendor orders table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product.title}</td>
                    <td>{item.quantity}</td>
                    <td>₹ {item.price}</td>
                    <td>    <span className={statusClass(item.status)}>
                      {item.order.status}
                    </span></td>
                    <td>{new Date(item.order.createdAt).toLocaleString()}</td>
                  </tr>
              ))
              }
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
