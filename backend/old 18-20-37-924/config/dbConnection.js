const mongoose = require('mongoose');

const config = {
  DB: process.env.DATABASE_URL,
};
const connectDB = async () => {
  try {
    await mongoose.connect(config.DB);
    await mongoose.connection;
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
