const express = require("express");
const route=express.Router();


const {createAdmin,adminLogin,logout} = require("../Controller/admin") 
const {authenticateadmin} =  require("../Middleware/adminauth")

route.post("/superAdmin" ,createAdmin)
route.post("/login" ,adminLogin)
// route.post("/create",authenticateadmin ,Creater)
route.post("/logout",authenticateadmin, logout)


module.exports = route 
