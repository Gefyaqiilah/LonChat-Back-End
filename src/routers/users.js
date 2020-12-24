const express = require('express')
const router = express.Router()

const usersControllers = require('../controllers/users');
const {
  userRegister
} = usersControllers

router
  .post('/register', userRegister)

module.exports = router