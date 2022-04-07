const passportLocal = require('../config/passport');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const User = require('../model/users');


//creating a user 
router.post('/create-user', (req,res, next)=>{
    var user = new User();

    user.email = req.body.email;
    user.fullname = req.body.fullname;
    user.password = req.body.password;
    
    User.findOne({email:req.body.email}, (err,existinguser)=>{
        if(existinguser){
            req.flash('error', 'Account with this email already exists');
            return res.redirect('/auth/create-user') 
        }else{
            user.save(function(err,user){
                if(err) return next(err);
                req.flash('message', 'Successful login!!'); 
                    req.login(user,function(err){
                        if(err) return next(err);
                        res.redirect('/auth/SignIn');
                    })
            }) 
        } 
    })


});




function isAuthenticated(req, res, next) {

    if (req.user)
        return next();
  
    res.redirect('/');
  }

  router.get('/SignIn',(req,res)=>{
    res.render('SignIn', {
        title:'login page',
        login : req.flash('loginMessage')
        
    })
});

router.get('/SignUp',(req,res)=>{
    res.render('SignUp', {
        title:'SignUp page',
        error:req.flash('error')
    })
} )



router.get('/profile',isAuthenticated,  (req,res)=>{

    res.render('profile', {
        title : 'profile',
        user: req.user,
        message:req.flash('message')
        
    })

})




//login in user
router.post('/SignIn',
  passport.authenticate('local-login',
   { successRedirect: '/auth/profile',
    failureRedirect: '/auth/SignIn',
    failureFlash: true })
);



router.get('/signout', (req,res)=>{
    req.logout();
    res.redirect('/auth/SignIn')
})




module.exports = router