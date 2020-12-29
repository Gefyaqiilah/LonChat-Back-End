const createError = require('http-errors')


const messagesModels = require('../models/messages');
const response = require('../helpers/response')

const messagesControllers = {
  getAllMessageByUserSenderIdAndUserReceiverId (req, res, next) {
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
  }
}
module.exports = messagesControllers