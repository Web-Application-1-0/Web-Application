//require the library
const mongoose = require("mongoose");

// connect to the database
mongoose.connect(
  `mongodb://localhost/${process.env.db}`
); /*here localhost as it's running on our system
here contact_list_db is database name*/

//acquire the connection (to check if it is successful)
const db = mongoose.connection;

//error
db.on("error", console.error.bind(console, "error connecting to db"));

//up and running then print the message
db.once("open", function () {
  console.log("Successfully connected to the database");
});

module.exports = db;
