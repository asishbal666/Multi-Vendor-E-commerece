import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
      role
    };

    console.log("Register Payload:", user);
    try {
      await api.post("/auth/register", user);
      alert("User registered successfully!");
    }
    catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
      return;
    }
  };

  return (
    <div>
      <h2>Register Page</h2>

      <form onSubmit={handleSubmit}>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />

        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="CUSTOMER">CUSTOMER</option>
          <option value="VENDOR">VENDOR</option>
        </select>
        <br />


        <button type="submit">Register</button>
      </form>
    </div>
  );
}
