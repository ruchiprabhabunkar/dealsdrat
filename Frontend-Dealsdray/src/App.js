import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import EmployeeList from "./Components/Employlist";
import EditEmployee from "./Components/EditEmploy";
import CreateEmployee from "./Components/CreateEmploy";
import Navbar from "./Components/navbar";
// import { Navigate } from "react-router-dom";
// Layout for pages with Navbar
const LayoutWithNavbar = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);
// const ProtectedRoute = ({ isLoggedIn, children }) => {
//   return isLoggedIn ? children : <Navigate to="/" />;
// };


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

  // Check login state on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
        />

        {/* Routes with Navbar */}
           {isLoggedIn ? (
          <>
            <Route
              path="/dashboard"
              element={
                <LayoutWithNavbar>
                  <Dashboard />
                </LayoutWithNavbar>
              }
            />
            <Route
              path="/employee-list"
              element={
                <LayoutWithNavbar>
                  <EmployeeList />
                </LayoutWithNavbar>
              }
            />
            <Route
              path="/create-employee"
              element={
                <LayoutWithNavbar>
                  <CreateEmployee />
                </LayoutWithNavbar>
              }
            />
            <Route
              path="/edit-employee/:id"
              element={
                <LayoutWithNavbar>
                  <EditEmployee />
                </LayoutWithNavbar>
              }
            />
          </>
        ) : (
          <Route path="*" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
