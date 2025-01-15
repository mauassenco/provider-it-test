const mongoose = require('mongoose');

const Users = mongoose.model('Users', {
  User: {
    name: String,
    email: String,
    birth: String,
  },
});

module.exports = Users;
