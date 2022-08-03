const express = require("express");
const router = express.Router();
const passport = require("passport");

const postsController = require("../controllers/posts_controller");
//used passport.checkAuthentication which is defined already,to check authentication at route side
router.post("/create", passport.checkAuthentication, postsController.create);
router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  postsController.destroy
);

module.exports = router;
