const { actionQuery } = require('../helpers/actionQuery')

const friendsModels = {
  getDataFriendsById (userId) {
    return actionQuery(`SELECT * FROM users INNER JOIN friends ON users.id = friends.friendId WHERE friends.userId = ?`, userId)
  }
}

module.exports = friendsModels