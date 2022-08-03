module.exports.setFlash = function(req,res,next){
    res.locals.flash = {  //connect-flash stores in the session and let's it go the next time
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}