///import mongoose
const mongoose=require('mongoose');


const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    patient:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient'
    }]
});

const Doctor=mongoose.model('Doctor',doctorSchema);

module.exports=Doctor;