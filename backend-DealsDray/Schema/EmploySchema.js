const mongoose =require("mongoose")
const Schema =mongoose.Schema ;

const EmploySchema=new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    
    MobileNo:{
        type:String,
        // required:true
    },
    Designation:{
        type:String,
        enum:["HR","Manager","sales"]
        // required:true
    },
    Gender:{
        type:String,
        enum:["Male","Female"]
        // required:true
    },
    Course:{
        type:String,
        enum:["MCA","BCA","BSC"]
        // required:true
    },
    Image:{
        type:String
    },

},
{
    timestamps:true
}
)

const Employ= mongoose.model('employ',EmploySchema);
module.exports =Employ;
