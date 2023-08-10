const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://janruegge:0fjwHTKEltaOFZjf@cluster0.veoyptt.mongodb.net/Inventory_WZB?retryWrites=true&w=majority";
const { body, validationResult } = require("express-validator");


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const drinksRouter = require('./routes/drinks');
const drinks = require('./models/drinks');




const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
mongoose.set("strictQuery", false);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
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
  res.render('error');
});

module.exports = app;


main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}