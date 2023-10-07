const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
const User=require('../../../models/user');

module.exports.index=async function(req,res){

    const posts = await Post.find({})
    .sort('-createdAT')
    .populate('user')
    .populate({ path: 'comments', populate: { path: 'user' } })


    const users = await User.find({}).exec();

    // return res.render('home', {
    //   title: 'Home',
    //   posts: posts,



    return res.status(200).json({
        message:'list of posts',
        mail:'maheshbabucheema789@gmail.com',
        posts:posts,
        // allUsers: users

       
    });
}



module.exports.destroy = async function (req, res) {
    try {
      const post = await Post.findById(req.params.id);
  
    //   if (!post) {
    //     return res.redirect('back');
    //   }
  
      // Check if the current user is the owner of the post
      if (post.user.toString() === req.user.id) {

        //this deleteone is insted of post.remove();
        // await post.deleteOne();
        await Comment.deleteMany({ post: req.params.id });
  
        return res.status(200).json({
            message:"deleted successfuly with api"
        })
      } else {
        return res.status(401).json({
          message:"You can not delete this post"
        })
      }
    } catch (err) {
      console.log("Error in deleting a post  with api:", err);

      return res.status(500).json({
        message:'internal server Error'
      })
      // Handle the error response appropriately
    }
  };



