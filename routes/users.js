const express = require('express');
const User = require('../models/user');
const Favourite = require('../models/favorites');
const Podcast = require('../models/podcast');
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
    .then((userFromDB) => {
        return userFromDB;
    })
    .then((userFromDB) => {
          ////Check if user has any podcast saved
          Favourite
            .findOne({userIDs: userFromDB._id})
            .then( favouritesDB => {
              if (!favouritesDB) {
                 // If user has no favourites yet
                Podcast
                  .find()
                  .limit(3)
                  .sort({ pub_date: -1 })
                  .then(podcastsDB => {
                    res.render('users/profile', { 
                      userFromDB, 
                      favorited: 0, 
                      playlist: 0, // needs to be updated - default values
                      comments: 0, // needs to be updated - default values
                      podcastsDB 
                    });
                  });
              } else {
                // If user has already favourited some podcasts
                //Find the one he/she saved
                 Favourite
                  .find({userIDs: userFromDB._id})
                  .populate('podcastID')
                  .find()
                  .limit(1)
                  .sort({createdAt: -1})
                  .then(lastFavourited => {
                    console.log(lastFavourited);
                    const [{ podcastID }] = lastFavourited;
                    res.render('users/profile', { userFromDB, podcastID, lastSaved: true });
                  });
              }
          });
    })
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
   .then(() => {
      req.flash('success', "Your profile has been updated successfully!");
      res.redirect("/profile");
   })
   .catch((error) => next(error));
});

module.exports = router;