//import express
const express=require('express');
const passport=require('passport');
// const Doctor=require('../model/doctor');
// const jwt=require('../config/passport-jwt-strategy');

const router=express.Router();


const patientAPI=require('../controllers/patient_controller');
// const patientReportAPI=require('../controllers/patient_controller');


// router.get('/',homeAPI.home);
// router.post('/register',doctorAPI.createDoctor);
// router.post('/login',doctorAPI.createSession);

router.post('/register',patientAPI.registerPatient);
router.post('/:id/create_report',patientAPI.createReport);
router.get('/:id/all_reports',patientAPI.allReports);

// ==================================++++++++================================
// ,passport.authenticate('jwt',{session:false})
// =================================++++++++===============================

module.exports=router;