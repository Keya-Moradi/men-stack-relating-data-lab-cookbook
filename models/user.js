const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  pantry: {
    type: [foodSchema], // Define pantry as an array of food items
    default: [] // Default to an empty array
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
