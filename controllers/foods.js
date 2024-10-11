const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Index route - show all food items in user's pantry
router.get('/', (req, res) => {
  User.findById(req.session.user._id, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    res.render('foods/index.ejs', { 
      pantry: user.pantry, // passing the pantry array
      user: user // passing the user object for sign-in/sign-out functionality
    });
  });
});

// New route - display form to add a new food item
router.get('/new', (req, res) => {
  res.render('foods/new.ejs');
});

// Create route - add new food item to user's pantry
router.post('/', (req, res) => {
  User.findById(req.session.user._id, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    user.pantry.push({ name: req.body.name });
    user.save((err) => {
      if (err) {
        console.log(err);
        return res.redirect('/');
      }
      res.redirect(`/users/${req.session.user._id}/foods`);
    });
  });
});

// Delete route - remove food item from user's pantry
router.delete('/:itemId', (req, res) => {
  User.findById(req.session.user._id, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    user.pantry.id(req.params.itemId).remove();
    user.save((err) => {
      if (err) {
        console.log(err);
        return res.redirect('/');
      }
      res.redirect(`/users/${req.session.user._id}/foods`);
    });
  });
});

// Edit route - display form to edit a food item
router.get('/:itemId/edit', (req, res) => {
  User.findById(req.session.user._id, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    const food = user.pantry.id(req.params.itemId);
    res.render('foods/edit.ejs', { food });
  });
});

// Update route - update food item in user's pantry
router.put('/:itemId', (req, res) => {
  User.findById(req.session.user._id, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    const food = user.pantry.id(req.params.itemId);
    food.name = req.body.name;
    user.save((err) => {
      if (err) {
        console.log(err);
        return res.redirect('/');
      }
      res.redirect(`/users/${req.session.user._id}/foods`);
    });
  });
});

module.exports = router;
