const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Index route - show all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}); // Use async/await here
    res.render('users/index.ejs', { users });
  } catch (err) {
    console.log(err);
    return res.redirect('/'); // Redirect to home on error
  }
});

// Show route - show a single user's pantry
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId); // Fetch user using async/await
    if (!user) {
      return res.redirect('/'); // If no user found, redirect to home
    }
    res.render('users/show.ejs', { user });
  } catch (err) {
    console.log(err);
    return res.redirect('/'); // Redirect to home on error
  }
});

module.exports = router;
