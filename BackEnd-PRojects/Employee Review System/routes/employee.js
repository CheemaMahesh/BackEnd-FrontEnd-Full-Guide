//import express
const express=require('express');
const router=express.Router();

const passport=require('passport');


const empController=require('../controllers/employee_controller');

router.get('/remove/:id',empController.removeUser);
router.post('/add',empController.addUser);
router.get('/make/:id',empController.makeAdmin);
router.post('/asign',empController.feedbackAsign);
router.get('/reviews/:id',passport.checkAuthentication,empController.empReviews);
router.post('/feedback',empController.feedbacks);
router.get('/profile_view/:id',passport.checkAuthentication,empController.empProAdmin);

module.exports=router;