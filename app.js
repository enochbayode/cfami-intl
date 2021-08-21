//importing modules (libraries)
var path = require('path');
var express = require('express');
var ejs = require("ejs")
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser");
const secret  = require('./config/secret');
const passport = require('passport');
const flash =  require('connect-flash');
const session = require('express-session');
const { Nodemailing } = require('nodemailing');
// const nodemailer = require('nodemailer');
// const multiparty = require("multiparty");
// const { connect, connection } = require('mongoose');

//declaration and creation of express app
var app = express();

//-----------------settting view up engines---------
// view engine setup
// using ejs template
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');

// configuring the engines
// app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// -----------Setting up of view engine ends-----------

//helps us to activate or gives permission to the server to know the user 
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));
  // -----------------------session ends---------------------------
  
  // app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash()); 

//configuration of the Page routes 
var PageController = require('./Controllers/PageController');
app.use('/', PageController);

// configuring the User route
const UserController = require('./Controllers/UserRegController');
app.use('/auth', UserController)

const adminController = require('./Controllers/AdminController');

app.use('/admin', adminController );

//------------- Creating database---------
app.use(express.json())

// body parser middleware
app.use(express.urlencoded({ extended: true }));

// connecting to mongodb
const mongoose = require('mongoose');
// useFindAndModify set to false
mongoose.set('useFindAndModify', false);
// use create index set to true
mongoose.set('useCreateIndex', true);

mongoose.connect(secret.databaseURL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
  console.log('we are already connected to the server database');
  app.listen(secret.PORT, () => {
    console.log("This application is already running on port " , secret.PORT);
});
}).catch(err => {
  console.log('could not connect to mongoDB', err)
})
 


// Email configuration
// Nodemailing.send({
//   Host: "smtp.gmail.com",
//   Username: 'cfami123@gmail.com',
//   Password: "heyunltkxpaiuiye",
//   To: 'cfami123@gmail.com',
//   From: 'cfami123@gmail.com',
//   Subject: `${name} send you a message`,
//   Body: `Name : ${name},
//         Email : ${email}, 
//         Subject : ${subject}, 
//         Message: ${message}`
// }).then((message) =>
// //anything goes here....
//    console.log("Email has been sent")
// );

app.post('/email', (req, res) => {
  //Send an email here but currently dummy email
  console.log('Data:', req.body);
  res.json({message: 'Message received!'})
});

app.all('*', (req, res)=>{
  console.log('You have entered the port')
  res.status(404).render('404_error')
});
