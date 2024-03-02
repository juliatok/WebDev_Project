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
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
