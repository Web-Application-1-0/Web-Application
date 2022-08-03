const express = require("express"); // it will not create new instance , it will fetch the existing instance

const router = express.Router(); // it helps in separating routes and controller
const homeController = require("../controllers/home_controller"); // to access home controller

console.log("router loaded");

//this router is acessing a home controller
router.get("/", homeController.home); //calling homeController.actionName

router.use("/users", require("./users")); //handles users request
/*It simply tells for http://localhost:8000/users/ address  look for the filename './users'
here index.js router acts as a centre hub for all other routes it directs to routes in  users.js  
for any further routes,access from http://localhost:8000/users/ 
example for profile 
http://localhost:8000/users/profile
 router.use('/routerName',require('./routerfile')); */

router.use("/posts", require("./post"));
router.use("/comments", require("./comments"));

router.use("/api", require("./api"));

module.exports = router; //it will get exported to index.js in main folder
