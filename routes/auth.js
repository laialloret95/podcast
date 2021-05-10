const express = require('express');
const User = require('../models/user');
const router = express.Router();

// SIGNUP
router.get('/signup', (req, res) => res.render('auth/signup'));








module.exports = router;