const express = require('express');
const router = express.Router()
const { uploadMulter } = require('../../middleware/uploadImage')
const authenticate = require('../../helpers/authentication');
const {
  newRoom, addMember, newMessage, getMessage, getRooms, getLastMessage, getDetailRoom
} = require('../../controllers/room');

router
.post('/new-room', uploadMulter.single('photo'),newRoom)
.post('/add-member', authenticate, addMember)
.post('/new-message', authenticate, uploadMulter.single('photo') , newMessage)
.get('/all', authenticate, getRooms)
.get('/messages/:roomId', authenticate, getMessage)
.get('/last-message/:roomId', authenticate, getLastMessage)
.get('/detail-room/:roomId', authenticate, getDetailRoom)
module.exports = router