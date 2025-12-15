import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [vendors, setVendors] = useState([]);

  // Form state for add/edit
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    vendorId: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchVendors();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendors = async () => {
    try {
      const res = await api.get("/vendors");
      setVendors(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching vendors", err);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      vendorId: product.vendorId || "",
    });
  };

  const handleSaveEdit = async () => {
    if (!formData.title || !formData.price) {
      alert("Please fill in required fields");
      return;
    }

    try {
      await api.put(`/products/${editingId}`, {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        vendorId: formData.vendorId,
      });
      alert("Product updated successfully");
      setEditingId(null);
      setFormData({ title: "", description: "", price: "", vendorId: "" });
      fetchProducts();
    } catch (err) {
      console.error("Error updating product", err);
      alert("Failed to update product");
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await api.delete(`/products/${productId}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product", err);
      alert("Failed to delete product");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", price: "", vendorId: "" });
  };

  const filteredProducts = products.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.id.toString().includes(term) ||
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  });

  if (loading) return <h3>Loading products...</h3>;

  return (
    <div>
      <main className="container" style={{ padding: "20px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ margin: 0 }}>Manage Products</h2>
          <Link to="/vendor/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "1rem 0" }}>
          <div className="form-row" style={{ width: 320 }}>
            <input
              type="text"
              placeholder="Search products by ID, title, description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {editingId && (
          <div className="card" style={{ marginBottom: "1.5rem", padding: "1.5rem", background: "linear-gradient(180deg,var(--surface),#fbfdff)" }}>
            <h3>Edit Product (ID: {editingId})</h3>

            <div className="form-group">
              <label htmlFor="edit-title">Title</label>
              <input
                id="edit-title"
                type="text"
                placeholder="Product title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-desc">Description</label>
              <input
                id="edit-desc"
                type="text"
                placeholder="Product description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-price">Price</label>
              <input
                id="edit-price"
                type="number"
                placeholder="Product price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-vendor">Vendor</label>
              <select
                id="edit-vendor"
                value={formData.vendorId}
                onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })}
              >
                <option value="">-- Select Vendor --</option>
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.shopName}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
              <button className="btn btn-primary" onClick={handleSaveEdit}>
                Save Changes
              </button>
              <button className="btn btn-ghost" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid product-grid">
            {filteredProducts.map((p) => (
              <div key={p.id} className="card">
                <div style={{ marginBottom: "0.75rem" }}>
                  <h4 style={{ margin: "0 0 0.25rem 0" }}>{p.title}</h4>
                  <p className="muted" style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>
                    ID: {p.id}
                  </p>
                  <p style={{ margin: "0.5rem 0", fontSize: "0.95rem" }}>{p.description}</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                  <div className="amount">₹ {p.price}</div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(p)}
                      style={{ fontSize: "0.9rem", padding: "0.4rem 0.6rem" }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(p.id)}
                      style={{ fontSize: "0.9rem", padding: "0.4rem 0.6rem" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
