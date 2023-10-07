//import express
const express=require('express');
const router=express.Router();

//import controller
const homecontroller=require('../controllers/home_controller');
console.log("routes are loaded");

router.get('/',homecontroller.home);

//using middlewares
router.use('/create',require('./projects'));
router.use('/project',require('./project-details'));
router.use('/generates',require('./issue'));

//export router
module.exports=router;