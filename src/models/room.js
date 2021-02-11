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
  },
  getMembersRoom: ({roomId}) => {
    return actionQuery('SELECT userId FROM room_member WHERE roomId = ?', roomId)
  },
  getMessage: ({roomId}) => {
    return actionQuery('SELECT * FROM room_message WHERE roomId = ? ORDER BY createdAt ASC', roomId)
  },
  checkMember: ({userId, roomId}) => {
    return actionQuery('SELECT COUNT(*) AS exist FROM room_member WHERE roomId = ? AND userId = ?', [roomId, userId])
  },
  getRooms: ({userId}) => {
    return actionQuery('SELECT rooms.id AS roomId,name, photoProfile, rooms.createdAt AS roomCreated, userId, room_member.createdAt AS joinAt FROM rooms INNER JOIN room_member ON room_member.userId = ? WHERE rooms.id = room_member.roomId', userId)
  },
  getLastMessage: ({roomId}) => {
    return actionQuery('SELECT * FROM room_message WHERE roomId = ? ORDER BY createdAt DESC LIMIT 1', roomId)
  }
}

module.exports = roomModels