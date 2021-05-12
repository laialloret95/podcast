const express = require('express');
const User = require('../models/user');
const mongoose = require('mongoose');
const checkIfUserIsLoggedIn = require('../middlewares/auth');

const router = express.Router();

// USER PROFILE

router.get('/profile',checkIfUserIsLoggedIn, (req, res) => {
    console.log(req.flash('flashMessage'));
    res.render('users/profile', { userInSession: req.session.currentUser,  message: req.flash('flashMessage') });
  });




module.exports = router;