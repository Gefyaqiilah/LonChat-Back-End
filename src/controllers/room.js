const createError = require('http-errors')
const moment = require('moment');
const roomModels = require('../models/room');
const response = require('../helpers/response')

const roomControllers = {
  newRoom: async (req, res, next) => {
    if (!req.body.name) {
      return next(new createError(400, 'name cannot be empty'))
    }
    const payload  = {
      name: req.body.name,
      photoProfile: req.file ? `${process.env.BASE_URL}/photo/${req.file.filename}` : ''
    }
    try {
      await roomModels.newRoom(payload)
      response(res, 'room has been created', { status: 'succeed', statusCode: 200 }, null)
    } catch (error) {
      console.log('error create new room >>', error)
      return next(new createError(500, 'Looks like server having trouble'))
    }
  },
  addMember: async (req, res, next) => {
    if (!req.body.roomId) {
      return next(new createError(400, 'RoomId cannot be empty'))
    }
    const payload = {
      roomId: parseInt(req.body.roomId),
      userId: req.user.id,
      createdAt: new Date()
    }
    
    const result = await roomModels.checkRoomMember({ userId: payload.userId, roomId: payload.roomId })
    if (result.length > 0) {
      return next(new createError(400, 'user has already member'))
    }

    try {
      await roomModels.addMember(payload)
      response(res, 'user has been added to group', { status: 'succeed', statusCode: 200 }, null)
    } catch (error) {
      console.log('error add member', error)
      return next(new createError(500, 'Looks like server having trouble'))
    }
  },
  newMessage: async (req, res, next) => {
    const payload = {
      roomId: parseInt(req.body.roomId),
      userSenderId: req.user.id,
      message: req.body.message || null,
      photo: req.file ? `${process.env.BASE_URL}/photo/${req.file.filename}` : null,
      time: moment(new Date()).format('LT'),
      messageStatus: 0,
      createdAt: new Date()
    }
    if (!payload.roomId) {
      return next(new createError(400, 'roomId cannot be empty'))
    } else if (!req.body.message && !req.file) {
      return next(new createError(400, 'nothing message or photo was sent'))
    }
    try {
     await roomModels.newMessage(payload)
     response(res, payload, { status: 'succeed', statusCode: 200 }, null)
    } catch (error) {
      return next(new createError(500, 'Looks like server having trouble'))
    }
  },
  getMessage: async (req, res, next) => {
    const userId = req.user.id
    const roomId = req.params.roomId
    console.log('roomId', roomId)
    try {
      const isExist = await roomModels.checkMember({ userId, roomId  })
      if (isExist.length === 0) {
        return next(new createError(500, 'Looks like server having trouble'))
      }
      const messages = await roomModels.getMessage({ roomId })
      response(res, messages, {status: 'succeed', statusCode: 200}, null)
    } catch (error) {
      return next(new createError(500, 'Looks like server having trouble'))
    }
  },
  getRooms: async (req, res, next) => {
    const userId = req.user.id
    try {
      const rooms = await roomModels.getRooms({ userId })
      console.log('rooms', rooms)
      res.json(rooms)
    } catch (error) {
      console.log('error', error)
      return next(new createError(500, 'Looks like server having trouble'))
    }
  },
  getLastMessage: async (req, res, next) => {
    const roomId = req.params.roomId
    try {
      const lastMessages = await roomModels.getLastMessage({ roomId })
      if (lastMessages.length > 0) {
        const sendResult = lastMessages[0]
        sendResult.message = sendResult.message ? sendResult.message.substring(0, 20) + '......' : sendResult.message
        sendResult.lastMessageTime = moment(sendResult.time).format('LT')
        sendResult.LastMessageTimeStamp = sendResult.createdAt || 0
        console.log('sendResult', sendResult)
        return response(res, sendResult, {status: 'succeed', statusCode: 200}, null)
      }
      console.log('lastMessages', lastMessages)
      return response(res, lastMessages, {status: 'succeed', statusCode: 200}, null)
    } catch (error) {
      console.log('error', error)
      return next(new createError(500, 'Looks like server having trouble'))
    }
  },
  getDetailRoom: async (req, res, next) => {
    const roomId = req.params.roomId
    try {
      const detailRoom = await roomModels.getDetailRoom(roomId)
      const roomMember = await roomModels.getRoomMember(roomId)
      const sendResult = {
        ...detailRoom[0],
        roomMember: roomMember
      }
      return response(res, sendResult, {status: 'succeed', statusCode: 200}, null)
    } catch (error) {
      return next(new createError(500, 'Looks like server having trouble'))
    }
  }
}

module.exports = roomControllers