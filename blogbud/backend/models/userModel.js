const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  password: {
      type: String,
      required: true,
  },
  bio: {
    type: String,
    required: false,
  }
}, { timestamps: true })

// signup
userSchema.statics.signup = async function (username, email, password) {

  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  
  console.log('Email validation passed');
  
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);

const user = await this.create({ email, password: hash, username });

return user;
};

// login
/*
userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Incorrect username");
  }

  console.log(`Stored hashed password: ${user.password}`);
  console.log(`Provided password: ${password}`); 

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};
*/




module.exports = mongoose.model('User', userSchema)
