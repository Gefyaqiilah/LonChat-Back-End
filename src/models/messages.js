const { actionQuery } = require('../helpers/actionQuery')

const messagesModels = {
  insertMessage: (data) => {
    return actionQuery('INSERT INTO messages SET ?', data)
  },
  getAllMessageById: (userSenderId, userReceiverId) => {
    return actionQuery(`SELECT * FROM messages WHERE userSenderId IN ('${userSenderId}', '${userReceiverId}') AND userReceiverId IN ('${userSenderId}', '${userReceiverId}') AND visibleTo IN ('BOTH','${userSenderId}')`)
  },
  readMessage: (userSenderId, userReceiverId) => {
    return actionQuery('UPDATE messages SET messageStatus = 1 WHERE userSenderId = ? AND userReceiverId = ?', [userSenderId, userReceiverId])
  },
  lastMessageConversation: (userSenderId, userReceiverId) => {
    return actionQuery(`SELECT * FROM messages WHERE userSenderId IN ('${userSenderId}', '${userReceiverId}') AND userReceiverId IN ('${userSenderId}', '${userReceiverId}') ORDER BY createdAt DESC LIMIT 1`)
  },
  countUnreadMessage: (userSenderId, userReceiverId) => {
    console.log('userSenderId', userSenderId)
    console.log('userReceiverId', userReceiverId)
    return actionQuery(`SELECT COUNT(case when messages.messageStatus = 0 then 1 else NULL END) AS unreadMessage FROM messages WHERE userReceiverId = ? AND userSenderId = ?`, [userReceiverId, userSenderId])
  },
  deleteAllMessage: (userSenderId, userReceiverId, type) => {
    if (type === 'CHANGE VISIBILITY') {
      return actionQuery(`UPDATE messages SET visibleTo = ? WHERE userSenderId IN ('${userSenderId}', '${userReceiverId}') AND userReceiverId IN ('${userSenderId}', '${userReceiverId}')`, userReceiverId)
    } else if (type === 'DELETE MESSAGE') {
      return actionQuery(`DELETE FROM messages WHERE userSenderId IN ('${userSenderId}', '${userReceiverId}') AND userReceiverId IN ('${userSenderId}', '${userReceiverId}') AND visibleTo = ?`, userSenderId)
    }
  },
  countVisibilityMessage: (userSenderId, userReceiverId, type) => {
    if (type === 'BOTH') {
      return actionQuery(`SELECT COUNT(case when messages.visibleTo = 'BOTH' then 1 ELSE NULL END) AS amount FROM telegram_app.messages WHERE userSenderId IN ('${userSenderId}', '${userReceiverId}') AND userReceiverId IN ('${userSenderId}', '${userReceiverId}')`)
    } else if (type === 'USERSENDER') {
      return actionQuery(`SELECT COUNT(case when messages.visibleTo = '${userSenderId}' then 1 ELSE NULL END) AS amount FROM telegram_app.messages WHERE userSenderId IN ('${userSenderId}', '${userReceiverId}') AND userReceiverId IN ('${userSenderId}', '${userReceiverId}')`)
    }
  }
}

module.exports = messagesModels