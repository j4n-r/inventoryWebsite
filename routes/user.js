const express = require('express');
const router = express.Router();
const User = require('../models/user'); 

const user_controller = require('../controllers/user_controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register' });
  });
  
router.get("/login", user_controller.login_get);
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
 

module.exports = router;
