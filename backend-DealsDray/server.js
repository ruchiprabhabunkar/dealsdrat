const express = require("express");
const app = express();
console.log("ecommmerce_backend");
require("dotenv").config();
require("./config/db").connectDB(); //  database connection 
// const multer = require("multer");
const cors = require("cors");
app.use(cors());
// const fs = require('fs');
const path = require('path');

// const uploadPath =  path.join(__dirname, 'ProfileImage');

// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true });
// }

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// BodyParser

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(multer().any());


//Router


app.use("/admin",require("./Route/adminroute"))
app.use("/employ",require("./Route/employroute"))
// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


