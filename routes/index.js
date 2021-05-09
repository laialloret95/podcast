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

module.exports = router;
