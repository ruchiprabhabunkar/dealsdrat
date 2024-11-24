const Employ=require("../Schema/EmploySchema")

const createEmply=async(req,res)=>{
    try {
      const { name,email,MobileNo,Designation,Gender,Course } = req.body;
      const Image = req.file ? req.file.path : null;
      const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
      const phoneRegex=  /^\+[0-9\-\(\)\/\.\s]{6,15}[0-9]$/ ;
         if (!email) {
        return res.status(400).send({ msg: "Email is required" });
        } 
        else if (!emailRegex.test(email)) {
            return res.status(400).send({ msg: "Invalid email format" });
        }
        if (!phoneRegex.test(MobileNo)) {
            return res.status(400).send({ msg: "Invalid phone format" });
        }
        const userEmail = await Employ.findOne({ email:email });
        console.log(userEmail,"useremail");
    
        if (userEmail) {
          return res.status(400).send({ msg: "this email is already registered" });
        }
        
      
        
        const EmployData = { name,email,MobileNo,Designation,Gender,Course, Image:`http://localhost:9000/uploads/${req.file.filename}` };
       
        const saveEmploy = await Employ.create(EmployData);
    
    
        res.status(201).json({
          message: 'User registered successfully',
          employ: saveEmploy,
        });
      } catch (error) {
        console.error('employ not defined', error);
        
        res.status(500).json({
          message: 'Error creating user',
          error: error.message,
        });
      }
}
const getsingleEmploy=async(req,res)=>{
  try{
    const employId = req.params.id;
    const employ=await Employ.findById(employId);
    console.log(employ)
    res.status(201).send({msg:"employ get",employ});
  }
  catch (err) {
    console.log(err);
    res.status(500).send({ msg: "internal server error" });
  }
}
// const updatEmploy = async (req, res) => {
//   try {
//     const employId = req.params.id;
//     const { name,email,MobileNo,Designation,Gender,Course } = req.body;

//     const Image = req.file ? `http://localhost:9000/uploads/${req.file.filename}` : null;

//     const employ = await Employ.findById(employId);

//     console.log(employ);
//     if (!employ) {
//       return res.status(404).send({ msg: "employ not found" });
//     }
//     const updateitems = {
//       name,email,MobileNo,Designation,Gender,Course,Image:Image||employ.Image
//     };
//     const updatedEmploy = await Employ.findByIdAndUpdate(
//       { _id: employId },
//       updateitems,
//       { new: true }
//     );
//     res.status(200).send({ msg: "updated employ",employ, updatedEmploy });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ msg: "internal server error" });
//   }
// };
const updatEmploy = async (req, res) => {
  try {
    const employId = req.params.id;
    const { name, email, MobileNo, Designation, Gender, Course } = req.body;

    // If no new course is provided, use the existing course from the database
    const employ = await Employ.findById(employId);

    if (!employ) {
      return res.status(404).send({ msg: "Employee not found" });
    }

    const Image = req.file ? `http://localhost:9000/uploads/${req.file.filename}` : null;

    // Ensure that if no new Course is provided, the old course is retained
    const updateitems = {
      name,
      email,
      MobileNo,
      Designation,
      Gender,
      Course: Course ? Course : employ.Course, // Use existing Course if not provided
      Image: Image || employ.Image, // Use existing Image if not provided
    };

    const updatedEmploy = await Employ.findByIdAndUpdate(
      { _id: employId },
      updateitems,
      { new: true }
    );

    res.status(200).send({ msg: "Employee updated", updatedEmploy });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal server error" });
  }
};

const getAllEmploy=async(req,res)=>{
  const alldata=await Employ.find()
  res.status(201).send(alldata);
}


const deleteEmploy=async(req,res)=>{
  try{
    const EmployId=req.params.id;
    const deletedEmploy=await Employ.findOneAndDelete( {_id:EmployId},{new:true});
    res.status(200).send({msg:"deleted employ",deletedEmploy});   
  }
  catch(err){
    console.log(err)
    res.status(500).send({msg:"internal server error"})

  }
}



module.exports={createEmply,getsingleEmploy,updatEmploy,getAllEmploy,deleteEmploy}