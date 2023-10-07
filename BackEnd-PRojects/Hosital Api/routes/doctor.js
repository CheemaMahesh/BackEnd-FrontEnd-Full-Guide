//import express
const express=require('express');

const router=express.Router();

const doctorAPI=require('../controllers/doctor_controller');


// router.get('/',homeAPI.home);
router.post('/register',doctorAPI.createDoctor);
router.post('/login',doctorAPI.createSession);

module.exports=router;