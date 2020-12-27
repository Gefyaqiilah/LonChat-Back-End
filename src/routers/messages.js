const express = require('express')
const router = express.Router()

const messagesControllers = require('../controllers/messages')

const {
  getAllMessageById
} = messagesControllers

router
  .get('/:id', getAllMessageById)
  
module.exports = router