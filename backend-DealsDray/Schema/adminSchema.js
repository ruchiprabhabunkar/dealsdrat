const mongoose =require("mongoose")
const Schema =mongoose.Schema ;


const admin=new mongoose.Schema({
    fname:{
        type:String,
        // required:true
    },
    lname:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        required:true
    },
    
    phone:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        // required:true
    },
    token :{
        type:Array,
     },

},
{
    timestamps:true
}
)

const AdminSchema= mongoose.model('Admin',admin);
module.exports =AdminSchema;
