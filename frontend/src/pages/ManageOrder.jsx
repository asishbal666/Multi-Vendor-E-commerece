import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function ManageOrder() {
  const [orders, setOrders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState("");

  useEffect(() => {
    fetchVendors();
    fetchOrders();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await api.get("/vendors");
      setVendors(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching vendors", err);
    }
  };

  const fetchOrders = async (vendorId) => {
    setLoading(true);
    try {
      let res;
      if (vendorId) {
        res = await api.get(`/vendors/getOrderByVendor/${vendorId}`);
      } else {
        res = await api.get("/orders/getAll");
      }
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching orders", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVendorChange = (e) => {
    const v = e.target.value;
    setSelectedVendor(v);
    fetchOrders(v);
  };

  const updateStatus = async (orderId, newStatus) => {debugger
    try {
      await api.put(`/orders/${orderId}/status?status=${newStatus}`);
      setOrders((prev) => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error("Error updating status", err);
      alert("Failed to update status");
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

  if (loading) return <h3>Loading orders...</h3>;

  return (
    <main className="container" style={{ padding: "20px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ margin: 0 }}>Manage Orders</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <label className="muted">Filter by vendor:</label>
          <select value={selectedVendor} onChange={handleVendorChange}>
            <option value="">All vendors</option>
            {vendors.map(v => (
              <option key={v.id} value={v.id}>{v.shopName}</option>
            ))}
          </select>
          <Link to="/admin/dashboard" className="btn btn-ghost">Back</Link>
        </div>
      </div>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="card">
          <table className="orders-table" aria-label="All orders">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Vendor</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.vendorName ?? order.vendor?.shopName ?? "-"}</td>
                  <td>{order.customerId ?? order.customer?.id ?? "-"}</td>
                  <td>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {Array.isArray(order.items) && order.items.length > 0 ? (
                        order.items.map((it, idx) => (
                          <div key={idx} style={{ fontSize: "0.95rem" }}>
                            {it.product?.title ?? it.productName ?? "Product"} — {it.quantity} × ₹{it.price}
                          </div>
                        ))
                      ) : (
                        <span className="muted">No items</span>
                      )}
                    </div>
                  </td>
                  <td>₹ {order.totalAmount ?? order.items?.reduce((t, i) => t + (i.price || 0) * (i.quantity || 0), 0)}</td>
                  <td>
                    <span className={statusClass(order.status)}>{order.status}</span>
                  </td>
                  <td>{order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}</td>
                  <td>
                    <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}>
                      <option value="PENDING">PENDING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
