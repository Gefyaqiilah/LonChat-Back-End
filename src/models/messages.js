const { actionQuery } = require('../helpers/actionQuery')

const messagesModels = {
  insertMessage: (data) => {
    return actionQuery('INSERT INTO messages SET ?', data)
  },
  getAllMessageById: (userSenderId, userReceiverId) => {
    return actionQuery(`SELECT * FROM messages WHERE userSenderId IN ('${userSenderId}', '${userReceiverId}') AND userReceiverId IN ('${userSenderId}', '${userReceiverId}')`)
  },
  readMessage: (userSenderId, userReceiverId) => {
    return actionQuery('UPDATE messages SET messageStatus = 1 WHERE userSenderId = ? AND userReceiverId = ?', [userSenderId, userReceiverId])
  },
  lastMessageSender: (userSenderId) => {
    return actionQuery(`SELECT * FROM messages  WHERE messages.userSenderId = ? ORDER BY messages.createdAt DESC LIMIT 1`, userSenderId)
  },
  countUnreadMessage: (userSenderId) => {
    return actionQuery(`SELECT COUNT(case when messages.messageStatus = 0 then 1 else NULL END) AS unreadMessage FROM messages WHERE userSenderId = ?`, userSenderId)
  },
  deleteAllMessage: (userSenderId, userReceiverId) => {
    return actionQuery('DELETE FROM messages WHERE userSenderId = ? AND userReceiverId = ?', [userSenderId, userReceiverId])
  }
}

module.exports = messagesModels