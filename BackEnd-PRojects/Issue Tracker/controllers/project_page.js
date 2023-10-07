//importing the models
const Project=require('../models/projects');
const ProjectProfile=require('../models/project_profile');


//Controller to render Project Details page
module.exports.project=async function(req,res){
    try{
        const maha=req.params.id;
        const project=await Project.findById(req.params.id).populate('PP').exec();
        // console.log(project);
        return res.render('project_details',{
            details:project,
            maha:maha,
            title:"Project-Details-Page"
        })
        
    }catch(err){
        console.log("error in the project-details********",err);
        return;

    }
}



