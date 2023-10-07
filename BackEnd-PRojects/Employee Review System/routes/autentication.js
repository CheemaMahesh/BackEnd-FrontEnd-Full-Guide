const express=require('express');

const router=express.Router();
const passport=require('passport');
// ,passport.checkAuthentication

const authController=require('../controllers/authentication_controller');


//rout for signup page
router.get('/signup',authController.signUp);

//rout for login page
router.get('/login',authController.signIn);

//rout for creating a user
router.post('/create',authController.register);


//rout for profile page(authenticated)
router.get('/profile',passport.checkAuthentication,authController.userProfile);



//use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {
failureRedirect:'/register/login'

}),authController.createSession);


//rout for signout
router.get('/sign-out',authController.destroySession);

module.exports=router;