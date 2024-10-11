const mongoose = require('mongoose');

// Define foodSchema
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// Define userSchema with embedded pantry (array of foodSchema)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema], // Embedded foodSchema here
});

// Export the User model
module.exports = mongoose.model('User', userSchema);