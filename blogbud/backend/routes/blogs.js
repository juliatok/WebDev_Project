const express = require('express')
const {
  getBlogs, 
  getBlog, 
  getBlogByUser,
  getBlogByTag,
  createBlog, 
  deleteBlog, 
  putBlog,
  patchBlog
} = require('../controllers/blogController')
const { protect } = require("../middleware/requireAuth");

const router = express.Router()

// GET all blogs
router.get('/', getBlogs)

// GET a single blog
router.get('/:id', getBlog)

// GET blogs by a user
router.get('/user/:user_id', protect, getBlogByUser)

// get blogs by a tag
router.get('/', getBlogByTag)

// POST a new blog
router.post('/', protect, createBlog)

// DELETE a blog
router.delete('/:id', protect, deleteBlog)

// Update blog using PATCH 
router.patch('/:id', protect, patchBlog)

// Update blog using PUT 
router.put('/:id', protect, putBlog)

module.exports = router
