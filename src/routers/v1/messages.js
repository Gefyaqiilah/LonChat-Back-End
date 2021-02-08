const express = require('express')
const router = express.Router()

const messagesControllers = require('../../controllers/messages')
const authenticationToken = require('../../helpers/authentication');
const { uploadMulter } = require('../../middleware/uploadImage');
const {
  getAllMessageByUserSenderIdAndUserReceiverId,
  readMessage,
  lastMessageSender,
  deleteAllMessage,
  postImage
} = messagesControllers

router
  .post('/', getAllMessageByUserSenderIdAndUserReceiverId)
  .get('/last-message/:id',authenticationToken, lastMessageSender)
  .post('/read-message', readMessage)
  .delete('/delete-all-message', deleteAllMessage)
  .post('/post-image', authenticationToken, uploadMulter.single('photo'), postImage)
module.exports = router