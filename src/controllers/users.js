const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')

const usersModels = require('../models/users')
const response = require('../helpers/response')
const pagination = require('../helpers/pagination')
const sendEmailForgotPassword = require('../helpers/sendEmailForgotPassword')

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
  },
  getUser: async (req, res, next) => {
    const { limit = 4, page = 1, order = "DESC" } = req.query
    const offset = (parseInt(page) - 1) * parseInt(limit)
    const username = req.query.username || null

    // pagination (limit, page, endpoint, table)
    const setPagination = await pagination(limit, page, "users", "users")
    usersModels.getAllUser(limit, offset, order, username)
      .then(results => {
        const setResults = {
          pagination: setPagination,
          users: results
        }
        response(res, setResults, { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(() => {
        const errorResult = new createError(500, 'Looks like server having trouble')
        return next(errorResult)
      })
  },
  getUserById: (req, res, next) => {
    const id = req.params.id
    if(!id){
      const error = new createError(400, 'Id user cannot be empty')
      return next(error)
    }
    
    usersModels.getUserById(id)
      .then(results => {
        if(results.length < 1) {
          const error = new createError(400, 'User not found')
          return next(error)
        }
        response(res, results[0], { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(() => {
        const errorResult = new createError(500, 'Looks like server having trouble')
        return next(errorResult)
      })
  },
  sendEmailForgotPassword: async (req, res, next) => {
    const { email, code } = req.body
    if(!email || !code ) {
      const error = new createError(400, 'Email or Code cannot be empty')
      return next(error)
    }
    try {
     await sendEmailForgotPassword(email, code)
     response(res, 'email forgot password has been sent', { status: 'succeed', statusCode: 200 }, null)
    } catch (error) {
      const errorResult = new createError(400, error)
      return next(errorResult)
    }
  },
  deleteUser: async (req, res, next) => {
    const id = req.params.id
    if(!id) {
      const error = new createError(400, error)
      return next(error)
    }
    // check data user with id
    const checkUser = await usersModels.checkDataUserWithId(id)
    if(checkUser[0].user === 0) {
      const error = new createError(400, 'Wrong Id')
      return next(error)
    }

    usersModels.deleteUser(id)
    .then(() => {
      response(res, 'User has been deleted', { status: 'succeed', statusCode: 200 }, null)
    }).catch(() => {
      const error = new createError(500, 'Looks like server having trouble')
      return next(error)
    })
  },
  updateUser: async (req, res, next) => {
    const id = req.params.id
    if(!id) {
      const error = new createError(400, 'Id cannot be empty')
      return next(error)
    }
    // check data user with id
    const checkUser = await usersModels.checkDataUserWithId(id)
    console.log(checkUser)
    if(checkUser[0].user === 0) {
      const error = new createError(400, 'Wrong Id')
      return next(error)
    }

    const { username, name, email, phoneNumber, password, photoProfile, emailVerification, status, idMessage, currentLocation, bio  } = req.body 
    const data = {
      username,
      name,
      email,
      phoneNumber,
      password,
      photoProfile,
      emailVerification,
      status,
      idMessage,
      currentLocation,
      bio
    }  
    // check if object value is empty
    for (var propName in data) {
        if (data[propName] === null || data[propName] === undefined || !data[propName]) {
          delete data[propName];
        }
      }

    console.log('data :>> ', data);

    if(Object.keys(data).length === 0 ) {
      const error = new createError(400, 'Nothing to update')
      return next(error)
    }
    usersModels.updateUser(id, data)
    .then(() => {
      response(res, 'User has been updated', { status: 'succeed', statusCode: 200 }, null)
    }).catch(() => {
      const error = new createError(500, 'Looks like server having trouble')
      return next(error)
    })
  }
}

module.exports = usersControllers