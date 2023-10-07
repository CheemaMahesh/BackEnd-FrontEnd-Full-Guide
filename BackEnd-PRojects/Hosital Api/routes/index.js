//import express
const express=require('express');

const router=express.Router();

const homeAPI=require('../controllers/home_controller');


router.get('/',homeAPI.home);
router.use('/doctors',require('./doctor'));
router.use('/patients',require('./patient'));
router.use('/reports',require('./reports'));

module.exports=router;