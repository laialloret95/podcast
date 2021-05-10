const express = require('express');
const User = require('../models/user');

const bcryptjs = require('bcryptjs')

const router = express.Router();

// SIGNUP
router.get('/signup', (req, res) => res.render('auth/signup'));

router.post('/signup', (req, res, next) => {
  console.log('The form data: ', req.body);
  const { firstName, lastName, email, password } = req.body;

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
   })
   .catch(error => next(error));


});

module.exports = router;
