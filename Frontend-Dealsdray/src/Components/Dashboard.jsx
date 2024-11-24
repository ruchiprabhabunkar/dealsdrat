import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css"
const Dashboard = () => {
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("adminName");
    if (!name) {
      navigate("/");
    } else {
      setAdminName(name);
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h2>Admin Panel</h2>
        <p>Welcome to the admin dashboard, {adminName}!</p>
      </div>
    </div>
  );
};

export default Dashboard;
