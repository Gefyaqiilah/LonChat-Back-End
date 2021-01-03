const express = require('express')
const router = express.Router()

const messagesControllers = require('../controllers/messages')

const {
  getAllMessageByUserSenderIdAndUserReceiverId,
  readMessage,
  lastMessageSender
} = messagesControllers

router
  .post('/', getAllMessageByUserSenderIdAndUserReceiverId)
  .get('/last-message/:id',lastMessageSender)
  .post('/read-message', readMessage)
module.exports = router