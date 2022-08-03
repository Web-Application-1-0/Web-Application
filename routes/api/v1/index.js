const express = require('express');// it will not create new instance , it will fetch the existing instance

const router = express.Router();// it helps in separating routes and controller

router.use('/posts',require('./posts'));
router.use('/users',require('./users'));





module.exports= router;