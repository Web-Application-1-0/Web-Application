const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" }); //once defined here , we don't have to do it everywhere
const express = require("express");

const cookieParser = require("cookie-parser");

const app = express();

const port = process.env.PORT;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const MongoStore = require("connect-mongo");

const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash"); // for flash message
const customMware = require("./config/middleware");
const path = require("path");

app.use(
  sassMiddleware({
    src: path.join(__dirname, process.env.asset_path, "scss"),
    dest: path.join(__dirname, process.env.asset_path, "css"), // to put that css compiled file to this destination
    debug: true, //errors you see when compilation error , during production turn it off
    outputStyle: "extended", //i want it to be simple , not minified i.e  in single line
    prefix: "/css",
    //which folder to start looking for in starting ,example "/css/layout.css" here /css is prefix folder
  })
);

app.use(express.urlencoded());
/* app.use whenever used then it means middleware is called
  it takes request and convert form data and put it on request.body(in key:value pair) */

app.use(cookieParser());

app.use(express.static(process.env.asset_path));
/* it will look for folder named assets in the directory and
look for static file like html,css,js
in home.ejs just link href ="/css/home.css" as it will look in assets folder for html,css and js
 
*/

//make the uploads path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set up view engine
app.set("view engine", "ejs");

app.set("views", "./views"); //path to look from controller when it says render filename
//here not used path.join like that as we can do it like this also

// to use express session
//mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "coolzblog",
    //TODO change the secret before deployment in production mode
    secret: process.env.SECRET, // secret key used for encrypting
    saveUninitialized: false, //if user not logged in,extra data will not be stored in session cookie
    resave: false, //for preventing from saving session cookie data again and again
    cookie: {
      maxAge: 1000 * 60 * 100, // here time measured in milli second i.e 1e-3
      //till the login session expire
    },
    store: new MongoStore(
      {
        mongoUrl: "mongodb://localhost/coolzblog_db",
        autoRemove: "disabled", //do  you want this to removed automatically
      },
      function (err) {
        // callback function
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

//it will check if session cookie is present or not
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`error in running the server:${port}`);
    // here backticks i.e `` inside it works as string until to use variable inside string use ${variable}
  }

  console.log(`server is running on port:${port}`);
});
