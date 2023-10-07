//import express
const express=require('express');
const router=express.Router();

const detailsController=require('../controllers/project_page');

router.get('/details/:id',detailsController.project);

//exporting router
module.exports=router;
