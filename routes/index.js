var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/drinks");
});


//error
router.get('/error', function(req, res, next) {
  res.render('error', { title: 'Error' });
});

module.exports = router;