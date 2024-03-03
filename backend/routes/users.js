const express = require('express')
const {
  getUsers, 
  getUser, 
  createUser, 
  deleteUser, 
  putUser,
  patchUser
} = require('../controllers/userController')

const router = express.Router()

// GET all blogs
router.get('/', getUsers)

// GET a single blog
router.get('/:id', getUser)

// POST a new blog
router.post('/', createUser)

// DELETE a blog
router.delete('/:id', deleteUser)

// Update blog using PATCH 
router.patch('/:id', patchUser)

// Update blog using PUT 
router.put('/:id', putUser)

module.exports = router
