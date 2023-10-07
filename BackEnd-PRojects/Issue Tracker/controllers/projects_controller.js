//import projects from models
const Project=require('../models/projects');


//Controller to create a project
module.exports.create=async function(req,res){
    try{
    
        //***check weather Author exists or not
        const mahi=await Project.findOne({author:req.body.author});
        if(mahi){
            console.log(req.body.author,":-author already exists");
            return res.redirect('/');
        }

        await Project.create(req.body);
    return res.redirect('back');
    }catch(err){
        console.log("error while creating project:",err);
    }
    
}