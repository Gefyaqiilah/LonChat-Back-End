const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')

const usersModels = require('../models/users')
const response = require('../helpers/response')

const usersControllers = {
  userRegister: async (req, res, next) => {
    const { name, email, password } = req.body
    if(!name || !email || !password) {
      const errorResult = new createError(400, 'Name, Email & Password cannot be empty')
      return next(errorResult)
    }

    // check registered email
    const resultsCheckRegisteredEmail = await usersModels.checkRegisteredEmail(email)
    if(resultsCheckRegisteredEmail.length > 0) {
      const errorResult = new createError(400, 'Email has been used by other user')
      return next(errorResult)
    }

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        const data = {
          id: uuidv4(),
          name: name,
          email: email,
          password:hash,
          createdAt: new Date()
        }
        
        // post 
        usersModels.userRegister(data)
        .then(() => {
          response(res, 'User Has been created', { status: 'succeed', statusCode: 200 }, null)
        })
        .catch(() => {
          const errorResult = new createError(500, 'Looks like server having trouble')
          return next(errorResult)
        })
      })
  })
  }
}

module.exports = usersControllers