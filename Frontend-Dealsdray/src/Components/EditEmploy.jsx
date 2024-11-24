import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./edit.css"
const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    MobileNo: "",
    Designation: "",
    Gender: "",
    Course: "",
    Image: "", // Store the existing image URL
  });
  const [imageFile, setImageFile] = useState(null); // File for upload
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(
          `http://localhost:9000/employ/getsingle/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployee({
          ...data.employ,
          Course: (data.employ.Course) ? data.employ.Course : [],
        });
        console.log(data,"employ");
        
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee data", error);
        alert("Failed to fetch employee details.");
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === "checkbox" && name === "Course") {
      setEmployee((prev) => ({
        ...prev,
        Course: checked
          ? [...prev.Course, value] // Add the checked course
          : prev.Course.filter((course) => course !== value), // Remove the unchecked course
      }));
    } else {
      setEmployee((prev) => ({ ...prev, [name]: value })); // Dynamically update the field
    }
  };
  
  
  
  
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setEmployee((prev) => ({
      ...prev,
      Image: file ? URL.createObjectURL(file) : prev.Image, // Use preview or fallback
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("name", employee.name);
      formData.append("email", employee.email);
      formData.append("MobileNo", employee.MobileNo);
      formData.append("Designation", employee.Designation);
      formData.append("Gender", employee.Gender);
      formData.append("Course", employee.Course); // Serialize array
      if (imageFile) formData.append("Image", imageFile); // Only append new file

      await axios.put(
        `http://localhost:9000/employ/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Employee updated successfully!");
      navigate("/employee-list");
    } catch (error) {
      console.error("Error updating employee", error);
      alert("Failed to update employee details.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div  className="edit-employee">
   
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="MobileNo"
          placeholder="Mobile No"
          value={employee.MobileNo}
          onChange={handleChange}
        />
        <select
          name="Designation"
          value={employee.Designation}
          onChange={handleChange}
        >
          <option value="">Select Designation</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
        <div>
  <label>
    <input
      type="checkbox"
      name="Course"
      value="MCA"
      checked={employee.Course.includes("MCA")}
      onChange={handleChange}
    />
    MCA
  </label>
  <label>
    <input
      type="checkbox"
      name="Course"
      value="BCA"
      checked={employee.Course.includes("BCA")}
      onChange={handleChange}
    />
    BCA
  </label>
  <label>
    <input
      type="checkbox"
      name="Course"
      value="BSC"
      checked={employee.Course.includes("BSC")}
      onChange={handleChange}
    />
    BSC
  </label>
</div>


        <select
          name="Gender"
          value={employee.Gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <div>
          <label>Upload Image:</label>
          <input type="file" name="Image" onChange={handleImageChange} />
          {employee.Image && (
            <img
              src={employee.Image}
              alt="Preview"
              style={{ width: "100px", height: "100px", marginTop: "10px" }}
            />
          )}
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditEmployee;
