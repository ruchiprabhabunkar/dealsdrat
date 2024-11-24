const adminSchema=require("../Schema/adminSchema")
const Employ=require("../Schema/EmploySchema")
const bcrypt=require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken")


const createAdmin = async (req, res) => {
    const {  fname, lname, email,  phone,password,} = req.body;

    const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
    const phoneRegex=  /^\+[0-9\-\(\)\/\.\s]{6,15}[0-9]$/ ;
    
    try {
        console.log("email:",email)
        if (!email) {
        return res.status(400).send({ msg: "Email is required" });
        } 
        else if (!emailRegex.test(email)) {
            return res.status(400).send({ msg: "Invalid email format" });
        }
        if (!phoneRegex.test(phone)) {
            return res.status(400).send({ msg: "Invalid phone format" });
        }
        
        const userEmail = await adminSchema.findOne({ email })
        if (userEmail) {
            return res.status(409).send({ msg: "Email is already registered" });
        }
    
        if (!password) {
            return res.status(400).send({ msg: "Password is required" });
        }
     
        
        const salt=10;
        const hashedPassword = await bcrypt.hash(password, salt);
        const data = {
            fname, 
            lname, 
            email, 
            password :hashedPassword , 
            phone
              
        };  
        const admin = await adminSchema.create(data);
        res.status(201).send({ status:true,msg: "Success", data: admin });
    } 
    catch (error) {
        console.error(error);
        res.status(500).send({status:false, msg: error});
    }
};

const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password, "email-password");
  
      // Find the user by email
      const registerAdmin = await adminSchema.findOne({ email });
      console.log(registerAdmin);
  
      // If admin does not exist
      if (!registerAdmin) {
        return res.status(400).send({ msg: "Admin not found" });
      }
      const id = registerAdmin._id;
      console.log(id, "id");
  
      // Compare passwords
      const adminPassword = await bcrypt.compare(password, registerAdmin.password);
      console.log(adminPassword);
  
      // If password matches
      if (adminPassword) {
        // Generate a token
        const token = jwt.sign({ _id: id }, process.env.SECRET_KEY);
        
        registerAdmin.token = registerAdmin.token || [];

        registerAdmin.token.push(token);
        await registerAdmin.save();
        res.status(200).send({
          status: true,
          msg: "Admin login successfully",
          data: { adminId: id,name:registerAdmin.fname + " "+registerAdmin.lname, token: token }
        });

      } else {
        res.status(400).send({ msg: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login Error: ", error);
      res.status(500).send({ msg: "Internal Server Error" });
    }
  };
  const logout = async (req, res) => {
    try {

      const token = req.header('authorization').split(" ")[1];
      console.log(token,"token");
      
    console.log(req.admin,"admin object");
    
      // Remove the token from the Admin token array
      req.admin.token = req.admin.token.filter((AdminToken) => AdminToken !== token);
  
      await req.admin.save();
  
      res.status(200).json({ status: true, message: "Logout successfully" });
    } catch (error) {
      res.status(500).json({ status: false, message: "Server error", error });
    }
  };
module.exports={createAdmin,adminLogin,logout}