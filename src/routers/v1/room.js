const express = require('express');
const router = express.Router()
const { uploadMulter } = require('../../middleware/uploadImage')
const authenticate = require('../../helpers/authentication');
const {
  newRoom, addMember, newMessage, getMessage
} = require('../../controllers/room');

router
.post('/new-room', uploadMulter.single('photo'),newRoom)
.post('/add-member', addMember)
.post('/new-message', authenticate, uploadMulter.single('photo') , newMessage)
.get('/:roomId', authenticate, getMessage)

module.exports = router