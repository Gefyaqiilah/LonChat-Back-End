const createError = require('http-errors')

const friendsModels = require('../models/friends')
const response = require('../helpers/response')

const friendsControllers = {
  getDataFriendsById (req, res, next) {
    userId = req.params.id
    if(!userId) {
      const error = new createError(400, 'userId cannot be empty')
      return next(error)
    }
    friendsModels.getDataFriendsById(userId)
    .then((result) => {
      const data = {
        friends: result
      }
      response(res, data, { status:'success', statusCode:200 }, null)
    }).catch((err) => {
      console.log('err :>> ', err);
      const error = new createError(500, 'Looks like server having trouble')
      return next(error)
    })
  }
}

module.exports = friendsControllers