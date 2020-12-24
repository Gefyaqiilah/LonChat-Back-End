require('dotenv').config()
const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan');

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

const usersRoute = require('./src/routers/users');

// Grouping endpoint
app.use('/v1/users', usersRoute)

// Error Handling
app.use((err, req, res, next) => {
    response(res, null, { status: err.status || 'Failed', statusCode: err.statusCode || 400 }, { message: err.message })
})

server.listen(PORT, () => console.log('Server running on port: ', PORT))