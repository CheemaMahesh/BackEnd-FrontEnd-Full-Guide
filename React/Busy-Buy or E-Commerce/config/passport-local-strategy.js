const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

//import user
const User=require('../models/user');


//authentication useing passport
passport.use(new LocalStrategy({
    usernameField:'email'
},function(email,password,done){

User.findOne({email:email}).then((user)=>{


    if(!user||user.password!=password){
            console.log("Invalid Username or Password");
            return done(null,false);
    }
    return done(null,user);



}).catch((err)=>{
    if(err){
        console.log("error in finding=================> passport");
        return done(err);
    }
})

}

));


//serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserializing the user from the key in the cookie


passport.deserializeUser(function(id,done){
    User.findById(id).then((user)=>{
        return done(null,user);

    }).catch((err)=>{
        if(err){
            console.log("error in finding======> passport2222222222");
            return done(err);

        }

    })
})


//check weather the user is authenticated or not
passport.checkAuthentication=function(req,res,next){
    //if the user is signed in ,then pass on the request to next function(controllers Action)
    if(req.isAuthenticated()){
        return next();
    }

        //if the user is not signed in 
    return res.redirect('/users/sign-in');
};


passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){

        //req.user is contains the current signed user from the session cookie and we are sending it to the locals for view
        res.locals.user=req.user;
    }
    next();

}



module.exports=passport;
