const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtratJWT=require('passport-jwt').ExtractJwt;



const User=require('../model/doctor');

let opts={
    jwtFromRequest:ExtratJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'HospitalAPI'
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id).then((user)=>{
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }

    }).catch((err)=>{
        if(err){
            console.log('error in finding user from jwt:-',err);
            return;
        }
    })

}))


module.exports=passport;