const express = require('express');
const User = require('../models/user');
const mongoose = require('mongoose');

const router = express.Router();

// USER PROFILE

router.get('/profile', (req, res) => {
    res.render('users/profile', { userInSession: req.session.currentUser });
  });




module.exports = router;