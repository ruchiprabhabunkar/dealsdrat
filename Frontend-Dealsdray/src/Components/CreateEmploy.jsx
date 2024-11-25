import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./create.css";

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    Course: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setEmployee((prev) => ({
      ...prev,
      Course: checked ? value : "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Set the preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("MobileNo", employee.mobileNo);
    formData.append("Designation", employee.designation);
    formData.append("Gender", employee.gender);
    formData.append("Course", employee.Course);
    if (imageFile) formData.append("Image", imageFile);

    try {
      const response = await axios.post(
        "http://localhost:9000/employ/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response, "create employ");
      alert("Employee created successfully!");
      navigate("/employee-list");
    } catch (error) {
      console.error("Error creating employee:", error.response || error.message);
      alert("Failed to create employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-employee-container">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="mobileNo"
            placeholder="Mobile No"
            value={employee.mobileNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <select
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            required
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="sales">Sales</option>
          </select>
        </div>
        <div className="form-group checkboxes">
          <label>
            <input
              type="checkbox"
              name="Course"
              value="MCA"
              checked={employee.Course === "MCA"}
              onChange={handleCheckboxChange}
            />
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              name="Course"
              value="BCA"
              checked={employee.Course === "BCA"}
              onChange={handleCheckboxChange}
            />
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              name="Course"
              value="BSC"
              checked={employee.Course === "BSC"}
              onChange={handleCheckboxChange}
            />
            BSC
          </label>
        </div>

        <div className="form-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={employee.gender === "Male"}
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={employee.gender === "Female"}
              onChange={handleChange}
              required
            />
            Female
          </label>
        </div>

        <div className="form-group">
          <label>Upload Image:</label>
          <input type="file" name="Image" onChange={handleImageChange} />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Creating..." : "Create Employee"}
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
