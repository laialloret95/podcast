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
        title: 'Medioambiente y polímeros biodegradables',
        audio: 'http://feedproxy.google.com/~r/HablandoConCientficos/~5/Bc1ODi_f6TU/hc_183_polimeros_2.mp3',
        language: 'Spanish',
        audio_length: 3059,
        author: "cienciaes.com",
        description: 'El conocimiento científico crece gracias a la labor de miles de personas que se esfuerzan por encontrar respuestas a los enigmas que plantea la Naturaleza. En cada programa un científico conversa con Angel Rodríguez Lozano y abre para nosotros las puertas de un campo del conocimiento.',
        pub_date: '2019-07-26',
        image: 'http://is4.mzstatic.com/image/thumb/Music4/v4/37/60/3c/37603cc4-0525-9e75-9df1-adf3ed38af93/source/600x600bb.jpg',
        genre: 'Science',
        ratings: [],
        comments: []
    },
    {
        title: 'CX Podcast 5x13 I Especial 2017 : Las sorpresas y decepciones de este año',
        audio: 'http://www.ivoox.com/cx-podcast-5x13-i-especial-2017-las_mf_22475185_feed_1.mp3',
        language: 'Spanish',
        audio_length: 9347,
        author: "Comunidad Xbox",
        description: 'Bienvenidos al podcast de Comunidad Xbox, un espacio donde nuestros participantes hablan sobre videojuegos sin tapujos y con nuestro característico toque de humor.  Estamos seguros que te encantará nuestro podcast. Os contamos cada semana las últimas noticias, analizaremos los últimos juegos y debatiremos sobre temas de actualidad. ¿Qué mas puedes pedir?',
        pub_date: '2017-03-05',
        image: 'http://is5.mzstatic.com/image/thumb/Music71/v4/1a/db/40/1adb4007-bf0a-7bad-81aa-453fb339beb6/source/600x600bb.jpg',
        genre: 'Games',
        ratings: [],
        comments: []
    }
];

Podcast.create(podcasts)
  .then((podcastsDB) => {
    console.log(`Created ${podcastsDB.length} celebrities`);
    mongoose.connection.close();
  })
  .catch(err => console.log('error', err))