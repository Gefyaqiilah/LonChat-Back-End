const express = require('express')
const router = express.Router()
const { uploadMulter } = require('../middleware/uploadImage');

const usersControllers = require('../controllers/users')
const {
  userRegister,
  getUser,
  getUserById,
  sendEmailForgotPassword,
  deleteUser,
  updateUser,
  login,
  updatePhotoProfile
} = usersControllers

router
  .get('/', getUser)
  .get('/:id', getUserById)
  .post('/register', userRegister)
  .post('/forgot-password', sendEmailForgotPassword)
  .delete('/:id', deleteUser)
  .patch('/:id', updateUser)
  .post('/login', login)
  .patch('/photo-profile/:id',uploadMulter.single('photoProfile'), updatePhotoProfile)
module.exports = router