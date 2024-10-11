const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Sign Up Route
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password, // Make sure to hash the password in a real app
    });
    await newUser.save();
    req.session.user = newUser;
    res.redirect('/'); // Redirect to home after signing up
  } catch (err) {
    console.log(err);
    res.redirect('/auth/sign-up');
  }
});

// Sign In Route
router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs');
});

router.post('/sign-in', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.redirect('/auth/sign-in'); // User not found
    }
    if (user.password !== req.body.password) { // Password check
      return res.redirect('/auth/sign-in'); // Wrong password
    }
    req.session.user = user;
    res.redirect('/'); // Redirect to home after signing in
  } catch (err) {
    console.log(err);
    res.redirect('/auth/sign-in');
  }
});

// Sign Out Route
router.get('/sign-out', (req, res) => {
  req.session.user = null; // Clear session
  res.redirect('/'); // Redirect to home after signing out
});

module.exports = router;
