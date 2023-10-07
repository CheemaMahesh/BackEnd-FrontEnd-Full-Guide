//import express
const express=require('express');
const router=express.Router();


const projectsController=require('../controllers/projects_controller');

router.post('/projects',projectsController.create);

//exporting router
module.exports=router;
