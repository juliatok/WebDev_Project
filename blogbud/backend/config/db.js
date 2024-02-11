const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected to database`);
};

module.exports = connectDB;
