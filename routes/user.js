const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const passport = require("passport");
const user_controller = require('../controllers/user_controller');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretkey = process.env.JWT_SECRET_KEY

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register' });
  });
  
  router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
  });

router.post("/register", function (req, res) { 
    User.register(new User({ email: req.body.email, username: req.body.username }), req.body.password, function (err, user) { 
        if (err) { 
            res.json({ success: false, message: "Your account could not be saved. Error: " + err }); 
        } 
        else { 
            req.login(user, (er) => { 
                if (er) { 
                    res.json({ success: false, message: er }); 
                } 
                else { 
                    res.json({ success: true, message: "Your account has been saved" }); 
                } 
            }); 
        } 
    }); 
  });
 

router.post("/login", function (req, res) { 
    if(!req.body.username){ 
      res.json({success: false, message: "Username was not given"}) 
    } else { 
      if(!req.body.password){ 
        res.json({success: false, message: "Password was not given"}) 
      }else{ 
        passport.authenticate('local', function (err, user, info) { 
           if(err){ 
             res.json({success: false, message: "There was an unknown error" + err.message}) 
           } else{ 
            if (! user) { 
              res.json({success: false, message: 'username or password incorrect'}) 
            } else{ 
              req.login(user, function(err){ 
                if(err){ 
                  res.json({success: false, message: "error " + err.message}) 
                }else{ 
                  const token = jwt.sign({userId : user._id, 
                     username:user.username}, secretkey, 
                        {expiresIn: '24h'}) 
                  res.json({success:true, message:"Authentication successful", token: token }); 
                } 
              }) 
            } 
           } 
        })(req, res); 
      } 
    } 
  }); 


module.exports = router;
