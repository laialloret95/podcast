const express = require('express');
const User = require('../models/user');
const mongoose = require('mongoose');
const checkIfUserIsLoggedIn = require('../middlewares/auth');

const router = express.Router();

//USER ROUTES JUST FOR THE APP MEMBERS - PRIVATE
router.use(checkIfUserIsLoggedIn);

// PROFILE
router.get('/profile', (req, res, next) => {
    console.log(req.session.currentUser)
    res.render('users/profile', { userInSession: req.session.currentUser });
});

// EDIT PROFILE
router.get('/profile/edit', (req, res, next) => {
  res.render('users/edit-profile', { userInSession: req.session.currentUser });
});

router.post('/profile/edit', (req, res, next) => {
  const { firstName, lastName, mail, preferences } = req.body;
  const id  = req.session.currentUser._id;

  User.findByIdAndUpdate( id, { firstName, lastName, mail, preferences }, { new: true })
   .then(updatedUserDB => {
     const { firstName, lastName, mail, preferences } = updatedUserDB;
     req.session.currentUser = {
      firstName,
      lastName,
      mail,
      preferences
    };
   })
   .then(() => res.redirect("/profile"))
   .catch((error) => next(error));

});




module.exports = router;