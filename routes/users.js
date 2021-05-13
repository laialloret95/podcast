const express = require('express');
const User = require('../models/user');
const mongoose = require('mongoose');
const checkIfUserIsLoggedIn = require('../middlewares/auth');

const router = express.Router();

//USER ROUTES JUST FOR THE APP MEMBERS - PRIVATE
//router.use(checkIfUserIsLoggedIn);

// USER PROFILE
router.get('/profile', (req, res, next) => {
    console.log(req.session.currentUser)
    res.render('users/profile', { userInSession: req.session.currentUser });
});




module.exports = router;