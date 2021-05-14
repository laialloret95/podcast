const express = require('express');
const router = express.Router();
const Podcast = require('../models/podcast');
const Favourite = require('../models/favorites');
const Comment = require('../models/comment');
const User = require('../models/user');

// HOME PAGE
router.get('/', (req, res, next) => {
    // get unique genres
    Podcast
        .find()
        .distinct("genre")
        .then(genresDB => {
            return genresDB;
        })
        .then((genresDB) => {
            // get the 6 newest Podcasts
            Podcast
                .find({})
                .limit(6)
                .sort({pub_date: -1})
                .then(podcastsDB => {
                    res.render('index', {podcastsDB, genresDB});
                });
        })
        .catch(error => next(error));
});

// GENRE SEARCH
router.get('/podcasts/:genre', (req, res, next) => {
    const { genre } = req.params;

    Podcast
        .find({genre: genre})
        .then(podcastsDB => {
        res.render('podcasts/show', {podcastsDB});
        })
        .catch(error => next(error));
});

// QUERY SEARCH
router.post('/podcasts/search', (req, res, next) => {
    const keywords = req.body.keywords.toLowerCase();
    
    Podcast
        .find({ $or: [{ title : { $regex: keywords} }, { author : { $regex: keywords} }, { description : { $regex: keywords} }]})
        .then(podcastsDB => {
            res.render('podcasts/show', {podcastsDB});
        })
        .catch(error => next(error));
});

// PODCAST DETAIL
router.get('/podcasts/profile/:id', (req, res, next) => {
    const { id } = req.params;

    if (req.session.currentUser) {
        const userID = req.session.currentUser._id;
        // If user is logged
        Podcast
            .findById(id)
            .populate("comments")
            .populate({
                // we are populating author in the previously populated comments
                path: 'comments',
                populate: {
                  path: 'author',
                  model: User
                }
            })
            .then(podcastDB => {
                Favourite
                    .find({ $and: [ {podcastID:id}, {userIDs: userID}] })
                    .then(favouriteDB => {
                        if (favouriteDB.length > 0) {
                        // If podcast has been favourited by the user
                            res.render('podcasts/profile', {podcastDB, loggedUser: true, favouritedPocast: true});
                        } else {
                        // If podcast has not been favourited by the user
                            res.render('podcasts/profile', {podcastDB, loggedUser: true});
                        }
                    });
            })
            .catch(error => next(error));
    } else {
        // If unlogged user
        Podcast
            .findById(id)
            .populate("comments")
            .populate({
                // we are populating author in the previously populated comments
                path: 'comments',
                populate: {
                path: 'author',
                model: User
                }
            })
            .then(podcastDB => {
                res.render('podcasts/profile', {podcastDB});
            })
            .catch(error => next(error));
    }
});

//FAVOURITES
router.get('/favourites/:podID', (req, res, next) => {
    const { podID } = req.params;
    const userID = req.session.currentUser._id;

    Favourite
        .findOne({podcastID: podID})
        .then( podcastDB => {
            if (!podcastDB) {
                // If podcast has never been favorited by anu user
                const newFavourite = new Favourite({podcastID: podID, userIDs: userID});
                newFavourite
                    .save()
                    .then(() => {
                        req.flash('success','Favourite Added!');
                        res.redirect(`/podcasts/profile/${podID}`);
                    })
                    .catch(error => next(error));
            } else if (podcastDB.userIDs.includes(userID)) {
                // If podcast has already been favorited by this user
                req.flash('warning','You have already favourited this podcast!');
                res.redirect(`/podcasts/profile/${podID}`);
            } else {
                // If podcast has been favorited by another user
                Favourite
                    .findOneAndUpdate({podcastID: podID}, { $push: { userIDs: userID } })
                    .then(() => {
                        req.flash('success','Favourite Added!');
                        res.redirect(`/podcasts/profile/${podID}`);
                    })
                    .catch(error => next(error));
            }
        });
});

router.get('/favourites', (req,res, next) => {
    const userID = req.session.currentUser._id;

    Favourite
        .find({userIDs: userID})
        .populate('podcastID')
        .then(favouritesDB => {
            res.render("users/favourites", {favouritesDB});
        })
        .catch(error => next(error));
});

router.post('/favourites/:podID/delete', (req, res, next) => {
    const { podID } = req.params;
    const userID = req.session.currentUser._id;
  
    Favourite
        .findOneAndUpdate({podcastID: podID}, { $pull: { userIDs: userID } })
        .then(() => {
            res.redirect('/favourites');
        })
        .catch(error => next(error));
  });

// COMMENTS
router.post("/podcasts/profile/:podID/addComment", (req,res, next) => {
    const { podID } = req.params;
    const userID = req.session.currentUser._id;
    const { text } = req.body

    Comment
        .create({
            content: text,
            author: userID
        })
        .then((commentDB) => {
            Podcast
                .findOneAndUpdate({_id: podID}, { $push: { comments: commentDB._id } })
                .then(() => {
                    res.redirect(`/podcasts/profile/${podID}`);
                });
        })
        .catch(error => next(error));
});

module.exports = router;
