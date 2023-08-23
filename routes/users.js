const express = require('express');
const router = express.Router();

router.get('/hello', function(req, res, next) {
    res.render('error', { title: 'Error' });
  });

module.exports = router