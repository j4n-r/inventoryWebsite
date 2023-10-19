// const User = require("../models/user")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require('../models/user'); 

// exports.register_get = (req, res, next) => {
//     res.render("register",{
//         title: "Register", });
//   }; 


exports.login_get = (req, res, next) => {
    res.render("login", {title: "Login"})
}

