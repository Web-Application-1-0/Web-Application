const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

//authenticating using passport, see passport.js username & password section
// During authentication jwt gets created
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // will look for field email
      passReqToCallback: true, // adding req to parameter with email, passowrd, done
    },
    function (req, email, password, done) {
      // here done is callback function , it's reporting back for passport.js
      //find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        //1st email is data user email i.e stored in db,
        // 2nd email is vaue  which is passed on  function parameter
        if (err) {
          req.flash("error", err); //using middleware.js that we created
          return done(err);
        }

        if (!user || user.password != password) {
          // 2nd password is req.body.password
          req.flash("error", "Invalid Username/Password"); //using middleware.js that we created
          return done(null, false);
        }
        return done(null, user); //returning user , which can be used in serialiser
      });
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies and
// the rest and this info gets encrypted
passport.serializeUser(function (user, done) {
  done(null, user.id); // serialiser will store the used.id in session cookie which gets encrypted
  //using express session key which we defined
});

//deserializing the user from the key in the cookies
/*when the cookie is being sent back to the server  and we are establishing the identity which data is
there from the database, we are using that id to find the user , this is deseralising*/
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding user -->Passport");
      return done(err);
    }
    return done(null, user);
  });
});

//check if the user is authenticated, using as  a middleware
passport.checkAuthentication = function (req, res, next) {
  // here ,.checkAuthentication function is created
  //if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    // detects if the user is signed in or not
    return next();
  }

  //if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  //here ,.setAuthenticatedUser  function is created
  if (req.isAuthenticated()) {
    /* req.user contains the current signed in user from the session cookie 
and we are just sending this to the local for the views as by default it is not present in locals*/
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
