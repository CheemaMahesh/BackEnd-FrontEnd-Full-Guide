//import Projects
const Project=require('../models/projects');


//Controller for home page
module.exports.home=async function(req,res){
    let projects=await Project.find({});
    return res.render('home',{
        title:'Home',
        projects:projects
    });
}