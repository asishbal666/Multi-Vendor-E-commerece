import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      let res;
      if (role === "CUSTOMER") {
        res = await api.get(`/orders/customer/${customerId}`);
      } else if (role === "ADMIN") {
        res = await api.get(`/orders/getAll`);
      }

      if (res && Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status?status=${newStatus}`);
      const updated = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updated);
    } catch (error) {
      console.error("Error updating status", error);
      alert("Failed to update status");
    }
  };

  if (loading) return <h2>Loading orders...</h2>;

  return (
    <div>
      <Navbar />
      <main className="container">
        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="card">
            <table className="orders-table" aria-label="Orders table">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Created At</th>
                  {role === 'ADMIN' && <th>Update Status</th>}
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>₹ {order.totalAmount}</td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    {role === "ADMIN" && (
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
