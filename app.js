require('dotenv').config()
const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const socket = require('socket.io')
const moment = require('moment')

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT

const response = require('./src/helpers/response')

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))

const usersRoute = require('./src/routers/users')
const messagesRoute = require('./src/routers/messages')
const friendsRoute = require('./src/routers/friends')
// read photo
app.use('/photo', express.static('./uploads'))

// Grouping endpoint
app.use('/v1/users', usersRoute)
app.use('/v1/messages', messagesRoute)
app.use('/v1/friends', friendsRoute)
// Error Handling
app.use((err, req, res, next) => {
    response(res, null, { status: err.status || 'Failed', statusCode: err.statusCode || 400 }, { message: err.message })
})

const messagesModels = require('./src/models/messages')
const usersModels = require('./src/models/users');
const { format } = require('./src/configs/db');
// socket server
const io = socket(server, {
    cors: {
        origin: '*'
    }
})

io.on("connection", socket => {
    socket.on("loginRoomSelf", data => {
        // update status to online
        socket.join(data.id)
        socket.broadcast.emit('userOnline', data.id); // everyone gets it but the sender
        usersModels.updateUser(data.id, { status: 'online' })
        .then(() => {
            socket.join(data.id)
            socket.broadcast.emit('userSt'); // everyone gets it but the sender
            console.log('berhasillogin')
        }).catch(() => {
            
        })
    })
    socket.on("joinPersonalChat", data => {
        socket.join(data.receiverId)
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
        formatMessage.senderName = data.senderName
        sendBack(formatMessage)
        socket.to(data.userReceiverId).emit('receiveMessage', formatMessage)

        // insert to database
        delete formatMessage.senderName
        messagesModels.insertMessage(formatMessage)
        .then(() => {
        })
    })
    socket.on("leave", (data) => {
        socket.leave(data)
    })
    socket.on("logout", (data) => {
        // update status to offline
        usersModels.updateUser(data, { status: 'offline' })
        .then(() => {
            socket.broadcast.emit('userOffline', data) // everyone gets it but the sender
            socket.disconnect()
            console.log('berhasil logout')
        })
    })
    socket.on("disconnect", (data) => {
        console.log('disconnect')
    });
})

server.listen(PORT, () => console.log('Server running on port: ', PORT))