const express = require('express');
const User = require('../models/user');
const mongoose = require('mongoose');
const checkIfUserIsLoggedIn = require('../middlewares/auth');

const router = express.Router();

// USER PROFILE

router.get('/profile',checkIfUserIsLoggedIn, (req, res) => {
    console.log(req.flash('info'));
    res.render('users/profile', { userInSession: req.session.currentUser,  message: req.flash('info') });
  });




module.exports = router;