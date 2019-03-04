const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
require('./models/user');
require('./config/passport');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();


//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

// if(!isProduction) {
//   app.use(errorHandler());
// }

app.use(require('./routes'));
//Configure Mongoose
mongoose.connect('mongodb://localhost/test');
mongoose.set('debug', true);

//Error handlers & middlewares
app.use(function(error, req, res, next) {
  res.json({ message: error.message });
});

module.exports = app;
