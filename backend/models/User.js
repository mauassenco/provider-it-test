const mongoose = require('mongoose');

const User = mongoose.model('User', {
  name: String,
  email: String,
  birth: String,
  password: String,
});

module.exports = User;
