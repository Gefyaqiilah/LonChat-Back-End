const express = require('express')
const router = express.Router()

const messagesControllers = require('../controllers/messages')

const {
  getAllMessageByUserSenderIdAndUserReceiverId
} = messagesControllers

router
  .post('/', getAllMessageByUserSenderIdAndUserReceiverId)
  
module.exports = router