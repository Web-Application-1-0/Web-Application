const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy; // importing strategy
const ExtractJwt = require("passport-jwt").ExtractJwt; // extract jwt from header

const User = require("../models/user");

//encrypt using key,opts here is options
let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //header is a ist of keys,header has a key called authrization , authorization also has list of keys,
  // it has key called bearer,this bearer will have jwt token

  secretOrKey: process.env.jwt_secretOrKey, // encryption and decryption string
};

/*to tell passport to use jwt strategy
 jwt conatins three things - header, payload , signature
header - conatins jwt , payload - conatains the info of the user , signature -encrypt algorithm which runs using payload
*/
// here user is already present in the jwt , we're fetching ot id from payload and checking if the user is there or not
// during sign-in , jwt gets created
passport.use(
  new JWTStrategy(opts, function (jwtPayLoad, done) {
    //payload conatains the info of the user, done is a callback function
    /* if someone find out key : collezblog and using pay64 as encryption, then to check forged token 
 then we check user id here, to check if token is valid 
 */
    User.findById(jwtPayLoad._id, function (err, user) {
      if (err) {
        console.log("Error in finding user from JWT");
        return;
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
