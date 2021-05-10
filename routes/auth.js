const express = require('express');
const User = require('../models/user');
const mongoose = require('mongoose');

const bcryptjs = require('bcryptjs');

const router = express.Router();

// SIGNUP
router.get('/signup', (req, res) => res.render('auth/signup'));

router.post('/signup', (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if ( !firstName || !lastName || !email || !password ) {
    res.render('auth/signup', { errorMessage:`All fields are mandatory. 
    Please fill them all to signup.` });
    return;
  }

    // make sure passwords are strong - left commented for testing easily
    //const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    //if (!regex.test(password)) {
    //  res
    //    .status(500)
    //    .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    //  return;
    //}

  bcryptjs
   .genSalt(10)
   .then(salt => bcryptjs.hash(password, salt))
   .then(passwordHash => {
     return User.create({
       firstName,
       lastName,
       email,
       hashedPassword: passwordHash
     });
   })
   .then(userFromDB => {
     console.log('Newly created user is: ', userFromDB);
     res.redirect("/login");
   })
   .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('auth/signup', { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render('auth/signup', {
          errorMessage: `This email address is already registered. 
          If you have already an account, please refer to the login page.
          `
        });
      } else {
        next(error);
      }
    });
});

//LOGIN
router.get('/login', (req, res) => res.render('auth/login', { userInSession: req.session.currentUser }));

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if ( !email || !password ) {
    res.render('auth/login', { errorMessage:'Please enter both, email and password to login.'});
    return;
  }

  User.findOne({ email })
   .then(userDB => {
     if (!userDB) {
      res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
      return;      
     } else if (bcryptjs.compareSync(password, userDB.hashedPassword)) {
       const { _id, firstName, lastName, email: mail, preferences, profilePicture } = userDB;
       req.session.currentUser = {
         _id,
         firstName,
         lastName,
         mail,
         preferences,
         profilePicture
       };
       res.redirect('/profile');
     } else {
      res.render('auth/login', { errorMessage: 'Incorrect password.' });
      return;
     }
   })
   .catch(error => next(error));
});

router.get('/profile', (req, res) => {
  res.render('users/profile', { userInSession: req.session.currentUser });
});

router.get('/logout', (req, res) => {
  res.render('auth/logout');
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/logout');
});

module.exports = router;