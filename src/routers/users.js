const express = require('express')
const router = express.Router()

const usersControllers = require('../controllers/users')
const {
  userRegister,
  getUser,
  getUserById,
  sendEmailForgotPassword,
  deleteUser,
  updateUser,
  login
} = usersControllers

router
  .get('/', getUser)
  .get('/:id', getUserById)
  .post('/register', userRegister)
  .post('/forgot-password', sendEmailForgotPassword)
  .delete('/:id', deleteUser)
  .patch('/:id', updateUser)
  .post('/login', login)
module.exports = router