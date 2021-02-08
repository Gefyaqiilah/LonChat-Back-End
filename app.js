require('dotenv').config()
const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const socket = require('socket.io')

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT

const response = require('./src/helpers/response')
const indexRoute = require('./src/routers/index');
const socketCb = require('./src/socketio/index');

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))

// read photo
app.use('/photo', express.static('./uploads'))

// Grouping endpoint v1
app.use('/v1', indexRoute)

// Error Handling
app.use((err, req, res, next) => {
    response(res, null, { status: err.status || 'Failed', statusCode: err.statusCode || 400 }, { message: err.message })
})

// socket server
const io = socket(server, {
    cors: {
        origin: '*'
    }
})

io.on("connection", socketCb)

server.listen(PORT, () => console.log('Server running on port: ', PORT))