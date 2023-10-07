// //import passport
// const passport=require('passport');


// const LocalStrategy=require('passport-local').Strategy;

// const User=require('../models/user');

// //autentication useing passport 
// passport.use(new LocalStrategy({
//     usernameField:'email'},
//     async function(email,password,done){
//        // (find the user and establish the identitiy)
//        try{

//         let user=await User.findOne({email:email});
//             if(!user||user.password!=password){
//                 console.log("invalid username and password");
//                 return done(null,false);
//             }

//             return done(null,user);

//        }catch(err){
//         if(err){
//             console.log("error while authenticating ",err);
//             return done;
//         }
//        } 
//     }))



//  //serializing the user to decide which user to be kept in the cookies
// passport.serializeUser(function(user,done){
//     done(null,user.id)
// })


//  //deserializing the from the cookies
//  passport.deserializeUser( async function(id,done){
//     try{
//         let user=await User.findById(id);
//         return done(null,user);

//     }catch(err){
//         if(err){console.log("error while deserializing the passport:-");
//         return done(err);
//     }
//     }

//  })


//  //check if the user is authenticated
//  passport.checkAuthentication=function(req,res,next){
//     //check if the user is signed in
//     if(req.isAuthenticated){
//         return next();
//     }
//     //if the user is not signed in
//     return res.redirect('log_in');
//  }

 
//  passport.setAuthenticatedUser=function(req,res,next){
//    if( req.isAuthenticated){
//     //req.user contains current signed in user from the session cookie ,we are just sending the local to the views
//     res.locals.user=req.user
//    }
//    next();
//  }


//  module.exports=passport;



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
    return res.redirect('/register/login');
};


passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){

        //req.user is contains the current signed user from the session cookie and we are sending it to the locals for view
        res.locals.user=req.user;
    }
    next();

}



module.exports=passport;
