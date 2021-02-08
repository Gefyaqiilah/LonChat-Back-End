const createError = require('http-errors')

const roomModels = require('../models/room');
const response = require('../helpers/response')

const roomControllers = {
  newRoom: async (req, res, next) => {
    if (!req.body.name) {
      next(new createError(400, 'name cannot be empty'))
    }
    const payload  = {
      name: req.body.name,
      photo: req.file ? `${process.env.BASE_URL}/photo/${req.file.filename}` : ''
    }
    try {
      await roomModels.newRoom(payload)
      response(res, 'room has been created', { status: 'succeed', statusCode: 200 }, null)
    } catch (error) {
      console.log('error create new room >>', error)
      next(new createError(500, 'Looks like server having trouble'))
    }
  },
  addMember: async (req, res, next) => {
    if (!req.body.userId || !req.body.roomId) {
      next(new createError(400, 'UserId or RoomId cannot be empty'))
    }
    const payload = {
      roomId: parseInt(req.body.roomId),
      userId: req.body.userId,
      createdAt: new Date()
    }
    const result = await roomModels.checkRoomMember({ userId: payload.userId, roomId: payload.roomId })
    if (result.length > 0) {
      next(new createError(400, 'user has already member'))
    }

    try {
      await roomModels.addMember(payload)
      response(res, 'user has been added to group', { status: 'succeed', statusCode: 200 }, null)
    } catch (error) {
      console.log('error add member', error)
      next(new createError(500, 'Looks like server having trouble'))
    }
  },
  newMessage: async (req, res, next) => {
    const payload = {
      roomId: parseInt(req.body.roomId),
      userSenderId: req.user.id,
      message: req.body.message,
      photo: req.file ? `${process.env.BASE_URL}/photo/${req.file.filename}` : '',
      time: new Date(),
      messageStatus: 0,
      notVisibleTo: '[]',
      createdAt: new Date()
    }
    console.log('payload', payload)
    if (!payload.roomId) {
      next(new createError(400, 'roomId cannot be empty'))
    } else if (!req.body.message && !req.file) {
      next(new createError(400, 'nothing message or photo was sent'))
    }
    try {
     await roomModels.newMessage(payload)
     response(res, 'message has been sent', { status: 'succeed', statusCode: 200 }, null)
    } catch (error) {
      console.log('error', error)
      next(new createError(500, 'Looks like server having trouble'))
    }
  }
}

module.exports = roomControllers