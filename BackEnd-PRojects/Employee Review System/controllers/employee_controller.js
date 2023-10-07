//import model
const User=require('../models/user');
const Feedback=require('../models/feedback');


//remove user
// const User = require('../models/user');
// const Feedback = require('../models/feedback');

// Remove user


// Remove user
module.exports.removeUser = async function(req, res) {
  try {
    // Find and remove the user
    let user = await User.findByIdAndDelete(req.params.id);

    // Remove feedbacks associated with the user and their content
    await Feedback.updateMany({ user: req.params.id }, { $unset: { content: 1 } });

    return res.redirect('/');
  } catch (err) {
    console.log("Error while removing the user", err);
    return;
  }
}



//adding user 
module.exports.addUser=async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user){
            if(req.body.password==req.body.confirmpassword){
                let create=await User.create({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    admin:false
                });
                return res.redirect('back');
            }
            
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log("error while adding the user by admin",err);
        return;
    }
}


//make admin
module.exports.makeAdmin=async function(req,res){
    try{
        let user=await User.findOne({_id:req.params.id});
        // await User.findByIdAndUpdate({})
        console.log(user);

            user.admin=true;
            user.save();
            return res.redirect('/');
    }catch(err){
        console.log("error while making the admin",err);
        return;
    }
}

//asigning feedbacks (to be given)
module.exports.feedbackAsign = async function(req, res) {
    try {
      let user = await User.findById(req.body.id);
      let feedbackIds = req.body.assigned;
  
      if (user && feedbackIds.length > 0) {
        let feedbacks = await User.find({ _id: { $in: feedbackIds } });
        if (feedbacks.length > 0) {
          console.log("User and feedbacks are available");
          feedbacks.forEach(feedback => {
            user.feedbacks.push(feedback._id);
          });
          await user.save();
        }
      }
      return res.redirect('back');
    } catch(err) {
      console.log("Error while assigning the task", err);
      return res.redirect('back');
    }
  };
  

  
  //employee reviews
  module.exports.empReviews = async function(req, res) {
    try {
      let user = await User.findById(req.params.id);
      const feedbacksList = await User.findById(req.params.id).populate('feedbacks').exec();
      // Assuming feedbacksList is an object with a property named 'feedbacks' that is an array
      const feedbacks = feedbacksList.feedbacks || []; // Set default value to an empty array if feedbacksList.feedbacks is undefined
  
      return res.render('employee_reviews', {
        feedbacks: feedbacks,
        EMP: user
      });
    } catch (err) {
      console.log("Error while rendering the empReviewPage", err);
      return res.redirect('back');
    }
  }

  //employee feedbacks
  module.exports.feedbacks=async function(req,res){
    try{
      let author=await User.findById(req.body.user);
      let feedback=await Feedback.create({
        content:req.body.content,
       user:req.body.id,
        author:req.body.user
      });
      let cUser=await User.findById(req.body.id);
      cUser.reviews.push(feedback._id);
 // Remove req.body.id from author.feedbacks array
 author.feedbacks = author.feedbacks.filter(feedbackId => feedbackId.toString() !== req.body.id);
    
 console.log("user id ===", req.body.id);

      console.log(feedback);
      console.log("AND");
      console.log(cUser);
      cUser.save();
      author.save();
            return res.redirect('back');
    }catch(err){
      console.log("Error while we are in feedback page", err);
      return res.redirect('back');
    }
  }


//employee profile page for admin
  // module.exports.empProAdmin = async function(req, res) {
  //   try {
  //     let user = await User.findById(req.params.id);
  //     let allUsers = await User.find();
  //     let userWithReviews = await User.findById(req.params.id).populate('reviews').exec();
  
  //     const reviews = userWithReviews.reviews || []; // Set default value to an empty array if reviews property is undefined
  
  //     return res.render('employee_profile_forAdmin', {
  //       user: user,
  //       allUsers: allUsers,
  //       reviews: reviews
  //     });
  //   } catch (err) {
  //     console.log("Error while we are in the employee's profile for admin page", err);
  //     return res.redirect('back');
  //   }
  // }


  module.exports.empProAdmin = async function(req, res) {
    try {
      let user = await User.findById(req.params.id);
      let allUsers = await User.find();
      let userWithReviews = await User.findById(req.params.id)
        .populate({
          path: 'reviews',
          populate: {
            path: 'author',
            select: 'email' // Select only the 'name' field of the author
          }
        })
        .exec();
  
      const reviews = userWithReviews.reviews || [];
  
      return res.render('employee_profile_forAdmin', {
        user: user,
        allUsers: allUsers,
        reviews: reviews
      });
    } catch (err) {
      console.log("Error while we are in the employee's profile for admin page", err);
      return res.redirect('back');
    }
  }
  
  
  
  
  
