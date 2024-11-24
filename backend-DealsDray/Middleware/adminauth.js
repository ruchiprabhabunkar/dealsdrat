const jwt = require('jsonwebtoken');
const Admin = require('../Schema/adminSchema');
require("dotenv").config() ;

// Middleware to authenticate the token
const authenticateadmin = async (req, res, next) => {
    const authHeader = req.header('authorization')
    
    
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token ,"token111");
    
  
  if (!token) {
    return res.status(401).json({ status: false, message: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    const admin = await Admin.findById(decoded._id);
  
  
    if (!admin) {
      return res.status(401).json({ status: false, message: 'Admin not found' });
    }

    if (!admin.token.includes(token)) {
      return res.status(401).json({ status: false, message: 'Token is not valid' });
    }
    
    req.admin = admin;
    
   
    next();
  }
  
  catch (error) {
    return res.status(403).json({ status: false, message: 'Token verification failed' });
  }
};


module.exports = {authenticateadmin};
