const createError = require('http-errors')


const messagesModels = require('../models/messages');
const response = require('../helpers/response')

const messagesControllers = {
  getAllMessageById (req, res, next) {
    id = req.params.id
    if (!id) {
      const error = new createError(400, 'Id cannot be empty')
      return next(error)
    }
    messagesModels.getAllMessageById(id)
    .then((result) => {
      response(res, result, {status:'succeed', statusCode: 200}, null)
    }).catch(() => {
      const error = new createError(500, 'Looks like server having trouble')
      return next(error)
    })
  }
}
module.exports = messagesControllers