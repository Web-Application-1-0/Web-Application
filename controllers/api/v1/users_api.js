const User = require('../../../models/user');

//it used to generate the token,passport js then decrypt the token 
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){

    try{
    let user= await User.findOne({email:req.body.email});
    console.log(user);
    console.log(req.body);

    if(!user || user.password != req.body.password ){
        return res.json(422,{  
           message :"Invalid username or password"
        });
    }

    return res.json(200,{
        message :"sign in successful here is your token , please keep it safe!",
       data:{
           token : jwt.sign(user.toJSON(),'collezblog',{expiresIn:'1000000'}) 
           //user.toJSON converts into json(this part gets encrypted) and collezblog is key
       }
    });

    }catch(err){
        console.log(err);
        return res.json(500,{
           message : "Interval Server Error"
        });
         }
    }
