const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){
    
 let posts= await Post.find({})
    .sort('-createdAt') //sort the post according to the nearest post created by me by time  i.e nearest to me
     .populate('user')
     .populate({
         path:'comments', //nested populating , to get comment and user of that comment
         populate:{
             path:'user'// further populate user , this way we can do further population
         }
     });


    return res.json(200,{
        message :"List of posts",
        posts:posts
    });
}

module.exports.destroy = async function(req,res){

    try{
   let post= await Post.findById(req.params.id);
        //.id means converting the object id into string , before it was req.user._id
        //console.log(post);
        //console.log(req.user);
        if(post.user==req.user.id){ // checking if it's user's own post
          post.remove();
           
       await Comment.deleteMany({post:req.params.id}); // deleting comments related to post
       //console.log(req.params.id);
       
         return res.json(200,{
           message :"Post and associated comments deleted successfully "
         });
        }else{
          return res.json(401,{
            message : "You cannot delete this post!"
          });
        }
  }catch(err){
      console.log(err);
    return res.json(500,{
       message : "Interval Server Error"
    });
     }
  }