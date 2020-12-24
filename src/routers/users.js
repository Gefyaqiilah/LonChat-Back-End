const express = require('express')
const router = express.Router()

const usersControllers = require('../controllers/users')
const {
  userRegister,
  getUser,
  getUserById,
  sendEmailForgotPassword,
  deleteUser,
  updateUser
} = usersControllers

router
  .get('/', getUser)
  .get('/:id', getUserById)
  .post('/register', userRegister)
  .post('/forgot-password', sendEmailForgotPassword)
  .delete('/:id', deleteUser)
  .patch('/:id', updateUser)
module.exports = router