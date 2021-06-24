const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser");
// const NewsLetter = require('../model/newsletter');


var morgan = require('morgan');
const registrationForm = require('../model/registrationForm');
const { request, response } = require('express');


router.post('/create-user', (req, res) => {

   const regForm = new registrationForm({

      fullname : req.body.fullname,
      email : req.body.email,
      password: req.body.password 

   }).save((err,regForm) => {
      if(err) return console.error(err);
      console.log('very good')
      res.redirect('/SignIn');
   });

    
})






module.exports = router;