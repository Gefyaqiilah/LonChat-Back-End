const createError = require('http-errors')

const roomModels = require('../models/room');
const response = require('../helpers/response')

const roomControllers = {
  newRoom: async (req, res, next) => {
    console.log('req.body rooms >>', req.body)
    if (!req.body.name) {
      next(new createError(400, 'name cannot be empty'))
    }
    const payload  = {
      name: req.body.name,
      photo: `${process.env.BASE_URL}/photo/${req.file.filename}`
    }
    try {
      await roomModels.newRoom(payload)
      response(res, 'room has been created', { status: 'succeed', statusCode: 200 }, null)
    } catch (error) {
      console.log('error create new room >>', error)
      next(new createError(500, 'Looks like server having trouble'))
    }
  }
}

module.exports = roomControllers