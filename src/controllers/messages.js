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
    console.log('berhasil mngubah :>> ', result);
    }).catch((err) => {
    console.log('err :>> ', err);
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
  }
}
module.exports = messagesControllers