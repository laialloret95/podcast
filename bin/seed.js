require('dotenv').config();
const mongoose = require('mongoose');
const Podcast = require('../models/podcast');

// ℹ️ Connects to the database
require('../configs/db');

//📸 Populate Podcasts

const podcasts = [
    {
        title: 'Chinese Shipping Advantage',
        audio: "https://cdneu.modlitwawdrodze.pl/prayers/MWD_2017_12_01_Pt.mp3",
        language: 'English',
        audio_length: '00:08:10',
        author: "Practical Ecommerce",
        description: 'Listen in as the Practical Ecommerce editorial staff interviews interesting personalities in the ecommerce space.' ,
        pub_date: '2020-12-12',
        image: 'http://is4.mzstatic.com/image/thumb/Music6/v4/81/e6/c0/81e6c012-4521-f8df-6f0c-1439985ae4f0/source/600x600bb.jpg',
        genre: 'Technology',
        ratings: [],
        comments: []
    },
    {
        title: 'Time to replace your AirPods?',
        audio: 'https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/bc269698-5761-4c21-b2a3-668c309d3fb4.mp3',
        language: 'English',
        audio_length: '00:04:10',
        author: 'Talking Tech',
        description: "Amazon just released its second-generation Echo Buds. How do they compare to Apple's AirPods?",
        pub_date: '2021-05-17',
        image: 'https://cdn-images-1.listennotes.com/podcasts/talking-tech-with-jefferson-graham-usa-GCi-QXshF1_-Z2BRitPLKc4.1400x1400.jpg',
        genre: 'Technology',
        ratings: [],
        comments: []
    },
    {
        title: 'Co-founder and CEO, Mindset Health',
        audio: 'https://stream.redcircle.com/episodes/18ea0edb-ee66-495f-b57b-56fd10abea90/stream.mp3',
        language: 'English',
        audio_length: '00:29:08',
        author: 'Elaine Zelby',
        description: "In this episode, I speak with Alex Naoumidis, Co-founder and CEO of Mindset Health, a company building mobile hypnotherapy programs to help people with chronic conditions manage and improve their health, without drugs or diets. We discuss the power of the mind-body connection, the difference between hypnosis and meditation, and what it's like building a company with his brother.",
        pub_date: '2021-03-11',
        image: 'https://cdn-images-1.listennotes.com/podcasts/unsexy-yjV1zBE4XmA-OzhDMCjYXR8.1400x1400.jpg',
        genre: 'Technology',
        ratings: [],
        comments: []
    },
    {
        title: 'Has the Internet Permanently Changed How We Speak?',
        audio: 'https://chtbl.com/track/8E527/traffic.megaphone.fm/STU7999083738.mp3',
        language: 'English',
        audio_length: '00:49:26',
        author: 'Wild Wild Tech',
        description: "You may not realize it, but that smartphone in your pocket has influenced how you and much of the world speaks to each other. This week, Jordan and Joshua speak with two linguists to discuss how internet culture and even the act of texting has completely morphed the way the world communicates with each other. First, linguist David Crystal discusses how language has always evolved and changed, but the rapid-fire evolution of communication technology has thrown that change into hyperdrive. Plus, linguist Gretchen McCulloch explains more specifically how internet lingo has created a new form of language, merging written and spoken language, which is creating a generational gap, even between people born within a few years of each other. Whether you like it or not, the way you speak has been influenced by the technology around us. The question is, is this just a natural progression that has happened since the beginning of spoken language, or a sign of the decay of our society?",
        pub_date: '2021-01-13',
        image: 'https://cdn-images-1.listennotes.com/web/image/839fea0f5e284b62a83b291031676e4b.jpg',
        genre: 'Technology',
        ratings: [],
        comments: []
    },
    {
        title: 'Tech Stocks to Watch',
        audio: 'https://traffic.megaphone.fm/WSJ2312924283.mp3',
        language: 'English',
        audio_length: '00:34:31',
        author: 'Barron Live',
        description: 'The outlook for tech companies and individual stocks.',
        pub_date: '2021-01-04',
        image: 'https://cdn-images-1.listennotes.com/podcasts/barrons-live-barrons-live-cMSlgpCar0t-U1WAwOBTqec.1400x1400.jpg',
        genre: 'Technology',
        ratings: [],
        comments: []
    },
    {
        title: 'AI Making Developers more Effective',
        audio: 'https://www.buzzsprout.com/1702705/8207034-ai-making-developers-more-effective.mp3?blob_id=37099065',
        language: 'English',
        audio_length: '00:26:06',
        author: 'Data Crunch',
        description: "Robin Purohit talks to us about how he and his company are creating AI tools to help developers be more effective. Learn what their approach is, how they're training their models, and where they're headed in the future. ",
        pub_date: '2021-03-24',
        image: 'https://cdn-images-1.listennotes.com/podcasts/data-crunch-data-crunch-corporation-4j0FvV17prN-OYQzTM_3avs.1400x1400.jpg',
        genre: 'Technology',
        ratings: [],
        comments: []
    },
    {
        title: 'This is Marketing Podcast',
        audio: 'http://www.thisismarketingpodcast.com/podcast-download/533/what-ive-learned-on-my-way-to-30000-podcast-listens.mp3',
        language: 'English',
        audio_length: '00:15:47',
        author: "Ross Morrone",
        description: "The This is Marketing Podcast is a weekly podcast about digital marketing, branding, advertising and social media from an everyday practitioner. Ross Morrone is the Director of Marketing at Youngstown State University, and a digital marketing consultant. Follow him on Twitter @rossmorrone.",
        pub_date: '2020-12-07',
        image: 'http://is2.mzstatic.com/image/thumb/Music118/v4/9d/80/bb/9d80bbbb-ab5f-f742-880f-aecf657555b4/source/600x600bb.jpg',
        genre: 'Business',
        ratings: [],
        comments: []
    },
    {
        title: 'Mas que Transformación Digital',
        audio: 'http://feeds.soundcloud.com/stream/371583971-masqradio-mas-que-transformacion-digital-6-wwwmasqueunaradiocom.mp3',
        language: 'Spanish',
        audio_length: '00:31:48',
        author: 'MásQradio',
        description: 'Se nos acaba el año y Fernando López Abril nos hace un resumen de cómo ha vivido esta transformación digital tan fundamental en la vida de toda empresa. Sus experiencias en sus propias carnes y su paso por la radio en este 2017. ¡No te lo pierdas!',
        pub_date: '2019-04-07',
        image: 'http://is1.mzstatic.com/image/thumb/Music128/v4/2d/fb/68/2dfb6811-93aa-f4f4-188b-d2bc71cdb07d/source/600x600bb.jpg',
        genre: 'Business',
        ratings: [],
        comments: []
    },
    {
        title: "All Business Ain't Good Business",
        audio: 'https://www.podtrac.com/pts/redirect.mp3/chtbl.com/track/5899E/traffic.megaphone.fm/HSW2855967425.mp3?updated=1612208508',
        language: 'Spanish',
        audio_length: '01:27:13',
        author: 'iHeartRadio',
        description: "On the first day of black history month we opened up the phone lines to see what out listeners thought about the Wendy Williams Lifetime movie, and we also had listeners call up to give their opinion on supporting black businesses. Also, Charlamagne gave 'Donkey of the Day' to the Rochchester police for pepper spraying a 9 year old girl.",
        pub_date: '2021-02-01',
        image: 'https://cdn-images-1.listennotes.com/podcasts/the-breakfast-club-iheartradio-a1osE7JyQLW-N_g1xV3Kl78.1400x1400.jpg',
        genre: 'Business',
        ratings: [],
        comments: []
    },
    {
        title: 'Pro Travel Hacks for Every Aspect of Your Next Trip',
        audio: 'https://cdn.simplecast.com/audio/fcaf6780-b158-4fc2-8b9f-57cc572b9e2f/episodes/bf221c7a-652f-482e-bd38-8df1199dbe2c/audio/a3834b2c-d326-40d5-8673-2b080b3ee6a5/default_tc.mp3?aid=rss_feed&feed=JDkMQxK_',
        language: 'English',
        audio_length: '00:54:50',
        author: 'Chris Hutchins',
        description: 'The travel hacks you need for your next trip, including getting the best prices on flights and hotels, having authentic local experiences and not getting ripped off changing money.',
        pub_date: '2021-01-14',
        image: 'https://cdn-images-1.listennotes.com/podcasts/all-the-hacks-gh2joFKBIWP-DUqFu5sPVGC.1400x1400.jpg',
        genre: 'Business',
        ratings: [],
        comments: []
    },
    {
        title: 'A Powerful Business Case for Happier Workers',
        audio: 'https://chrt.fm/track/3GE73/nyt.simplecastaudio.com/4cadbda2-556d-4d69-a8cc-d9ca906f7f1a/episodes/26cb49f6-27d9-4e0e-86b7-afc3208474c8/audio/128/default.mp3?aid=rss_feed&awCollectionId=4cadbda2-556d-4d69-a8cc-d9ca906f7f1a&awEpisodeId=26cb49f6-27d9-4e0e-86b7-afc3208474c8&feed=J6oAIHuK',
        language: 'English',
        audio_length: '00:29:53',
        author: 'Accenture',
        description: "Can anything erase the historic tension between employers and workers, create trust and leave both parties better off? Groundbreaking new research from Accenture is paving the way for a new paradigm in modern business: Companies that help employees truly thrive, personally as well as professionally, are the ones that will win in the market of the future. While some leaders have long been sympathetic to this idea, the business case was harder to prove — until now. Ellyn Shook, Chief Leadership and Human Resources Officer of Accenture, and David Rodriguez, CHRO of Marriott, describe how they collaborated on Accenture’s “Care to Do Better” report, and explain its revolutionary stance: Caring for employees across personal and financial dimensions is not only the best way to unlock people’s true potential, it’s better for business.",
        pub_date: '2021-05-11',
        image: 'https://cdn-images-1.listennotes.com/podcasts/built-for-change-bjTiNo0pY4c-sRZa48ULEk6.1400x1400.jpg',
        genre: 'Business',
        ratings: [],
        comments: []
    },
    {
        title: 'Contratar talento es muy dificil',
        audio: 'https://anchor.fm/s/a0c1e80/podcast/play/25867236/https:%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-0-28%2F8be4c861-2860-a08c-9e47-1c05d04525bf.mp3',
        language: 'Spanish',
        audio_length: '00:23:34',
        author: 'Jorge Louis Caballero',
        description: "Jorge Louis caballero es ingeniero, escritor, conferencista, geek inadaptado y emprendedor de alto impacto en Google Launchpad en Silicon Valley. Participante exitoso del programa Shark Tank. Tedx Speaker. CEO y fundador de PATHBOOKS, la plataforma de lectura interactiva más importante del mundo.",
        pub_date: '2021-01-28',
        image: 'https://cdn-images-1.listennotes.com/podcasts/hackeando-silicon-valley-emprendimiento-de-S0TXfq2KtOA-otXa08hJgsT.1400x1400.jpg',
        genre: 'Business',
        ratings: [],
        comments: []
    },
    {
        title: 'Workout design principles',
        audio: 'https://chtbl.com/track/39788/traffic.libsyn.com/secure/thattriathlonshow/Workout_design_principles_-_TTS_Thursday_8.mp3?dest-id=475576',
        language: 'English',
        audio_length: '00:43:51',
        author: 'Mikael Eriksson',
        description: "How important is workout design?, Common mistakes in workout design, Advice for designing specific types of workouts (VO2max, threshold, strength & stamina, fatigue resistance etc.) & The workout design process - step by step",
        pub_date: '2021-04-21',
        image: 'https://cdn-images-1.listennotes.com/podcasts/that-triathlon-show-mikael-eriksson-MNLYx6Cmeu7-i9mQxsGAf_K.1400x1400.jpg',
        genre: 'Sports',
        ratings: [],
        comments: []
    },
    {
        title: 'Motor Competición',
        audio: 'http://www.ivoox.com/2017-12-03-marcamotor-competicion-11-00_mf_22419219_feed_1.mp3',
        language: 'Spanish',
        audio_length: '00:20:06',
        author: 'Radio MARCA',
        description: 'Marca  Motor  Competición  es  el  programa  temático  sobre  el  deporte  del  motor  de  Radio MARCA.  Enfocado  no  solo  las  grandes  competiciones  de  temporada  como  F1,  MotoGP  y WRC;  sino  también  otros  espectáculos  como  el  Xfighters,  las  Road  Races,  WSBK, campeonatos  nacionales  FIM  CEV,  MotoAmerica,  Dakar,  Rallies  nacionales,  campeonatos mundiales  y  europeos  de  karting  y  muchos  otros. Los  valores  deportivos  de  superación,  esfuerzo,  sacrificio  y  victoria  son  los  pilares  que sustentan  nuestros  contenidos.',
        pub_date: '2020-12-07',
        image: 'http://is5.mzstatic.com/image/thumb/Music111/v4/74/8b/18/748b1841-3424-926b-ffbf-da2e6f9c4684/source/600x600bb.jpg',
        genre: 'Sports',
        ratings: [],
        comments: []
    },
    {
        title: 'Straight Shooting with Clint Dempsey',
        audio: 'https://rss.art19.com/episodes/70844432-4ed2-4ca9-aaf4-d5dd5d3f960f.mp3',
        language: 'English',
        audio_length: '01:06:48',
        author: 'The Crack Podcast',
        description: 'Our hosts are joined by US Soccer Legend Clint Dempsey! Subscribe to listen to all of us talk about the moment he knew it was time to step away from soccer, what was his biggest motivation throughout his career & so much more!',
        pub_date: '2020-12-07',
        image: 'https://cdn-images-1.listennotes.com/podcasts/the-crack-podcast-the-crack-podcast-tucU84mrxQK-Ps98K3UGADx.1400x1400.jpg',
        genre: 'Sports',
        ratings: [],
        comments: []
    },
    {
        title: "The Goal That Started It All",
        audio: 'https://traffic.megaphone.fm/JWS2299230186.mp',
        language: 'English',
        audio_length: '00:51:21',
        author: 'Just Womens Sports',
        description: "Hosts Lynn Williams and Sam Mewis catch us up on the history of their friendship, from an awkward first carpool to the fateful goal that led them to becoming roommates. The two then take us along as they unpack the last year, discussing changes in their careers, the importance of having honest conversations about race, and how they’ve grown as both players and individuals. Lastly, they dish advice on just how often you really need to wash your towels and sheets.",
        pub_date: '2021-05-11',
        image: "https://cdn-images-1.listennotes.com/podcasts/snacks-roGtA2LVHUw-mXKOGHd2yCe.1400x1400.jpg",
        genre: 'Sports',
        ratings: [],
        comments: []
    },
    {
        title: 'Breaking barriers to cycling for women',
        audio: 'http://open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download/proto/http/vpid/p09g68t6.mp3',
        language: 'English',
        audio_length: '00:43:53',
        author: 'BBC Radio 4',
        description: "Have you always wanted to get on a bike, but something is holding you back? This is the programme for you, presented by Melanie Abbott. If you're completely new to cycling, there's no doubt it's intimidating on the roads. It's definitely worth sharpening up your road sense and many local councils now offer bike training courses. In East London, Bikeworks run cycling for wellbeing sessions for women returning to their bikes, after a long break. Melanie goes out with a group who've been cycling together now for a few weeks. Cycling is still, predominantly a male, middle class sport. Getting more women involved isn't easy, especially for women of colour. British Cycling, which covers everything from elite sport to grass roots, has set up its first ever diversity programme. and will be publishing its strategy in the coming months. Aneela McKenna is co chair of their diversity and inclusion advisory group. She joins Melanie along with Iffat Tejani, founder of Evolve, a cycling club for Muslim women and Victoria Hazael from the charity Cycling UK, who is a trustee of the Women of Colour in Cycling Collective.",
        pub_date: '2021-05-03',
        image: 'https://cdn-images-1.listennotes.com/podcasts/womans-hour-bbc-radio-4-AF6I3MZd2Nw-4hsKPbd81FN.1400x1400.jpg',
        genre: 'Sports',
        ratings: [],
        comments: []
    },
    {
        title: 'How To Become A Pisteur',
        audio: 'https://audioboom.com/posts/7817856.mp3?modified=1615226782&source=rss&stitched=1',
        language: 'English',
        audio_length: '00:35:39',
        author: 'The Ski Podcast',
        description: "Tom Greenall is founder of Idris Skis and ran a cat skiing operation in Japan for three years, The first qualification required is a Fleche Vermillion, which he passed on his second attempt. Glen Plake has been coming to Chamonix since 1987 (this will be the first winter he's missed since then). The Test Technique for the ski patrol took Tom four attempts: Puy St Vincent, then Chatel, Serre Chevalier and then finally passing at Puy St Vincent. The Premiere Secours Equipe Niveau 1 & 2 is the standard rescue industry first aid course. Tom’s Pisteur Course cost €3000 and took place in Les Orres",
        pub_date: '2021-03-08',
        image: 'https://cdn-images-1.listennotes.com/podcasts/the-ski-podcast-the-ski-podcast-veV23n6PAYL-MkfE-Cxdh_S.1400x1400.jpg',
        genre: 'Sports',
        ratings: [],
        comments: []
    },
    {
        title: 'Medioambiente y polímeros biodegradables',
        audio: 'http://feedproxy.google.com/~r/HablandoConCientficos/~5/Bc1ODi_f6TU/hc_183_polimeros_2.mp3',
        language: 'Spanish',
        audio_length: '00:50:34',
        author: "cienciaes.com",
        description: 'El conocimiento científico crece gracias a la labor de miles de personas que se esfuerzan por encontrar respuestas a los enigmas que plantea la Naturaleza. En cada programa un científico conversa con Angel Rodríguez Lozano y abre para nosotros las puertas de un campo del conocimiento.',
        pub_date: '2019-07-26',
        image: 'http://is4.mzstatic.com/image/thumb/Music4/v4/37/60/3c/37603cc4-0525-9e75-9df1-adf3ed38af93/source/600x600bb.jpg',
        genre: 'Science',
        ratings: [],
        comments: []
    },
    {
        title: 'Inside the Mind',
        audio: 'https://flex.acast.com/downloads.nakeddiscovery.com/downloads/active/Naked_Neuroscience_21.04.23.mp3',
        language: 'English',
        audio_length: '00:34:39',
        author: 'Naked Scientists',
        description: "We're pondering the mysterious mind - what is it? Are us humans unique in having one? And where does the brain fit in? Plus we chat over some of the latest neuroscience news with local experts",
        pub_date: '2021-04-22',
        image: 'https://cdn-images-1.listennotes.com/podcasts/naked-neuroscience-from-the-naked-D5CJvaSikQY-iuHC259pE0L.1400x1400.jpg',
        genre: 'Science',
        ratings: [],
        comments: []
    },
    {
        title: 'How to celebrate a sustainable Christmas',
        audio: 'http://feeds.soundcloud.com/stream/369533219-influencedbynature-how-to-celebrate-a-sustainable-christmas.mp3',
        language: 'English',
        audio_length: '00:41:53',
        author: 'Nature, climate and environmental podcasting',
        description: 'Influenced by Nature is a podcast for those of us who still believe there is hope for our nature and climate and who want to recognise all the important work going on around the world to support a greener planet. The episodes feature a vast array of interesting guests who aim to keep you up to date on the environmental challenges our modern world is facing while also bringing along solutions and initiatives that we can all benefit from.',
        pub_date: '2021-02-14',
        image: 'http://is3.mzstatic.com/image/thumb/Music82/v4/a3/f4/55/a3f45512-1abf-e606-a9a7-a8743ece3806/source/600x600bb.jpg',
        genre: 'Science',
        ratings: [],
        comments: []
    },
    {
        title: 'A virus that could heal people',
        audio: 'https://chtbl.com/track/524GE/traffic.megaphone.fm/VMP9007930450.mp3?updated=1619557051',
        language: 'English',
        audio_length: '00:24:33',
        author: 'Vox',
        description: 'In 2016, the UN declared antibiotic-resistant bacteria the “greatest and most urgent global risk.” Our best hope just might be phages, or viruses that attack bacteria. Phages’ potential is enormous, but so is everything we don’t know about them.',
        pub_date: '2021-04-28',
        image: 'https://cdn-images-1.listennotes.com/podcasts/unexplainable-vox-Lg5qhN4iHlK-c6o1ENwsykT.1400x1400.jpg',
        genre: 'Science',
        ratings: [],
        comments: []
    },
    {
        title: 'The artists of the animal kingdom',
        audio: 'https://sphinx.acast.com/bbcearthpodcast/theartistsoftheanimalkingdom/media.mp3',
        language: 'English',
        audio_length: '00:28:44',
        author: 'BBC Earth',
        description: "In this episode, we’re displaying the most impressive artists of the animal kingdom. From tiny visual masterpieces, to animals that can dance to a beat, we’re shining a spotlight on the art that can be found in nature. Deep in the Amazon rainforest, there’s a tiny structure that (if you’re able to spot it) catches your eye. The intricate silk henge is a mini masterpiece, and for some time nobody could say exactly what it was or why it existed. Phil Torres takes us on his journey of discovery and demystification. Next we’re exploring whether animals can dance to a beat and, if so, why? To help us try and answer that, we hear from Henkjan Honing, professor of Music Cognition at the University of Amsterdam. Finally, we turn our attention to Northern Australia’s great bowerbird. What can the males' elaborate constructions teach us about perspective?",
        pub_date: '2021-03-29',
        image: 'https://cdn-images-1.listennotes.com/podcasts/bbc-earth-podcast-bbc-earth-VjTIeYlNOyt.1400x1400.jpg',
        genre: 'Science',
        ratings: [],
        comments: []
    },
    {
        title: 'Think Outside The Pox: Vaccines Throughout History',
        audio: 'https://www.buzzsprout.com/1307458/8234560-think-outside-the-pox-vaccines-throughout-history.mp3?blob_id=37265456',
        language: 'English',
        audio_length: '00:58:10',
        author: 'Vital Statistics Consulting',
        description: 'We take a trip into the past to discuss the history of vaccines. We start with an overview of smallpox, a debilitating illness that has plagued humans for thousands of years, and how attempts to prevent smallpox resulted in the first rudimentary immunizations through the process of variolation. Over time, variolation evolved to the first instances of vaccinations, and we detail Edward Jenner’s famous accounts of using cowpox to immunize individuals against smallpox. From there, we discuss the rapid emergence of scientific advances regarding infectious diseases and vaccine technologies, tracking Pasteur’s and Koch’s work on Germ Theory of Disease and the development of rabies vaccinations. We summarize the progression and evolution of vaccines through the 19th and 20th centuries, highlighting some key examples.',
        pub_date: '2021-03-29',
        image: 'https://cdn-images-1.listennotes.com/podcasts/unbiased-science-vital-statistics-consulting-QLH-e1Y3hE7-Qwizr1q2ba0.1400x1400.jpg',
        genre: 'Science',
        ratings: [],
        comments: []
    },
    {
        title: 'Las sorpresas y decepciones de este año',
        audio: 'http://www.ivoox.com/cx-podcast-5x13-i-especial-2017-las_mf_22475185_feed_1.mp3',
        language: 'Spanish',
        audio_length: '02:35:06',
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
        audio_length: '01:06:20',
        author: 'Tabletop Radio Hour',
        description: 'Your Podcast for everything tabletop.',
        pub_date: '2020-12-07',
        image: 'http://is4.mzstatic.com/image/thumb/Music118/v4/52/37/99/52379936-a24f-e9ae-a280-b8d116431a4c/source/600x600bb.jpg',
        genre: 'Games',
        ratings: [],
        comments: []
    },
    {
        title: 'Wolfenstein 2 Review & Super Mario Odyssey Cereal',
        audio: 'http://feeds.soundcloud.com/stream/363551771-user-98431904-super-gamescast-64-ep-061-wolfenstein-2-review-super-mario-odyssey-cereal.mp3',
        language: 'English',
        audio_length: '01:30:17',
        author: 'Games Untapped',
        description: 'Podcast by Trey Mitchell, Adam Fullerton, & Spencer Hall',
        pub_date: '2020-12-07',
        image: 'http://is3.mzstatic.com/image/thumb/Music62/v4/04/20/8b/04208b8a-7f5b-1e09-db98-1fafb3358d47/source/600x600bb.jpg',
        genre: 'Games',
        ratings: [],
        comments: []
    },
    {
        title: 'LEGO Video Games and Digital Play',
        audio: 'https://bitsnbrickspodcast.s3.amazonaws.com/audio/bits_n_bricks_s01e17_lego_video_games_and_digital_play.mp3',
        language: 'English',
        audio_length: '00:46:35',
        author: 'LEGO Group',
        description: 'In this episode of Bits N’ Bricks, journalist Brian Crecente and documentarian Ethan Vincent chat about the 25th Anniversary of the first LEGO video game with LEGO Group CEO Niels B. Christiansen, chief product and marketing officer Julia Goldin, and vice president of LEGO Games Sean McEvoy. The three discuss the path forward for the company in an increasingly digital world.',
        pub_date: '2021-03-31',
        image: 'https://cdn-images-1.listennotes.com/podcasts/lego-bits-n-bricks-WoVl1EdQfi4-3ylaA0XvtRo.1400x1400.jpg',
        genre: 'Games',
        ratings: [],
        comments: []
    },
    {
        title: 'Chris Lattner: The Gordon Ramsey of Escape Rooms',
        audio: 'https://mcdn.podbean.com/mf/web/x22pft/REPOD-S1E7-Chris-Lattner-Final.mp3',
        language: 'English',
        audio_length: '00:43:58',
        author: 'David Spira',
        description: "we talk to Chris Lattner, CEO and creative director of The Room in Berlin, one of the top-ranked escape room companies in the world, according to TERPECA—the Top Escape Rooms Project Enthusiasts’ Choice Awards. The Room’s immersive adventures have continued to win awards and accolades throughout the years, including our own Room Escape Artist’s Golden Lock Awards. Chris’ background was as a professional DJ in the techno scene for many years, performing at clubs and festivals around the world.  He was also heavily involved in the European geocaching scene, years before escape rooms even existed. After chatting with Chris, it became very clear that he has a focused design philosophy rooted in his past influences.",
        pub_date: '2021-04-12',
        image: 'https://cdn-images-1.listennotes.com/podcasts/reality-escape-pod-AMzpJ45Qxoc-FOw3zlHr7px.1400x1400.jpg',
        genre: 'Games',
        ratings: [],
        comments: []
    },
    {
        title: 'The Kyrie Effect',
        audio: 'https://anchor.fm/s/49c4919c/podcast/play/32567603/https:%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-3-30%2F70a3acf5-1ae3-ca74-2441-bf911a04e5f1.mp3',
        language: 'English',
        audio_length: '00:39:36',
        author: 'Laser',
        description: 'The Pull Boys have a steamy session with Raffaele and unlock the mysteries of the advanced house. ',
        pub_date: '2021-04-30',
        image: 'https://cdn-images-1.listennotes.com/podcasts/five-star-pull-bVsE0LFUrq6-CRD0F6VZIAc.1400x1400.jpg',
        genre: 'Games',
        ratings: [],
        comments: []
    }
];

const podcastsCopy = [...podcasts];

podcastsCopy.forEach(podcast => {
    podcast.authorLowerCase = podcast.author.toLowerCase();
    podcast.titleLowerCase = podcast.title.toLowerCase();
    podcast.descriptionLowerCase = podcast.description.toLowerCase();
});

Podcast.create(podcastsCopy)
  .then((podcastsDB) => {
    console.log(`Created ${podcastsDB.length} celebrities`);
    mongoose.connection.close();
  })
  .catch(err => console.log('error', err));