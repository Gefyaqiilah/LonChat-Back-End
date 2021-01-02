const express = require('express')
const router = express.Router()

const { uploadMulter } = require('../middleware/uploadImage');
const usersControllers = require('../controllers/users')
const authenticationToken = require('../helpers/authentication');
const authorizationUser = require('../helpers/authorizationUser');

const {
  userRegister,
  getUser,
  getUserById,
  sendEmailForgotPassword,
  deleteUser,
  updateUser,
  login,
  updatePhotoProfile,
  forgotPassword,
  confirmPassword,
  searchUser
} = usersControllers

router
.get('/search', searchUser)
.patch('/forgot-password/:email', confirmPassword)
.get('/', authenticationToken, authorizationUser, getUser)
.get('/:id', authenticationToken, authorizationUser, getUserById)
.post('/register', userRegister)
.post('/forgot-password', forgotPassword , sendEmailForgotPassword)
.delete('/:id', authenticationToken, deleteUser)
.patch('/:id', authenticationToken, authorizationUser, updateUser)
.post('/login', login)
.patch('/photo-profile/:id', authenticationToken, authorizationUser, uploadMulter.single('photoProfile'), updatePhotoProfile)
module.exports = router