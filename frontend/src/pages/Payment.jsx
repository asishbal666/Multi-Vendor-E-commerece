import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../api/axios";

export default function Payment() {
const location = useLocation();
const orderId = location.state?.orderId;


  useEffect(() => {
    createPayment();
  }, []);

  const loadScript = (src) => {
    return new Promise(resolve => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createPayment = async () => {

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed");
      return;
    }

    const response = await api.post(`/payment/create/${orderId}`);

    const options = {
      key: response.data.key,
      amount: response.data.amount,
      currency: "INR",
      name: "My E-Commerce",
      description: "Order Payment",
      order_id: response.data.razorpayOrderId,

      handler: async function (resp) {
        await api.post("/payment/success", {
          orderId: response.data.orderId,
          razorpay_payment_id: resp.razorpay_payment_id,
        });

        alert("Payment Successful!");
        window.location.href = "/orders";
      },

      theme: {
        color: "#3399cc"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <h2>Redirecting to Payment...</h2>
    </div>
  );
}
