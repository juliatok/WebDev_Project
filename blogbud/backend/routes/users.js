const express = require('express')
const {
  signupUser,
  loginUser,
  getMe,
  getUsers, 
  getUser, 
  createUser, 
  deleteUser, 
  putUser,
  patchUser
} = require('../controllers/userController');
const { auth } = require('../middleware/authMiddleware');

const router = express.Router()

// SIGNUP
router.post("/signup", signupUser);
  
// LOGIN
router.post("/login", loginUser);

// GET me
router.get("/", auth, getMe);

// GET all blogs
router.get('/', auth, getUsers)

// GET a single blog
router.get('/:id', auth, getUser)

// POST a new blog
router.post('/', auth, createUser)

// DELETE a blog
router.delete('/:id', auth, deleteUser)

// Update blog using PATCH 
router.patch('/:id', auth, patchUser)

// Update blog using PUT 
router.put('/:id', auth, putUser)

module.exports = router
