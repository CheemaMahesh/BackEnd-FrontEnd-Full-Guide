//import models
const ProjectProfile=require('../models/project_profile');
const Project=require('../models/projects');

//Controller for to create an issue
module.exports.generate=async function(req,res){
try{
    let project=await Project.findById(req.body.project);
    if(project){

        //creating an issue
        let projectProfile=await ProjectProfile.create({
            title:req.body.title,
            description:req.body.description,
            projects:req.body.project,
            labels:req.body.labels,
            author:req.body.author
        });
        //updating the Project
        project.PP.push(projectProfile);
        //saving the updated info
        project.save();
        return res.redirect('back');
    }
    
}catch(err){
    console.log("error in craeating issue",err);
    return;
}
}
