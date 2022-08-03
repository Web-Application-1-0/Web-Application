const express = require('express');
const router = express.Router();
const passport = require('passport')

const usersController = require('../controllers/users_controller');

//make the profile page accesible only when the user is signed in by using  passport.checkAuthentication
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
 
router.post('/create',usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersController.createSession);
/*router.post request comes to 'create/session' , passport.authenticate --> authenticates it
if it is done then usersController.createSession is called otherwise  failureRedirect: '/users/sign-in' 
gets called*/


router.get('/sign-out',usersController.destroySession);

//when click on google sign-in it takes me there , data is fetched from there 
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
//first argument 'google' is strategy, scope is the info which we are looking to fetch ,
// email is not part of the profile , to get email you need permission to fetch

//once signed in where to go
// in this when data is fetched by google, send it back to me, on a route which is my callback url
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession);


module.exports = router;