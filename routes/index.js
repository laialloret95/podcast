const express = require('express');
const Podcast = require('../models/podcast');
const router = express.Router();

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

    Podcast.find({genre: genre})
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
    let loggedUser;

    if (req.session.currentUser) {
        loggedUser = true;
        Podcast
            .findById(id)
            .then(podcastDB => {
            res.render('podcasts/profile', {podcastDB, loggedUser});
            })
            .catch(error => next(error));
    } else {
        Podcast
        .findById(id)
        .then(podcastDB => {
          res.render('podcasts/profile', {podcastDB});
        })
        .catch(error => next(error));
    }
});

module.exports = router;
