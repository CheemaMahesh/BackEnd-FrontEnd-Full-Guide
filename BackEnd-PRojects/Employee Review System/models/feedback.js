//import mongoose
const mongoose=require('mongoose');


//schema for feedback
const feedbackSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

//making it as model
const Feedback=mongoose.model('Feedback',feedbackSchema);


//exporting the model
module.exports=Feedback;


