const express=require('express');

const router=express.Router();

const passport=require('passport');


const homeController=require('../controllers/home_controller');


//rout for home page(authenticated)
router.get('/',homeController.home);

router.use('/register',require('./autentication'));
router.use('/employee',require('./employee'));

module.exports=router;