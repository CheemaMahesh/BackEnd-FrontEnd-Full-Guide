//import mongoose
const mongoose=require('mongoose');

const patientSchema=new mongoose.Schema({
    phone:{
        type:Number,
        unique:true,
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    },
    reports:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PatientReport'
    }]
});

const Patient=mongoose.model('Patient',patientSchema);


module.exports=Patient;