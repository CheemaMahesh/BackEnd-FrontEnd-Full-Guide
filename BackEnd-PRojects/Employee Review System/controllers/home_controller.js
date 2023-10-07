//home controller

const User=require('../models/user');

module.exports.home=async function(req,res){
    try{
        let user=await User.find();
        // const userFeedbacks=await User.findById(req.params.id).populate('feedbacks').exec();
        // const reviews = await User.find().populate('reviews').exec();
        return res.render('home',{
            employees:user
            // asign:user,
            // reviews:reviews
            // feedbackToBeGiven:userFeedbacks
        });
    }catch(err){
        console.log("error while rendering the home",err);
        return;
    }
}


