const mongoose=require('mongoose');

//Schema for Issues Details
const issueSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    labels:[{
        type:String,
        required:true
    }],
    author:{
        type:String,
        required:true
    },
    //issues belongs to Projects
    projects:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    }
},{timestamps:true});

const ProjectProfile=mongoose.model('ProjectProfile',issueSchema);

module.exports=ProjectProfile;