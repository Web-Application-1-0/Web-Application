/*const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2({
  clientID: process.env.g_clientID,
  clientSecret: process.env.g_clientSecret,
  callbackURL: process.env.g_callbackURL, // Redirect URL
});

const smtpTransport = nodemailer.createTransport({
  service: process.env.smtp_service,
  auth: {
    type: "OAuth2",
    user: process.env.g_user,
    clientId: process.env.g_clientID,
    clientSecret: process.env.g_clientSecret,

    accessToken: process.env.g_accessToken,
    tls: {
      rejectUnauthorized: false,
    },
  },
});

const mailOptions = {
  from: "princeraj863@gmail.com",
  to: "princeraj873.pr2@gmail.com@gmail.com",
  subject: "Node.js Email with Secure OAuth",
  generateTextFromHTML: true,
  html: "<b>test</b>",
};

smtpTransport.sendMail(mailOptions, (error, response) => {
  error ? console.log(error) : console.log(response);
  smtpTransport.close();
});*/
