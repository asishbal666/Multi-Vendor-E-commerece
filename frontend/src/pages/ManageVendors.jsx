import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function ManageVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [viewingVendor, setViewingVendor] = useState(null);

  const [form, setForm] = useState({ shopName: "", ownerName: "", phone: "", address: "" });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const res = await api.get("/vendors");
      setVendors(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching vendors", err);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setForm({ shopName: "", ownerName: "", phone: "", address: "" });
  };

  const handleEdit = (v) => {
    setEditingId(v.id);
    setForm({ shopName: v.shopName || "", ownerName: v.ownerName || "", phone: v.phone || "", address: v.address || "" });
  };

  const handleView = (v) => setViewingVendor(v);

  const handleCancel = () => {
    setEditingId(null);
    setForm({ shopName: "", ownerName: "", phone: "", address: "" });
  };

  const handleSave = async () => {
    if (!form.shopName) return alert("Please provide shop name");
    try {
      if (editingId) {
        await api.put(`/vendors/${editingId}`, form);
        alert("Vendor updated");
      } else {
        await api.post("/vendors", form);
        alert("Vendor added");
      }
      handleCancel();
      fetchVendors();
    } catch (err) {
      console.error("Error saving vendor", err);
      alert("Failed to save vendor");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vendor?")) return;
    try {
      await api.delete(`/vendors/${id}`);
      alert("Vendor deleted");
      fetchVendors();
    } catch (err) {
      console.error("Error deleting vendor", err);
      alert("Failed to delete vendor");
    }
  };

  const filtered = vendors.filter((v) => {
    const t = search.toLowerCase();
    return (
      v.id?.toString().includes(t) ||
      v.shopName?.toLowerCase().includes(t) ||
      v.ownerName?.toLowerCase().includes(t) ||
      v.phone?.toLowerCase().includes(t)
    );
  });

  if (loading) return <h3>Loading vendors...</h3>;

  return (
    <main className="container" style={{ padding: "20px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ margin: 0 }}>Manage Vendors</h2>
        <Link to="/admin/dashboard" className="btn btn-ghost">Back to Dashboard</Link>
      </div>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ flex: 1 }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vendors..." />
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleAdd}>Add Vendor</button>
        </div>
      </div>

      {editingId !== null || (form.shopName !== "" && editingId === null) ? (
        <div className="card" style={{ marginBottom: 16 }}>
          <h3>{editingId ? `Edit Vendor (${editingId})` : "Add Vendor"}</h3>
          <div className="form-group">
            <label>Shop Name</label>
            <input value={form.shopName} onChange={(e) => setForm({ ...form, shopName: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Owner Name</label>
            <input value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button className="btn btn-primary" onClick={handleSave}>{editingId ? "Save" : "Create"}</button>
            <button className="btn btn-ghost" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : null}

      {viewingVendor && (
        <div className="card" style={{ marginBottom: 16 }}>
          <h3>Vendor Details</h3>
          <p><strong>ID:</strong> {viewingVendor.id}</p>
          <p><strong>Shop:</strong> {viewingVendor.shopName}</p>
          <p><strong>Owner:</strong> {viewingVendor.ownerName}</p>
          <p><strong>Phone:</strong> {viewingVendor.phone}</p>
          <p><strong>Address:</strong> {viewingVendor.address}</p>
          <div style={{ marginTop: 8 }}>
            <button className="btn btn-ghost" onClick={() => setViewingVendor(null)}>Close</button>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <p>No vendors found.</p>
      ) : (
        <div className="grid" style={{ gap: 12 }}>
          {filtered.map((v) => (
            <div key={v.id} className="card">
              <h4 style={{ margin: 0 }}>{v.shopName}</h4>
              <p className="muted" style={{ margin: "6px 0" }}>Owner: {v.ownerName} • Phone: {v.phone}</p>
              <p style={{ margin: "6px 0" }}>{v.address}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <div className="muted">ID: {v.id}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-ghost" onClick={() => handleView(v)}>View</button>
                  <button className="btn btn-primary" onClick={() => handleEdit(v)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(v.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
