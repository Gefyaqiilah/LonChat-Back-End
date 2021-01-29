const createError = require('http-errors')

const friendsModels = require('../models/friends')
const response = require('../helpers/response')

const friendsControllers = {
  getDataFriendsById: (req, res, next) => {
    userId = req.params.id
    if(!userId) {
      const error = new createError(400, 'userId cannot be empty')
      return next(error)
    }
    friendsModels.getDataFriendsById(userId)
    .then((result) => {
      console.log('result', result)
      const data = {
        friends: result
      }
      response(res, data, { status:'success', statusCode:200 }, null)
    }).catch(() => {
      const error = new createError(500, 'Looks like server having trouble')
      return next(error)
    })
  },
  addFriend: async (req, res, next) => {
    const { userId, friendId } = req.body
    if(!userId || !friendId) {
      const error = new createError(400, 'userId or friendId cannot be empty')
      return next(error)
    }
    if(userId === friendId) {
      const error = new createError(400, 'forbidden: cannot add yourself')
      return next(error)
    }
    const data = {
      userId,
      friendId
    }
    const dataFriends = await friendsModels.checkDataFriends(userId, friendId)
    if(dataFriends.length > 0) {
      const error = new createError(400, 'Your friend Has been added before')
      return next(error)
    }
    friendsModels.addFriend(data)
    .then(() => {
      response(res, 'successfully added new friends', { status: 'succeed', statusCode: 200 }, null)
    }).catch(() => {
      const error = new createError(500, 'Looks like server having trouble')
      return next(error)
    })
  }
}

module.exports = friendsControllers