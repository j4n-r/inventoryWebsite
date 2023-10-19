const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://janruegge:0fjwHTKEltaOFZjf@cluster0.veoyptt.mongodb.net/Inventory_WZB?retryWrites=true&w=majority";
const passport = require("passport")

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const drinksRouter = require('./routes/drinks');
const drinks = require('./models/drinks');
const User = require('./models/user'); 
const LocalStrategy = require('passport-local').Strategy; 


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
mongoose.set("strictQuery", false);

app.use(passport.initialize()); 
app.use(passport.session());  

passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

passport.use(new LocalStrategy(User.authenticate()));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/drinks', drinksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: "Error"});
});

module.exports = app;


main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}