const express = require('express');// it will not create new instance , it will fetch the existing instance

const router = express.Router();// it helps in separating routes and controller

// from api index connecting to v1 folder
router.use('/v1',require('./v1'));


module.exports = router;