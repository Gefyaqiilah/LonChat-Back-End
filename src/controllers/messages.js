const createError = require('http-errors')


const messagesModels = require('../models/messages');
const response = require('../helpers/response')

const messagesControllers = {
  getAllMessageByUserSenderIdAndUserReceiverId: (req, res, next) => {
    const { userSenderId, userReceiverId } = req.body
    if (!userSenderId || !userReceiverId) {
      const error = new createError(400, 'Id cannot be empty')
      return next(error)
    }
    messagesModels.getAllMessageById(userSenderId, userReceiverId)
    .then((result) => {
      response(res, result, {status:'succeed', statusCode: 200}, null)
    }).catch(() => {
      const error = new createError(500, 'Looks like server having trouble')
      return next(error)
    })
  },
  readMessage: (req, res, next) => {
    const { userSenderId, userReceiverId } = req.body
    if(!userSenderId||!userReceiverId) {
      const error = new createError(400, 'UserSenderId or UserReceiverId cannot be empty')
      return next(error)
    }
    messagesModels.readMessage(userSenderId, userReceiverId)
    .then((result) => {
    response(res, 'message has been readed', { status: 'success', statusCode:'200' }, null)
    }).catch(() => {
    next(new createError(500, 'Looks like server having trouble'))
    })
  },
  lastMessageSender: async (req, res, next) => {
    const userSenderId = req.params.id
    if(!userSenderId) {
      const error = new createError(400, 'UserSenderId cannot be empty')
      return next(error)
    }
    const resultLastMessage = await messagesModels.lastMessageSender(userSenderId)
    const resultUnreadMessage = await messagesModels.countUnreadMessage(userSenderId)
    const resultCopy ={
      ...resultLastMessage[0],
      ...resultUnreadMessage[0]
    }
    response(res, resultCopy, {status:'succeed', statusCode: 200}, null)
  },
  deleteAllMessage: async (req, res, next) => {
    const {userSenderId, userReceiverId} = req.body
    if (!userSenderId || !userReceiverId) {
      const error = new createError(400, 'userSenderId or userReceiverId cannot be empty')
      return next(error)
    }
    try {
      const resultDelete = await messagesModels.deleteAllMessage(userSenderId, userReceiverId)
      response(res, 'all message has been deleted', { status: 'succeed', statusCode: 200 }, null)
    } catch (error) {
      // const resultError = new createError(400,)
      res.json(error) 
    }
  },
  postImage: async (req, res, next) => {
    console.log('this.req.user', req.user)
    console.log('req.files', req.files)
    const data = {
      photo:`${process.env.BASE_URL}/photo/${req.file.filename}`,
      message: null,
      userSenderId: req.user.id,
      userReceiverId: req.body.userReceiverId,
      messageStatus: 0,
      time: req.body.time,
      createdAt: new Date()
    }
    try {
      await messagesModels.insertMessage(data)
      response(res, data, { status: 'success', statusCode:200 }, null)
    } catch (error) {
      next(new createError(500, 'Looks like server having trouble'))
    }
  }
}
module.exports = messagesControllers