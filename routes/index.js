const express = require('express');
const router = express.Router();
const Podcast = require('../models/podcast');
const Favourite = require('../models/favorites');
const Comment = require('../models/comment');
const User = require('../models/user');
const Rating = require('../models/ratings');

// HOME PAGE
router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
        // get the 6 newest Podcasts
        User
          .findById(req.session.currentUser._id)
          .select({ "preferences": 1, "_id": 0})
          .then(userDB => {
            Podcast
              .find({genre: { "$in": userDB.preferences } })
              .sort({ audio_length: -1 })
              .limit(6)
              .then(podcastsDB => {
                res.render('index', { podcastsDB, loggedUser: true });
              });
          })
          .catch(error => next(error));

  } else {
        // get the 6 newest Podcasts
        Podcast.find({})
          .limit(6)
          .sort({ pub_date: -1 })
          .then(podcastsDB => {
            res.render('index', { podcastsDB });
          })
        .catch(error => next(error));
  }
});

// GENRE SEARCH
router.get('/podcasts/:genre', (req, res, next) => {
  const { genre } = req.params;

  if (req.session.currentUser) {
    return Podcast.find({ genre: genre })
      .then(podcastsDB => {
        res.render('podcasts/show', { podcastsDB, loggedUser: true, genre });
      })
      .catch(error => next(error));
  } else {
    return Podcast.find({ genre: genre })
      .then(podcastsDB => {
        res.render('podcasts/show', { podcastsDB, genre });
      })
      .catch(error => next(error));
  }
});

// QUERY SEARCH
router.post('/podcasts/search', (req, res, next) => {
  const keywords = req.body.keywords.toLowerCase();

  if (req.session.currentUser) {
    Podcast.find({ $or: [{ titleLowerCase: { $regex: keywords } }, { authorLowerCase: { $regex: keywords } }, { descriptionLowerCase: { $regex: keywords } }] })
    .then(podcastsDB => {
      res.render('podcasts/show', { podcastsDB, keywords, loggedUser: true });
    })
    .catch(error => next(error));
  } else {
    Podcast.find({ $or: [{ titleLowerCase: { $regex: keywords } }, { authorLowerCase: { $regex: keywords } }, { descriptionLowerCase: { $regex: keywords } }] })
    .then(podcastsDB => {
      res.render('podcasts/show', { podcastsDB, keywords });
    })
    .catch(error => next(error));
  }

});

// PODCAST DETAIL
router.get('/podcasts/profile/:id', (req, res, next) => {
  const { id } = req.params;
  let userData;

  if (req.session.currentUser) {
    const userID = req.session.currentUser._id;
    // If user is logged
    Podcast.findById(id)
      .populate('ratings')
      .populate('comments')
      .populate({
        // we are populating author in the previously populated comments
        path: 'comments',
        populate: {
          path: 'author',
          model: User
        }
      })
      .then((podcastDB) => {
        User
        .findById(userID)
        .then((userDB) => {
          userData = userDB;
          const loggedUser = req.session.currentUser;
          Favourite
            .find({ $and: [{ podcastID: id }, { userIDs: userID }] })
            .then(favouriteDB => {
              if (favouriteDB.length > 0) {
                // If podcast has been favourited by the user
                res.render('podcasts/profile', { podcastDB, loggedUser, userData, favouritedPocast: true, userID });
              } else {
                // If podcast has not been favourited by the user
                res.render('podcasts/profile', { podcastDB, loggedUser, userData, userID });
              }
            });
        });
      })
      .catch(error => next(error));
  } else {
    // If unlogged user
    Podcast.findById(id)
      .populate('ratings')
      .populate('comments')
      .populate({
        // we are populating author in the previously populated comments
        path: 'comments',
        populate: {
          path: 'author',
          model: User
        }
      })
      .then(podcastDB => {
        res.render('podcasts/profile', { podcastDB });
      })
      .catch(error => next(error));
  }
});

