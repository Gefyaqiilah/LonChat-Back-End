const messagesModels = require('../models/messages')
const usersModels = require('../models/users');

const io = socket => {
  socket.on("loginRoomSelf", data => {
    // update status to online
    socket.join(data.id)
    socket.broadcast.emit('userOnline', data.id); // everyone gets it but the sender
    usersModels.updateUser(data.id, { status: 'online' })
    .then(() => {
        socket.join(data.id)
        socket.broadcast.emit('userSt'); // everyone gets it but the sender
    }).catch(() => {
        
    })
  })
  socket.on("joinPersonalChat", data => {
      socket.join(data.receiverId)
  })
  socket.on("joinRoomChat", data => {
      console.log('ada orang masuk room ini', data)
      socket.join(data.roomId)
  })
  socket.on("roomChat", (data, sendBack) => {
    sendBack(data)
    socket.to(data.userReceiverId).emit('receiveMessage', data)
  })
  socket.on("personalChat", (data, sendBack) => {
      const formatMessage = {
          message: data.message,
          photo: data.photo,
          userSenderId: data.userSenderId,
          userReceiverId: data.userReceiverId,
          messageStatus:0,
          time: data.time,
          createdAt:new Date()
      }

      if (data.photo) {
          sendBack(formatMessage)
          formatMessage.senderName = data.senderName
        return socket.to(data.userReceiverId).emit('receiveMessage', formatMessage)       
      } else {
          sendBack(formatMessage)
          formatMessage.senderName = data.senderName
          socket.to(data.userReceiverId).emit('receiveMessage', formatMessage)
          
          // insert to database
          delete formatMessage.senderName
          messagesModels.insertMessage(formatMessage)
          .then(() => {
          })
      }
    })
  socket.on("leave", (data) => {
      console.log('ada yang leave >> ', data)
      socket.leave(data)
  })
  socket.on("logout", (data) => {
      // update status to offline
      usersModels.updateUser(data, { status: 'offline' })
      .then(() => {
          socket.broadcast.emit('userOffline', data) // everyone gets it but the sender
          socket.disconnect()
          console.log('user logout')
      })
  })
  socket.on("disconnect", (data) => {
      console.log('disconnect')
  });
}

module.exports = io