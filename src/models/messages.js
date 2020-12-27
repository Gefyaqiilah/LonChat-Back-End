const { actionQuery } = require('../helpers/actionQuery')

const messagesModels = {
  insertMessage: (data) => {
    return actionQuery('INSERT INTO messages SET ?', data)
  },
  getAllMessageById: (id) => {
    return actionQuery('SELECT * FROM messages WHERE userSenderId = ? OR userReceiverId = ?', [id, id])
  }
}

module.exports = messagesModels