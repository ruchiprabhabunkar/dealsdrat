import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './navbar.css'
function Navbar() {
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

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:9000/admin/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar"> 
        <div className="navbar-left">
          <span className="welcome-text" >Welcome,  {adminName}</span>
        </div>
        <div className="navbar-right">
          <Link to="/employee-list" className="nav-link">
            Employee List
          </Link>
          <Link to="/create-employee" className="nav-link">
            Create Employee
          </Link>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
