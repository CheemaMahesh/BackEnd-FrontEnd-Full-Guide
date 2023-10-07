const User=require('../models/user');
const fs=require('fs');
const path=require('path');

module.exports.profile=async function(req,res){
    try{
        let user=await User.findById(req.params.id);
        return res.render('user_profile',{
           title:"User_Love_Profile",
           profile_user:user
       });

    }catch(err){
        console.log("error in rendering the profile details:-",err);
        return;

    }
}


//render the sign up page
module.exports.signup=async function(req,res){

    try{
        if(req.isAuthenticated()){
            return res.redirect('/users/profile');
        }
    
    
        return res.render('user_sign_up',{
            title:"Codieal | Sign Up"
        });

    }catch(err){
        console.log("error in sign-up:-",err);
        return;

    }   
}




module.exports.update=async function(req,res){

// try{
//     if(req.user.id==req.params.id){

//         let user= await User.findByIdAndUpdate(req.params.id,req.body);
//             return res.redirect('back');
//     }else{
//         return res.status(401).send("Unauthorised requset");
//     }


// }catch(err){
//     console.log("error in updating profile:-",err);
//     return;

// }
if(req.user.id==req.params.id){
    try{
        let user= await User.findByIdAndUpdate(req.params.id);
        User.uploadedAvatar(req,res,function(err){
            if(err){
                console.log('****************** Multer Error:-',err);
            }
            // console.log(req.file);
            user.name=req.body.name;
            user.email=req.body.email;


                //saving the path of uploaded file into the avatar field in the user
            if(req.file){
                    if(user.avatar){
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }


                user.avatar=User.avatarPath+'/'+req.file.filename;
            }
            user.save();
            return res.redirect('back');



        })

    }catch(err){
        return res.redirect('back');
    }

}else{
    return res.status(401).send("Unauthorised requset");
}


}



//render the sign in page
module.exports.signin=async function(req,res){

    try{
        if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title:"Codieal | Sign in"
    })

    }catch(err){
        console.log('"error in Sign-up render :-',err);
        return;

    }

}




//get the sign up data
module.exports.create= async function(req,res){

    try{
        if(req.body.password!=req.body.conform_password){
            return res.redirect('back');
    }
    let email=await User.findOne({email:req.body.email});

            if(!email){
       let dummy=await  User.create(req.body);
            return res.redirect('/users/sign-in');
       
    }else{
        return res.redirect('back');

    }


}catch(err){

    }

    





// if(req.body.password!=req.body.conform_password){
//     return res.redirect('back');
// }

// User.findOne({email:req.body.email}).then((email)=>{


//         if(!email){
//         User.create(req.body).then(()=>{
//             return res.redirect('/users/sign-in');
//         })
//     }else{
//         return res.redirect('back');

//     }

// })

}


//sign in and create a session for the user
module.exports.createSession=async function(req,res){
try{
    req.flash('success','logged in succesfuly');
    return res.redirect('/');

}catch(err){

}

   
}


//sign out and destroying the sesssion
module.exports.destroySession=async function(req,res){
try{
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','You have loggedOut');
        return res.redirect('/');
      });
    
}catch(err){
    return;
}
}