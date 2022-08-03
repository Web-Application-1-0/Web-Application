const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

//defines how communication is going to take place , it sends email
let transporter = nodemailer.createTransport({
  service: process.env.smtp_service,
  host: process.env.smtp_host, // used for gmail
  port: process.env.smtp_port,
  secure: process.env.smtp_secure, // true for 465, false for other ports
  auth: {
    user: process.env.smtp_auth_user, // generated gmail user
    pass: process.env.smtp_auth_pass, // generated gmail password
  },
});

// using ejs for it , file will be inside views
let renderTemplate = (data, relativePath) => {
  //
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath), //'../views/mailers'  this keeps the email template ,relativePath is from mail is being sent
    data, // the context passed to ejs , name to be filled inside the template
    function (err, template) {
      if (err) {
        console.log("error in rendering template");
        return;
      }

      mailHTML = template;
    }
  );

  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
