const { actionQuery } = require('../helpers/actionQuery')

const roomModels = {
  newRoom: (payload) => {
    return actionQuery('INSERT INTO rooms SET ?', payload)
  },
  addMember: (payload) => {
    return actionQuery('INSERT INTO room_member SET ?', payload)
  },
  checkRoomMember: (payload) => {
    return actionQuery('SELECT * FROM room_member WHERE userId = ? AND roomId = ?', [payload.userId, payload.roomId])
  },
  newMessage: (payload) => {
    return actionQuery('INSERT INTO room_message SET ?', payload)
  }
}

module.exports = roomModels