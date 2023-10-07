//import mongoose
const { timeStamp } = require('console');
const mongoose=require('mongoose');

//schema for Project
const projectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true,
        unique:true
    },
    PP:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ProjectProfile'
    }]
},{timestamps:true});


//make it as model
const Project=mongoose.model('Project',projectSchema);


//export Project
module.exports=Project;