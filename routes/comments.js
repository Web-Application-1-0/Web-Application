const express = require("express");
const router = express.Router();
const passport = require("passport");

const commentsController = require("../controllers/comments_controllers");
//used passport.checkAuthentication which is defined already,to check authentication at route side
router.post("/create", passport.checkAuthentication, commentsController.create);

router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  commentsController.destroy
);

module.exports = router;
