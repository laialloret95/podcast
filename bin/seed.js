require('dotenv').config();
const mongoose = require('mongoose');
const Podcast = require('../models/podcast');

// ℹ️ Connects to the database
require('../configs/db');

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
        title: 'Shah on why engineers need empathy about users',
        audio: 'http://feeds.soundcloud.com/stream/363461015-factordaily-ep-42-viral-b-shah-on-why-engineers-need-empathy-about-users.mp3',
        language: 'English',
        audio_length: 3279,
        author: 'FactorDaily',
        description: 'The American civil aviation regulator’s next-generation collision avoidance system is built on a relatively new programing language called Julia. You can thank Viral, who along with Alan Edelman, Jeff Bezanson, Stefan Karpinski, Keno Fischer and Deepak Vinchhi, built the language the next time you have a safe flight in the U.S. airspace. Like every profession, engineering is also defined by some awesome coders and architects who are known for the battles they pick and the ones they ignore.  Shah, who was one of the key architects behind Aadhaar payments system, prefers to stay away from the controversies surrounding India’s biometric-based citizen identity program, as I record this episode of Outliers podcast. If you are someone who believes our future will be shaped by next-generation software and machine learning, listen to this conversation.',
        pub_date: '2020-06-19',
        image: 'http://is5.mzstatic.com/image/thumb/Music122/v4/07/ca/e4/07cae478-7925-359b-82fc-9c805538c7d4/source/600x600bb.jpg',
        genre: 'Technology',
        ratings: [],
        comments: []
    },
    {
        title: 'Fake news: 10 consejos de Facebook para indentificarlas',
        audio: 'http://radioberlin.com.ar/media/com_podcastmanager/02Beta/Beta056-Fake-Web-Aus3-15min.mp3',
        language: 'Spanish',
        audio_length: 887,
        author: 'Radio Berlín',
        description:  'Los audios Express de Podcast Linux ya tienen feed.',
        pub_date: '2021-01-12',
        image: 'http://is5.mzstatic.com/image/thumb/Music111/v4/4c/c3/d6/4cc3d6d2-4aea-5188-823d-376610b3ba99/source/600x600bb.jpg',
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
        title: 'MAS QUE TRANSFORMACIÓN DIGITAL',
        audio: 'http://feeds.soundcloud.com/stream/371583971-masqradio-mas-que-transformacion-digital-6-wwwmasqueunaradiocom.mp3',
        language: 'Spanish',
        audio_length: 1908,
        author: 'MásQradio',
        description: 'Se nos acaba el año y Fernando López Abril nos hace un resumen de cómo ha vivido esta transformación digital tan fundamental en la vida de toda empresa. Sus experiencias en sus propias carnes y su paso por la radio en este 2017. ¡No te lo pierdas!',
        pub_date: '2019-04-07',
        image: 'http://is1.mzstatic.com/image/thumb/Music128/v4/2d/fb/68/2dfb6811-93aa-f4f4-188b-d2bc71cdb07d/source/600x600bb.jpg',
        genre: 'Business',
        ratings: [],
        comments: []
    },
    {
        title: 'Mas Que Startups: entrevistas a fundadores de startups sobre su proyecto y sus vidas.',
        audio: 'http://feeds.soundcloud.com/stream/364491407-user-12927515-guillermo-montoya-de-deiser-mqs-t2e9.mp3',
        language: 'Spanish',
        audio_length: 4337,
        author: 'MasQueStartups',
        description: 'El show semanal sobre startups que no te puedes perder. Presentado por Gonzalo Valverde, David Pombar y Alberto Molpeceres.',
        pub_date: '2020-12-07',
        image: 'http://is3.mzstatic.com/image/thumb/Music118/v4/dd/3e/44/dd3e440d-e206-ce56-70e5-78e66862db7f/source/600x600bb.jpg',
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
        title: 'MARCAMotor Competición',
        audio: 'http://www.ivoox.com/2017-12-03-marcamotor-competicion-11-00_mf_22419219_feed_1.mp3',
        language: 'Spanish',
        audio_length: 1810,
        author: 'Radio MARCA',
        description: 'Marca  Motor  Competición  es  el  programa  temático  sobre  el  deporte  del  motor  de  Radio MARCA.  Enfocado  no  solo  las  grandes  competiciones  de  temporada  como  F1,  MotoGP  y WRC;  sino  también  otros  espectáculos  como  el  Xfighters,  las  Road  Races,  WSBK, campeonatos  nacionales  FIM  CEV,  MotoAmerica,  Dakar,  Rallies  nacionales,  campeonatos mundiales  y  europeos  de  karting  y  muchos  otros. Los  valores  deportivos  de  superación,  esfuerzo,  sacrificio  y  victoria  son  los  pilares  que sustentan  nuestros  contenidos.',
        pub_date: '2020-12-07',
        image: 'http://is5.mzstatic.com/image/thumb/Music111/v4/74/8b/18/748b1841-3424-926b-ffbf-da2e6f9c4684/source/600x600bb.jpg',
        genre: 'Sports',
        ratings: [],
        comments: []
    },
    {
        title: 'Block and Tackle Edition: Carolina Panthers',
        audio: 'http://dts.podtrac.com/redirect.mp3/feeds.soundcloud.com/stream/366823730-herb-white-the-charlotte-post-block-and-tackle-edition-carolina-panthers.mp3',
        language: 'English',
        audio_length: 631,
        author: 'The Charlotte Post',
        description: "It's the NFL stretch drive and the duo of Herb White and Ashley Mahoney preview Sunday's Panthers-Vikings game.",
        pub_date: '2020-12-07',
        image: 'http://is1.mzstatic.com/image/thumb/Music62/v4/af/88/20/af8820fd-f853-a59c-1bf3-d817f56ba19d/source/600x600bb.jpg',
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
        title: 'Citizen Science to explore massive data related to galaxies with Kevin Schawinski',
        audio: 'http://feedproxy.google.com/~r/ColperScience/~5/9Sa-FermabI/369499646-colperscience-episode-11-citizen-science-to-explore-massive-data-related-to-galaxies-with-kevin-schawinski.mp3',
        language: 'English',
        audio_length: 3178,
        author: 'Kambiz Chizari, Ilyass Tabiai',
        description: 'Colper Science is a podcast about Open Science.', 
        pub_date: '2021-12-14',
        image: 'http://is1.mzstatic.com/image/thumb/Music117/v4/98/46/fc/9846fced-d6e9-3b15-acde-c07c90e27d0d/source/600x600bb.jpg', 
        genre: 'Science',
        ratings: [],
        comments: []
    },
    {
        title: 'How to celebrate a sustainable Christmas',
        audio: 'http://feeds.soundcloud.com/stream/369533219-influencedbynature-how-to-celebrate-a-sustainable-christmas.mp3',
        language: 'English',
        audio_length: 2513,
        author: 'Nature, climate and environmental podcasting',
        description: 'Influenced by Nature is a podcast for those of us who still believe there is hope for our nature and climate and who want to recognise all the important work going on around the world to support a greener planet. The episodes feature a vast array of interesting guests who aim to keep you up to date on the environmental challenges our modern world is facing while also bringing along solutions and initiatives that we can all benefit from.',
        pub_date: '2021-02-14',
        image: 'http://is3.mzstatic.com/image/thumb/Music82/v4/a3/f4/55/a3f45512-1abf-e606-a9a7-a8743ece3806/source/600x600bb.jpg',
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
    },
    {
        title: 'Interview With Alan Bahr',
        audio: 'http://feeds.soundcloud.com/stream/364725833-tabletopradiohour-interview-with-alan-bahr.mp3',
        language: 'English',
        audio_length: 3983,
        author: 'Tabletop Radio Hour',
        description: 'Your Podcast for everything tabletop.',
        pub_date: '2020-12-07',
        image: 'http://is4.mzstatic.com/image/thumb/Music118/v4/52/37/99/52379936-a24f-e9ae-a280-b8d116431a4c/source/600x600bb.jpg',
        genre: 'Games',
        ratings: [],
        comments: []
    },
    {
        title: 'Super GamesCast 64 Ep. 061 - Wolfenstein 2 Review & Super Mario Odyssey Cereal',
        audio: 'http://feeds.soundcloud.com/stream/363551771-user-98431904-super-gamescast-64-ep-061-wolfenstein-2-review-super-mario-odyssey-cereal.mp3',
        language: 'English',
        audio_length: 54211,
        author: 'Games Untapped',
        description: 'Podcast by Trey Mitchell, Adam Fullerton, & Spencer Hall',
        pub_date: '2020-12-07',
        image: 'http://is3.mzstatic.com/image/thumb/Music62/v4/04/20/8b/04208b8a-7f5b-1e09-db98-1fafb3358d47/source/600x600bb.jpg',
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