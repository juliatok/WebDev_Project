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
router.get('/:tag', getBlogByTag)

// POST a new blog
router.post('/', createBlog)

// DELETE a blog
router.delete('/:id', deleteBlog)

// Update blog using PATCH 
router.patch('/:id', patchBlog)

// Update blog using PUT 
router.put('/:id', putBlog)

module.exports = router
