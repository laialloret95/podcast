const express = require('express');
const User = require('../models/user');
const Favourite = require('../models/favorites');
const Podcast = require('../models/podcast');
const Comment = require('../models/comment');
const Ratings = require('../models/ratings');
const mongoose = require('mongoose');
const checkIfUserIsLoggedIn = require('../middlewares/auth');
const fileUploader = require('../configs/cloudinary');

const router = express.Router();

//USER ROUTES JUST FOR THE APP MEMBERS - PRIVATE
router.use(checkIfUserIsLoggedIn);

// PROFILE
router.get('/profile', (req, res, next) => {
  const id = req.session.currentUser._id;
  const data = {};

  User
    .findById(id)
    .then((userFromDB) => {
        //Find user profile info
        data.userInfo = userFromDB;
        return userFromDB;
    })
    .then((userFromDB) => {
      //Find Nº of user favorited Podcast
      Favourite
        .find({userIDs: userFromDB._id })
        .populate('podcastID')
        .then(favouritesArray => {
          data['favouritesArray'] = favouritesArray;
        })
        .catch((error) => next(error));

        return userFromDB;
    })
    .then((userFromDB) => {
      //Find Nº of user comments
      Comment
       .find({author: userFromDB._id })
       .then(commentsArray => {
         data['commentsArray'] = commentsArray;
       })
       .catch((error) => next(error));

      return userFromDB;
    })
    .then((userFromDB) => {
      //Find Nº of user ratings
      Ratings
       .find({userID: userFromDB._id })
       .then(ratingsArray => {
         data['ratingsArray'] = ratingsArray;
       })
       .catch((error) => next(error));

      return userFromDB;
    })
    .then((userFromDB) => {
          //Check if user has any podcast saved
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
                    //Push to data 3 suggested podcast
                    data.suggestedPodcast = podcastsDB;
                    res.render('users/profile', { 
                      data,
                      podcastsDB,
                      loggedUser: true
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
                    const [{ podcastID }] = lastFavourited;
                    data.lastFavourited = podcastID;
                    res.render('users/profile', { data, lastSaved: true, loggedUser: true });
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
   .then((userFromDB) => res.render('users/edit-profile', { userFromDB, loggedUser: true }))
   .catch((error) => next(error));
});

router.post('/profile/edit', fileUploader.single('image'), (req, res, next) => {
  const { firstName, lastName, email, preferences } = req.body;
  const id  = req.session.currentUser._id;

  if (!firstName || !lastName || !email ) {
    User
    .findById(id)
    .then((userFromDB) => res.render('users/edit-profile', { userFromDB, loggedUser: true, 
      errorMessage: `Firstname, lastname and email are required fields. 
    Please fill them all to edit your profile.` }));
    return;
  }

  let profilePicture;
  if (req.file) {
    profilePicture = req.file.path;
  } else {
    profilePicture = req.body.existingImage;
  }

  User.findByIdAndUpdate( id, { firstName, lastName, email, preferences, profilePicture }, { new: true })
   .then(() => {
      req.flash('success', "Your profile has been updated successfully!");
      res.redirect("/profile");
   })
   .catch((error) => next(error));
});

//EDIT PROFILE PICTURE 
router.post('/profile/edit/picture', fileUploader.single('image'), (req, res, next) => {
  const id = req.session.currentUser._id;
  console.log(req.body.existingImage);

    let profilePicture;
    if (req.file) {
      profilePicture = req.file.path;
    } else {
      profilePicture = req.body.existingImage;
    }

  User.findByIdAndUpdate( id, { profilePicture }, { new: true })
   .then(() => {
      req.flash('success', "Your profile has been updated successfully!");
      res.redirect("/profile");
   })
   .catch((error) => next(error));
});

module.exports = router;