const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require("../mailers/commets_mailer");

module.exports.create = async function (req, res) {
  try {
    post = await Post.findById(req.body.post); //req.body.post as in form data it's name is post,if post is founud
    //console.log(post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      //handle error

      //adding comment to the post,it will automatically fetch out the id and push it
      post.comments.push(comment);

      post.save(); //it tells the database it's final version so save it, before that it remains in ram
      comment = await comment.populate("user");
      // console.log(comment.user);
      // commentsMailer.newComment(comment.user.email);
      if (req.xhr) {
        return res.status(200).json({
          //returning json,it's returned with status 200
          data: {
            comment: comment,
            username: req.user.name,
          },
          message: "Comment created!", // adding  message to json data;
        });
      }

      req.flash("success", "comment created");
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    //console.log(req.user.id); it's from passport.js , object is req.user inside it authentication info are stored
    //console.log(comment);in this that comment whole info is stored which got found
    if (comment.user == req.user.id) {
      let postId = comment.post;
      // before deleting comment we keep postid of this commment, we keep it in variable
      //to delete comment from the post db by using postid

      comment.remove();

      let post = Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      }); //it pulls out that comment given
      console.log(req.params.id);
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "Comment deleted",
        });
      }

      req.flash("success", "comment removed successfully");
      return res.redirect("back");
    } else {
      req.flash("error", unauthorized);
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    console.log(err);
  }
};
