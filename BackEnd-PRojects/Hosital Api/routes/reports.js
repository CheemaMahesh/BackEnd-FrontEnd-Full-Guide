//import express
const express=require('express');

const router=express.Router();

const reportsAPI=require('../controllers/patient_controller');


router.get('/:status/',reportsAPI.allStatus);

module.exports=router;