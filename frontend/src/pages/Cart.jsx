import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const customerId = Number(localStorage.getItem("customerId"));
  const [search, setSearch] = useState("");

  const navigate=useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove =async(cartItemId) =>{
    const res= await api.delete(`/cart/remove/${cartItemId}`)
    fetchCart();
  };
  const fetchCart = async () => {
 
    const res = await api.get(`/cart/${customerId}`);
    setCart(res.data);
  };

  const increaseQty = async (item) => {
    await api.put(`/cart/increase/${item.cartItemId}`);
    fetchCart();
  };

  const decreaseQty = async (item) => {
    if (item.quantity <= 1) return;
    await api.put(`/cart/decrease/${item.cartItemId}`);
    fetchCart();
  };

  const toggleSelect = (item) => {
    if (selectedItems.find(i => i.cartItemId === item.cartItemId)) {
      setSelectedItems(prev =>
        prev.filter(i => i.cartItemId !== item.cartItemId)
      );
    } else {
      setSelectedItems(prev => [...prev, item]);
    }
  };

  const placeOrder = async () => {

    if (selectedItems.length === 0) {
      alert("Select at least one item");
      return;
    }

    const order = { 
      customerId,
      items: selectedItems.map(i => ({
        productId: i.product.id,
        quantity: i.quantity,
        price: i.product.price
      }))
    };
   console.log(order)
   const res= await api.post("/orders/place", order);debugger
   const orderId=res.data;
    alert("Order placed successfully ✅");
    navigate("/payment", { state: { orderId } });
    // setSelectedItems([]);
    // fetchCart();
  };
const totalAmount = selectedItems.reduce((total, item) => {
    const price = Number(item.product?.price) || 0;
    const qty = Number(item.quantity) || 0;
    return total + price * qty;
  }, 0);
  if (!cart) return <h3>Loading cart...</h3>;
  return (
    <div>
      <Navbar />
      <main className="container">
        <h2>Your Cart</h2>

        {cart.items.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <div className="cart-list">
            {cart.items.map((item) => (
              <div key={item.cartItemId} className="card cart-item">
                <div className="cart-item-info">
                  <h4>{item.product.title}</h4>
                  <p className="muted">₹ {item.product.price}</p>
                </div>

                <div className="cart-item-qty">
                  <button className="btn btn-ghost" onClick={() => decreaseQty(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="btn btn-ghost" onClick={() => increaseQty(item)}>+</button>
                </div>

                <div className="amount">₹ {item.product.price * item.quantity}</div>

                <div>
                  <label className="muted">
                    <input
                      type="checkbox"
                      checked={selectedItems.some(i => i.cartItemId === item.cartItemId)}
                      onChange={() => toggleSelect(item)}
                    />{' '}
                    Select
                  </label>
                </div>

                <div>
                  <button className="btn btn-danger" onClick={() => handleRemove(item.cartItemId)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedItems.length > 0 && (
          <div className="card cart-footer">
            <div className="muted">Total items: {selectedItems.length}</div>
            <div className="text-right">
              <h5>Total amount: ₹{totalAmount}</h5>
              <button className="btn btn-primary" onClick={placeOrder}>Place Order ({selectedItems.length})</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
