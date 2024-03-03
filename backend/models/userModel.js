const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  /* profilePicture: {
    type: Image,
  }, */
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
   /*password: {
        type: String,
        required: true,
    },*/
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
