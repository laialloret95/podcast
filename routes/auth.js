const express = require('express');
const User = require('../models/user');
const router = express.Router();

// SIGNUP
router.get('/signup', (req, res) => res.render('auth/signup'));

router.post('/signup', (req, res, next) => {
  console.log('The form data: ', req.body);
});

module.exports = router;
