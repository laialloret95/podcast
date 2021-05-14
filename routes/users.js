const express = require('express');
const User = require('../models/user');
const mongoose = require('mongoose');
const checkIfUserIsLoggedIn = require('../middlewares/auth');

const router = express.Router();

//USER ROUTES JUST FOR THE APP MEMBERS - PRIVATE
router.use(checkIfUserIsLoggedIn);

// PROFILE
router.get('/profile', (req, res, next) => {
  const id = req.session.currentUser._id;

  User
    .findById(id)
    .then((userFromDB) => res.render('users/profile', { userFromDB }))
    .catch((error) => next(error));
});

// EDIT PROFILE
router.get('/profile/edit', (req, res, next) => {
  const id = req.session.currentUser._id;

  User
   .findById(id)
   .then((userFromDB) => res.render('users/edit-profile', { userFromDB }))
   .catch((error) => next(error));
});

router.post('/profile/edit', (req, res, next) => {
  const { firstName, lastName, email, preferences } = req.body;
  const id  = req.session.currentUser._id;

  User.findByIdAndUpdate( id, { firstName, lastName, email, preferences }, { new: true })
   .then(updatedUserDB => {
     console.log(updatedUserDB)

   })
   .then(() => res.redirect("/profile"))
   .catch((error) => next(error));

});




module.exports = router;