const { actionQuery } = require('../helpers/actionQuery')

const friendsModels = {
  getDataFriendsById: (userId) => {
    return actionQuery(`SELECT * FROM users INNER JOIN friends ON users.id = friends.friendId WHERE friends.userId = ?`, userId)
  },
  addFriend: (data) => {
    return actionQuery(`INSERT INTO friends SET ?`, data)
  },
  checkDataFriends: (userId, friendId) => {
    return actionQuery(`SELECT * FROM friends WHERE userId = ? AND friendId = ?`, [userId, friendId])
  }
}

module.exports = friendsModels