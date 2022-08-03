const express = require('express');// it will not create new instance , it will fetch the existing instance

const router = express.Router();// it helps in separating routes and controller
//const passport = require('passport');

const usersApi = require('../../../controllers/api/v1/users_api');

router.post('/create-session',usersApi.createSession);


module.exports =router;