//FAVOURITES
router.get('/favourites/:podID', (req, res, next) => {
  const { podID } = req.params;
  const userID = req.session.currentUser._id;

  Favourite.findOne({ podcastID: podID }).then(podcastDB => {
    if (!podcastDB) {
      // If podcast has never been favorited by anu user
      const newFavourite = new Favourite({ podcastID: podID, userIDs: userID });
      newFavourite
        .save()
        .then(() => {
          req.flash('success', 'Favourite Added!');
          res.redirect(`/podcasts/profile/${podID}`);
        })
        .catch(error => next(error));
    } else if (podcastDB.userIDs.includes(userID)) {
      // If podcast has already been favorited by this user
      req.flash('warning', 'You have already favourited this podcast!');
      res.redirect(`/podcasts/profile/${podID}`);
    } else {
      // If podcast has been favorited by another user
      Favourite.findOneAndUpdate({ podcastID: podID }, { $push: { userIDs: userID } })
        .then(() => {
          req.flash('success', 'Favourite Added!');
          res.redirect(`/podcasts/profile/${podID}`);
        })
        .catch(error => next(error));
    }
  });
});

router.get('/favourites', (req, res, next) => {
  const userID = req.session.currentUser._id;

  Favourite.find({ userIDs: userID })
    .populate('podcastID')
    .then(favouritesDB => {
      res.render('users/favourites', { favouritesDB, loggedUser: true });
    })
    .catch(error => next(error));
});

router.post('/favourites/:podID/delete', (req, res, next) => {
  const { podID } = req.params;
  const userID = req.session.currentUser._id;

  Favourite.findOneAndUpdate({ podcastID: podID }, { $pull: { userIDs: userID } })
    .then(() => {
      res.redirect('/favourites');
    })
    .catch(error => next(error));
});

// COMMENTS
router.post('/podcasts/profile/:podID/addComment', (req, res, next) => {
  const { podID } = req.params;
  const userID = req.session.currentUser._id;
  const { text } = req.body;

  Comment.create({
    content: text,
    author: userID
  })
    .then(commentDB => {
      Podcast.findOneAndUpdate({ _id: podID }, { $push: { comments: commentDB._id } }).then(() => {
        res.redirect(`/podcasts/profile/${podID}`);
      });
    })
    .catch(error => next(error));
});

router.get('/podcast/:podcastID/comment/:commentID/edit', (req, res, next) => {
  const { podcastID, commentID } = req.params;
  const userID = req.session.currentUser._id;

  Comment.findById(commentID)
    .then(commentDB => {
      Podcast.findById(podcastID)
      .then(podcastDB => {
        User
          .findById(userID)
          .then(userDB => {
            res.render('comments/edit-comment', { podcastDB, commentDB, userDB, loggedUser: true });
          });
      });
    })
    .catch(error => next(error));
});

router.post('/podcast/:podcastID/comment/:commentID/edit', (req, res, next) => {
  const { podcastID, commentID } = req.params;
  const { content } = req.body;

  Comment.findByIdAndUpdate(commentID, { content }, { new: true })
    .then(() => {
      res.redirect(`/podcasts/profile/${podcastID}`);
    })
    .catch(error => next(error));
});

router.post('/podcast/:podcastID/comment/:commentID/delete', (req, res, next) => {
  const { podcastID, commentID } = req.params;

  Podcast.findOneAndUpdate({ _id: podcastID }, { $pull: { comments: commentID } })
    .then(() => {
      Comment.findByIdAndDelete(commentID).then(() => {
        res.redirect(`/podcasts/profile/${podcastID}`);
      });
    })
    .catch(error => next(error));
});

// RATINGS

router.get('/podcast/:podcastID/rating', (req, res, next) => {
    const { podcastID }  = req.params;

    Podcast
        .findById(podcastID)
        .then( podcastDB => {
            res.render("podcasts/rating", { podcastDB, loggedUser: true } );
        })
        .catch(error => next(error));
});

router.post('/podcast/:podID/rating/:rate', (req, res, next) => {
    const { podID }  = req.params;
    const userId = req.session.currentUser._id;
    const rate = parseFloat(req.params.rate);

    Rating
      .create({
        podcastID: podID,
        userID: userId,
        rating: rate
      })
      .then(ratingDB => {
        Podcast
          .findOneAndUpdate({ _id: podID }, { $push: { ratings: ratingDB._id } })
          .then(() => {
            res.redirect(`/podcasts/profile/${podID}`);
          });
      })
      .catch(error => next(error));
});

module.exports = router;
