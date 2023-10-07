//import mongoose
const mongoose=require('mongoose');

const patientSchema=new mongoose.Schema({
    name:{
        type:String
      
    },
    Patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient'
    },
    status:{
        type:String
        
    }
},{timestamps:true});

const PatientReport=mongoose.model('PatientReport',patientSchema);


module.exports=PatientReport;