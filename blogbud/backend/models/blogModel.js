const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  /* image: {
    type: Image,
  }, */
  body: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
}, { timestamps: true })

module.exports = mongoose.model('Blog', blogSchema)
