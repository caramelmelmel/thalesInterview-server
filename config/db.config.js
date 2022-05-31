const { mongoose } = require('mongoose');

require('dotenv').config();
const JWT_SECRET_KEY = process.env.SECRET_KEY;
const MONGODB_URL = process.env.MONGODB;

const connection = mongoose.connect(MONGODB_URL, (err) => {
  if (!err) {
    console.log('MongoDB has connected successfully');
  } else {
    console.log(err);
  }
});

module.export = [connection, JWT_SECRET_KEY];
