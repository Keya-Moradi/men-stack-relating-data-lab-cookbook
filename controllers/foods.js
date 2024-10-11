const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Index route - show all food items in user's pantry
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.redirect('/'); // If no user found, redirect to home
    }
    res.render('foods/index.ejs', { pantry: user.pantry, user }); // Send pantry and user to the view
  } catch (err) {
    console.log(err);
    return res.redirect('/'); // Redirect to home on error
  }
});

// New route - display form to add a new food item
router.get('/new', (req, res) => {
  res.render('foods/new.ejs', { user: req.session.user });
});

// Create route - add new food item to user's pantry
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.redirect('/'); // If no user found, redirect to home
    }
    user.pantry.push({ name: req.body.name });
    await user.save();
    res.redirect(`/users/${req.session.user._id}/foods`); // Redirect to pantry
  } catch (err) {
    console.log(err);
    return res.redirect('/'); // Redirect to home on error
  }
});

// Delete route - remove food item from user's pantry
router.delete('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.redirect('/'); // If no user found, redirect to home
    }
    user.pantry.id(req.params.itemId).remove();
    await user.save();
    res.redirect(`/users/${req.session.user._id}/foods`); // Redirect to pantry
  } catch (err) {
    console.log(err);
    return res.redirect('/'); // Redirect to home on error
  }
});

// Edit route - display form to edit a food item
router.get('/:itemId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.redirect('/'); // If no user found, redirect to home
    }
    const food = user.pantry.id(req.params.itemId);
    res.render('foods/edit.ejs', { food, user }); // Pass food and user to the view
  } catch (err) {
    console.log(err);
    return res.redirect('/'); // Redirect to home on error
  }
});

// Update route - update food item in user's pantry
router.put('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.redirect('/'); // If no user found, redirect to home
    }
    const food = user.pantry.id(req.params.itemId);
    food.name = req.body.name;
    await user.save();
    res.redirect(`/users/${req.session.user._id}/foods`); // Redirect to pantry
  } catch (err) {
    console.log(err);
    return res.redirect('/'); // Redirect to home on error
  }
});

module.exports = router;
