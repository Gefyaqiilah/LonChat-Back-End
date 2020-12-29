const { actionQuery } = require('../helpers/actionQuery')

const messagesModels = {
  insertMessage: (data) => {
    return actionQuery('INSERT INTO messages SET ?', data)
  },
  getAllMessageById: (userSenderId, userReceiverId) => {
    return actionQuery(`SELECT * FROM messages WHERE userSenderId IN ('${userSenderId}', '${userReceiverId}') AND userReceiverId IN ('${userSenderId}', '${userReceiverId}')`)
  }
}

module.exports = messagesModels