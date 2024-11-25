import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:9000/admin/login", {
        email,
        password,
      });

      if (response.data.status) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("adminId", response.data.data.adminId);
        localStorage.setItem("adminName", response.data.data.name);
        navigate("/dashboard");
        onLogin();
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("incorrect email password");
    }
  };

  return (
    <div className="login-wrapper">
    <div className="login-container">
      <h2>Admin Login</h2>
      <div className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
    </div>
  );
};

export default Login;
