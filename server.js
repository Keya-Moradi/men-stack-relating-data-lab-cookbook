const dotenv = require('dotenv');
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const authController = require('./controllers/auth.js');
const foodsController = require('./controllers/foods.js'); // Added foods controller
const isSignedIn = require('./middleware/is-signed-in.js'); // Middleware to restrict access
const passUserToView = require('./middleware/pass-user-to-view.js'); // Middleware to pass user data

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUserToView); // Pass user data to views

// Routes
app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send('Sorry, no guests allowed.');
  }
});

app.use('/auth', authController);
app.use(isSignedIn); // Ensure users are signed in before accessing their pantry
app.use('/users/:userId/foods', foodsController); // Foods controller for pantry operations

// Start the server
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});