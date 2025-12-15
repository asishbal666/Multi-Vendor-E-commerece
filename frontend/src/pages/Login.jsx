import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [req, setReq] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {debugger
    try {
      setError("");
      let res = await api.post("/auth/login", req);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("customerId", res.data.userId);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.username);
      if(res.data.role==="VENDOR"){
        const vendorRes=await api.get(`/vendors/getVendorByUser/${res.data.userId}`);
        localStorage.setItem("vendorId", vendorRes.data.id);
        navigate("/vendor/dashboard");
      }
      if(res.data.role==="CUSTOMER"){
        navigate("/customer/dashboard");
      }
      if(res.data.role==="ADMIN"){
        navigate("/admin/dashboard");
      }

    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") login();
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2>Welcome Back</h2>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={req.username}
            onChange={(e) => setReq({ ...req, username: e.target.value })}
            onKeyPress={handleKeyPress}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={req.password}
            onChange={(e) => setReq({ ...req, password: e.target.value })}
            onKeyPress={handleKeyPress}
          />
        </div>

        {error && <p style={{ color: "var(--danger)", fontSize: "0.9rem", margin: "0.5rem 0" }}>{error}</p>}

        <button className="btn btn-primary" onClick={login} style={{ width: "100%", marginTop: "1rem" }}>
          Login
        </button>
      </div>
    </div>
  );
}
