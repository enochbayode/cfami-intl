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
app.use(bodyParser.json())

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// connecting to mongodb
const mongoose = require('mongoose');
// useFindAndModify set to false
mongoose.set('useFindAndModify', false);
// use create index set to true
mongoose.set('useCreateIndex', true);

mongoose.connect(secret.databaseURL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err => {
  console.log('could not connect to mongoDB', err)
})
 

var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("we are already connected to the server database")
});

app.post('/email', (req, res) => {
  //Send an email here but currently dummy email
  console.log('Data:', req.body);
  res.json({message: 'Message received!'})
});

app.listen(secret.PORT, () => {
    console.log("This application is already running on port " , secret.PORT);
});