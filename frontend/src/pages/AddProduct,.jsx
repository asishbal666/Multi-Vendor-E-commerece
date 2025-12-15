import { useState, useEffect } from "react";
import api from "../api/axios";

export default function AddProduct() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const res = await api.get("/vendors");
    setVendors(res.data); // Must be an array
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!selectedVendor) {
      alert("Please select a vendor");
      return;
    }

    const product = {
      title,
      description: desc,
      price,
      vendorId: selectedVendor,
    };

    console.log("Final Product Payload:", product);

    const res = await api.post("/products", product);
    alert("Product added successfully");

    // Optional: Clear fields
    setTitle("");
    setDesc("");
    setPrice("");
    setSelectedVendor("");
  };

  return (
    <div>
      <h2>Add Product</h2>

      <form onSubmit={handleAddProduct}>
        Product Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />

        Product Desc:
        <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <br />

        Price:
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        <br />

        Vendor:
        <select
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.target.value)}
          style={{ marginLeft: "10px", padding: "6px" }}
        >
          <option value="">-- Select Vendor --</option>
          {Array.isArray(vendors) &&
            vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.shopName }
              </option>
            ))}
        </select>

        <br />
        <button type="submit" style={{ marginTop: "20px" }}>
          Add Product
        </button>
      </form>
    </div>
  );
}
