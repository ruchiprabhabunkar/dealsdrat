
const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}



// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Use the absolute path to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Only JPG and PNG files are allowed!"), false); // Reject file
  }
};

const upload = multer({ storage: storage ,fileFilter:fileFilter});

// Controller and Middleware
const { createEmply,getsingleEmploy, updatEmploy,deleteEmploy,getAllEmploy, } = require("../Controller/Employ");
const { authenticateadmin } = require("../Middleware/adminauth");

// Route for creating an employee with file upload
route.post("/create", authenticateadmin, upload.single("Image"), createEmply);
route.get("/getsingle/:id", authenticateadmin,getsingleEmploy);

route.put("/update/:id", authenticateadmin, upload.single("Image"), updatEmploy);
route.delete("/delete/:id", authenticateadmin, deleteEmploy);
route.get("/getAll", authenticateadmin, getAllEmploy);

module.exports = route;
