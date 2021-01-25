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
    }).catch((err) => {
      console.log('err', err)
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
    const userReceiverId = req.user.id
    console.log('userReceiverId', userReceiverId)
    if(!userSenderId) {
      const error = new createError(400, 'UserSenderId cannot be empty')
      return next(error)
    }
    const resultLastMessage = await messagesModels.lastMessageConversation(userSenderId, userReceiverId)
    const resultUnreadMessage = await messagesModels.countUnreadMessage(userSenderId, userReceiverId)
    console.log('resultUnreadMessage', resultUnreadMessage)
    console.log('resultLastMessage', resultLastMessage)
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
      const countBoth = await messagesModels.countVisibilityMessage(userSenderId, userReceiverId, 'BOTH')
      const countByIdSender = await messagesModels.countVisibilityMessage(userSenderId, userReceiverId, 'USERSENDER')
      console.log('countBoth', countBoth[0].amount)
      if (countBoth[0].amount > 0 ) {
        const resultDelete = await messagesModels.deleteAllMessage(userSenderId, userReceiverId, 'CHANGE VISIBILITY')
        return response(res, 'all message has been deleted', { status: 'succeed', statusCode: 200 }, null)
      }
      if (countByIdSender[0].amount > 0) {
        const resultDelete = await messagesModels.deleteAllMessage(userSenderId, userReceiverId, 'DELETE MESSAGE')
        return response(res, 'all message has been deleted', { status: 'succeed', statusCode: 200 }, null)
      }
    } catch (error) {
      // const resultError = new createError(400,)
      res.json(error) 
    }
  },
  postImage: async (req, res, next) => {
    console.log('this.req.user', req.user)
    console.log('req.files', req.files)
    console.log('req.body.userReceiverId', req.body.userReceiverId)
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