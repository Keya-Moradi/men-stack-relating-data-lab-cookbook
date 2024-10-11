const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Index route - show all users
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    res.render('users/index.ejs', { users });
  });
});

// Show route - show a single user's pantry
router.get('/:userId', (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err || !user) {
      console.log(err);
      return res.redirect('/');
    }
    res.render('users/show.ejs', { user });
  });
});

module.exports = router;
