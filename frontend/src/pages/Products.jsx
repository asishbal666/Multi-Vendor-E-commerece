import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  
  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  const addToCart = async (p) => {debugger
    await api.post("/cart/add", {
      customerId: localStorage.getItem("customerId"),
      product: p,
      quantity: 1
    });
    alert("Added to cart");
  };

  return (
    <div>
      <Navbar />
      <main className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "1rem 0" }}>
          <h2>Products</h2>
          <div className="form-row" style={{ width: 320 }}>
            <input
              type="text"
              placeholder="Search products by ID, title, description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid product-grid">
          {products
            .filter((p) => {
              const term = search.toLowerCase();
              return (
                p.id.toString().includes(term) ||
                p.title.toLowerCase().includes(term) ||
                p.description.toLowerCase().includes(term)
              );
            })
            .map((p) => (
              <div key={p.id} className="card">
                <h3>{p.title}</h3>
                <p className="muted">{p.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem" }}>
                  <div>
                    <div className="amount">₹{p.price}</div>
                  </div>
                  <div>
                    <button className="btn btn-primary" onClick={() => addToCart(p)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
