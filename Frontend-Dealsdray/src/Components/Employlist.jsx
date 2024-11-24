import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./list.css"
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:9000/employ/getAll", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:9000/employ/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees((prevState) =>
        prevState.filter((employee) => employee._id !== id)
      );
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  return (
    <div className="employee-list-container">
     
      <table className="employee-table">
        <thead>
          <tr>
            <th>UniqueId</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>
                <img src={employee.Image} alt="profileimg" className="employee-img" />
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.MobileNo}</td>
              <td>{employee.Designation}</td>
              <td>{employee.Gender}</td>
              <td>{employee.Course}</td>
              <td className="">
                <div className="button">
                <Link to={`/edit-employee/${employee._id}`} className="edit-btn">
                  Edit
                </Link>
                <button onClick={() => handleDelete(employee._id)} className="delete-btn">
                  Delete
                </button>
                </div>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
