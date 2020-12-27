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
// read photo
app.use('/photo', express.static('./uploads'))

// Grouping endpoint
app.use('/v1/users', usersRoute)
app.use('/v1/messages', messagesRoute)

// Error Handling
app.use((err, req, res, next) => {
    response(res, null, { status: err.status || 'Failed', statusCode: err.statusCode || 400 }, { message: err.message })
})

const messagesModels = require('./src/models/messages');
// socket server
const io = socket(server, {
    cors: {
        origin: '*'
    }
})

io.on("connection", socket => {
    socket.on("loginRoomSelf", data => {
        socket.join(data.id)
    })
    socket.on("joinPersonalChat", data => {
        console.log('join :>> ', data);
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
            createdAt:moment(new Date()).format("L")
        }
        sendBack(formatMessage)
        socket.broadcast.to(data.userReceiverId).emit('receiveMessage', formatMessage)
        messagesModels.insertMessage(formatMessage)
        .then(() => {
            
        }).catch((err) => {
            console.log('err :>> ', err);
        })
        console.log('formatMessage :>> ', formatMessage);
    })
    socket.on("leave", (data) => {
        console.log('leave :>> ', data)
        socket.leave(data)
    })
    socket.on("disconnect", () => {
        console.log(' >> ' )
       });
})

server.listen(PORT, () => console.log('Server running on port: ', PORT))