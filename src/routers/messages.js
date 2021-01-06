const express = require('express')
const router = express.Router()

const messagesControllers = require('../controllers/messages')

const {
  getAllMessageByUserSenderIdAndUserReceiverId,
  readMessage,
  lastMessageSender,
  deleteAllMessage
} = messagesControllers

router
  .post('/', getAllMessageByUserSenderIdAndUserReceiverId)
  .get('/last-message/:id',lastMessageSender)
  .post('/read-message', readMessage)
  .delete('/delete-all-message', deleteAllMessage)
module.exports = router