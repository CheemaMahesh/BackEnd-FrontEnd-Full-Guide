// // Import model
// const User = require('../models/user');

// // For Registration
// module.exports.register = async function(req, res) {
//   try {
//     // Find all users and get the document count
//     const userCount = await User.countDocuments({});
//     const oUser=await User.findOne({email:req.body.email});

//     console.log(userCount ,'/', 1000);

//     if(oUser){
//         console.log("user already exists");
//         return res.render('log_in');
//     }else{


//         if(req.body.password==req.body.conformPassword){
//             if(userCount==0){
//                 console.log("hai im in");
//                 const user=await User.create({
//                     email:req.body.email,
//                     password:req.body.password,
//                     name:req.body.name,
//                     admin:true
//                 });
//                 console.log(user,"*************************************");
        
//             }else{
//                 console.log("hai im in else");
//                 const ser=await User.create({
//                     email:req.body.email,
//                     password:req.body.password,
//                     name:req.body.name,
//                     admin:false
//                 });
//                 console.log(ser,"//////////////////////////////////////////////////");
//             }
    
//         }else{
//             console.log("password does not match");
//             return res.redirect('back');
//         }

//     }

//     // console.log(userCount + 1000);
//     return res.render('log_in');
//   } catch (err) {
//     console.log("Error while rendering the register", err);
//     return res.status(500).send("Internal Server Error");
//   }
// }

// //userprofile
// module.exports.userProfile=async function(req,res){
//     return res.render('user_profile');
// }

// //signup
// module.exports.signUp=async function(req,res){
// return res.render('register');
// }

// //signin
// module.exports.signIn=async function(req,res){
//     return res.render('log_in');
// }


// //create session
// module.exports.createSession=async function(req,res){
//     return res.redirect('/');
// }


// module.exports.destroySession = function(req, res) {
//     try {
//       req.logout(function(err) {
//         if (err) {
//           console.log("error in destroying the session", err);
//           return;
//         }
//         return res.redirect('/');
//       });
//     } catch (err) {
//       console.log("error in destroying the session", err);
//       return;
//     }
//   };
  

  
  // =********************************************************************************************************
  // Import the User model from '../models/user'
const User = require('../models/user');

// Function for user registration
module.exports.register = async function(req, res) {
  try {
    // Find the total number of users in the database
    const userCount = await User.countDocuments({});
    
    // Find a user with the provided email address
    const oUser = await User.findOne({ email: req.body.email });

    console.log(userCount, '/', 1000);

    if (oUser) {
      // If the user already exists, redirect to the login page
      console.log("User already exists");
      return res.render('log_in');
    } else {
      if (req.body.password == req.body.conformPassword) {
        if (userCount == 0) {
          console.log("Creating admin user");
          // Create a user with admin privileges
          const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            admin: true
          });
          console.log(user, "*************************************");
        } else {
          console.log("Creating non-admin user");
          // Create a regular user (non-admin)
          const ser = await User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            admin: false
          });
          console.log(ser, "//////////////////////////////////////////////////");
        }
      } else {
        // Passwords do not match, redirect back to registration page
        console.log("Password does not match");
        return res.redirect('back');
      }
    }

    // Registration successful, redirect to the login page
    return res.render('log_in');
  } catch (err) {
    // Handle errors and send a 500 Internal Server Error response
    console.log("Error while rendering the register", err);
    return res.status(500).send("Internal Server Error");
  }
}

// Function for displaying user profile
module.exports.userProfile = async function(req, res) {
  return res.render('user_profile');
}

// Function for rendering the sign-up page
module.exports.signUp = async function(req, res) {
  return res.render('register');
}

// Function for rendering the login page
module.exports.signIn = async function(req, res) {
  return res.render('log_in');
}

// Function to create a session (e.g., after successful login)
module.exports.createSession = async function(req, res) {
  
  return res.redirect('/');
}

// Function to destroy a session (e.g., after logout)
module.exports.destroySession = function(req, res) {
  try {
    // Logout the user and redirect to the homepage
    req.logout(function(err) {
      if (err) {
        console.log("Error in destroying the session", err);
        return;
      }
      return res.redirect('/');
    });
  } catch (err) {
    console.log("Error in destroying the session", err);
    return;
  }
};
//createSession
