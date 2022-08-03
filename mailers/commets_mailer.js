const nodeMailer = require('../config/nodemailer');

/*a file is a module, to export this function directly rather, it's another way of exporting a method
let newComment = function
module.exports = newComment*/
exports.newComment =(email)=>{
    console.log('inside newComment mailer',email);
    nodeMailer.transporter.sendMail({
        from:"princeraj863@gmail.com",
        to:email,
        subject: "New Comment Published!",
        html: '<h1> Your comment is now published! </h1>'
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return ;
        }
        console.log('Message sent',info);
        return ;
    })
}
