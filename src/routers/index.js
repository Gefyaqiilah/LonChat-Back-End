const express = require('express');
const router = express.Router() 
const roomsRouter = require('./v1/room');
const messagesRouter = require('./v1/messages');
const usersRouter = require('./v1/users');
const friendsRouter = require('./v1/friends');


router.use('/rooms', roomsRouter)
router.use('/messages', messagesRouter)
router.use('/friends', friendsRouter)
router.use('/users', usersRouter)

module.exports = router