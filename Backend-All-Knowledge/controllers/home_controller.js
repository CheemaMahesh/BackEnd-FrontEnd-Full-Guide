const Post=require('../models/post');
const Comment=require('../models/comment');

const User=require('../models/user');

// module.exports.home=function(req,res){
// Post.find({}).populate('user').populate({path:'comments',pupulate:{path:'user'}})
// .exec(function(err,posts){
  //User.find({},function(,err,users){
    //   return res.render('home',{
//         title:'Home',
//         post:posts,
//          all_user:users
//     });
//    
 // })


// })

    
// }



// module.exports.home = async function (req, res) {
//     try {
//       const posts = await Post.find({}).populate('user').exec();
//       const comments = await Comment.find({}).populate('user').exec();



//       return res.render('home', {
//         title: 'Home',
//         posts: posts,
//         comments:comments
//       });
//     } catch (err) {
//       console.error(err);
//       // Handle error response
//     }
//   }





// const Post = require('../models/post');

// module.exports.home = async function (req, res) {
//   try {
//     const posts = await Post.find({})
//       .populate('user')
//       .populate({ path: 'comments', populate: { path: 'user' } })
//       .exec();

//     return res.render('home', {
//       title: 'Home',
//       posts: posts,
//     });
//   } catch (err) {
//     console.log("Error in fetching posts:", err);
//     // Handle the error response appropriately
//   }
// };





const home = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort('-createdAT')
      .populate('user')
      .populate({ path: 'comments', populate: { path: 'user' } })
      .exec();
    
    const users = await User.find({}).exec();

    return res.render('home', {
      title: 'Home',
      posts: posts,
      all_users: users
    });
  } catch (err) {
    // Handle error appropriately
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  home
};

