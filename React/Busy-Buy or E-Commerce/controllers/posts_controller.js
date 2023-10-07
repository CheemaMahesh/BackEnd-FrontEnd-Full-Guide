const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create= async function(req,res){

  try{
    let post=await Post.create({
      content:req.body.content,
      user:req.user._id
  })
    if(req.xhr){
      return res.status(200).json({
        data:{
          post:post
        },
        message:"postCreated!!"
      })
    }

  return res.redirect('back');

  }catch(err){
    console.log("error in creating a post",err); 
    return;

  }
}





module.exports.destroy = async function (req, res) {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.redirect('back');
      }
  
      // Check if the current user is the owner of the post
      if (post.user.toString() === req.user.id) {

        //this deleteone is insted of post.remove();
        await post.deleteOne();
        await Comment.deleteMany({ post: req.params.id });
        if(req.xhr){
          return res.status(200).json({
            data:{
              post_id:req.params.id
            },
            message:"post deleted successfuly"
          })
        }
  
        return res.redirect('back');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.log("Error in deleting a post:", err);
      return;
      // Handle the error response appropriately
    }
  };