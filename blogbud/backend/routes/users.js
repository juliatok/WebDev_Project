const express = require('express')
const {
  signupUser,
  loginUser,
  getMe,
  getUsers, 
  getUser, 
  deleteUser, 
  putUser,
  patchUser,
  userBio,
  updateUserBio
} = require('../controllers/userController');
const { protect } = require("../middleware/requireAuth");

const router = express.Router()

// SIGNUP
router.post("/signup", signupUser);
  
// LOGIN
router.post("/login", loginUser);

// GET ME
router.get("/myprofile", protect, getMe);

router.get('/', getUsers)

router.get('/:id', getUser)

router.delete('/:id', deleteUser)

router.patch('/:id', patchUser)

router.put('/:id', putUser)

// USER BIO
router.patch('/:id/bio', userBio)

router.put('/:id/bio', updateUserBio)

module.exports = router
