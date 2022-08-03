const express = require('express');// it will not create new instance , it will fetch the existing instance

const router = express.Router();// it helps in separating routes and controller
const passport = require('passport');
const postApi = require("../../../controllers/api/v1/posts_api");

router.get('/',postApi.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}), postApi.destroy);
//{session:false} this prevents session cookie to get generated


module.exports= router;