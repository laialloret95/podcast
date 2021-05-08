const mongoose = require('mongoose');
const Podcast = require('../models/poscast');

// ℹ️ Connects to the database
require("../configs");

//📸 Populate Podcasts

const podcasts = [
    {
        title: 'Lexington Institute Senior Fellow on Chinese Shipping Advantage',
        audio: "https://cdneu.modlitwawdrodze.pl/prayers/MWD_2017_12_01_Pt.mp3",
        language: 'English',
        audio_length: 1281,
        author: "Practical Ecommerce",
        description: 'Listen in as the Practical Ecommerce editorial staff interviews interesting personalities in the ecommerce space.' ,
        pub_date: '2020-12-12',
        image: 'http://is4.mzstatic.com/image/thumb/Music6/v4/81/e6/c0/81e6c012-4521-f8df-6f0c-1439985ae4f0/source/600x600bb.jpg',
        genre: 'Technology',
        ratings: [],
        comments: []
    },
    {
        title: 'This is Marketing Podcast',
        audio: 'http://www.thisismarketingpodcast.com/podcast-download/533/what-ive-learned-on-my-way-to-30000-podcast-listens.mp3',
        language: 'English',
        audio_length: 948,
        author: "Ross Morrone",
        description: "The This is Marketing Podcast is a weekly podcast about digital marketing, branding, advertising and social media from an everyday practitioner. Ross Morrone is the Director of Marketing at Youngstown State University, and a digital marketing consultant. Follow him on Twitter @rossmorrone.",
        pub_date: '2020-12-07',
        image: 'http://is2.mzstatic.com/image/thumb/Music118/v4/9d/80/bb/9d80bbbb-ab5f-f742-880f-aecf657555b4/source/600x600bb.jpg',
        genre: 'Business',
        ratings: [],
        comments: []
    },
    {
        title: 'Fantasy Football Champs',
        audio: 'http://www.patriots.com/sites/patriots.com/files/20171207_ffchamps.mp3',
        language: 'English',
        audio_length: 7020,
        author: "New England Patriots",
        description: "Dominate your league with 120 minutes of non-stop Fantasy Football strategy from fantasy experts Todd DeVries and Bill Enright of ffchamps.com. Listen live every Tuesday from 4-6pm ET on Patriots.com and email your comments to webradio@patriots.com.",
        pub_date: '2019-12-07',
        image: 'http://is4.mzstatic.com/image/thumb/Music62/v4/c5/e9/c4/c5e9c46c-b7da-bb71-27d9-a3e8fe3539e8/source/600x600bb.jpg',
        genre: 'Sports',
        ratings: [],
        comments: []
    },
    {
        title: ,
        audio: ,
        language: ,
        audio_length: ,
        description: ,
        pub_date: ,
        image: ,
        genre: ,
        ratings: [],
        comments: []
    },
    {
        title: ,
        audio: ,
        language: ,
        audio_length: ,
        description: ,
        pub_date: ,
        image: ,
        genre: ,
        ratings: [],
        comments: []
    },

]

Podcast.create(podcasts)
  .then((podcasts) => {
    console.log(`Created ${podcasts.length} celebrities`);
    mongoose.connection.close();
  })
  .catch(err => console.log('error', err))