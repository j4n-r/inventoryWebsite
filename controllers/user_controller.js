const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/users.js")
const bcrypt = require('bcryptjs');


exports.login_get = (req, res, next) => {
    res.render('login', { title: 'Login' });
  }




exports.register_get = (req, res, next) => {
    res.render('register', {title: 'Register'})
}

exports.register_post =  [
  body('name').trim().escape(),
  body('email').trim().escape(),
  body('username').trim().escape(),
  body('password').trim().escape(),

  asyncHandler(async  (req, res, next) => {

    const err = validationResult(req);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
  const userExists = await User.findOne({username: req.body.username}).exec();
  if (userExists) {("user already exists");
    err.status = 404;
    return next(err);
  } else {
    await user.save();
    res.redirect('/')
  }
  }) 
]

