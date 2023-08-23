const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.login = (req, res, next) => {
    res.render('login', { title: 'Login' });
  }

exports.register = (req, res, next) => {
    res.render('register', {title: 'Register'})
}