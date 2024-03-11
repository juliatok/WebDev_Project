const express = require('express')
const {
  signupUser,
  loginUser,
  getUsers, 
  getUser, 
  deleteUser, 
  putUser,
  patchUser,
  userBio,
  updateUserBio
} = require('../controllers/userController');

const router = express.Router()

// SIGNUP
router.post("/signup", signupUser);
  
// LOGIN
router.post("/login", loginUser);

router.get('/', getUsers)

router.get('/:id', getUser)

router.delete('/:id', deleteUser)

router.patch('/:id', patchUser)

router.put('/:id', putUser)

// USER BIO
router.patch('/:id/bio', userBio)

router.put('/:id/bio', updateUserBio)

module.exports = router
