const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const usersModels = require('../models/users')
const response = require('../helpers/response')
const pagination = require('../helpers/pagination')
const sendEmailForgotPassword = require('../helpers/sendEmailForgotPassword')
const fs = require('fs')

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
    console.log(id)
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
    // check data user with id (field, data)
    const checkUser = await usersModels.checkDataUserByField('id', id)
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
    // check data user with id (field, data)
    const checkUser = await usersModels.checkDataUserByField('id', id)
    if(checkUser[0].user === 0) {
      const error = new createError(400, 'Wrong Id')
      return next(error)
    }

    const { username, name, email, phoneNumber, password, photoProfile, emailVerification, status, idMessage, currentLocation, bio  } = req.body 
    console.log('req.body :>> ', req.body);
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
      bio,
      updatedAt: new Date()
    }  
    // check if object value is empty then delete if empty
    for (var propName in data) {
        if (data[propName] === null || data[propName] === undefined || !data[propName]) {
          delete data[propName];
        }
      }

    if(Object.keys(data).length === 0 ) {
      const error = new createError(400, 'Nothing to update')
      return next(error)
    }
    console.log('data :>> ', data);
    usersModels.updateUser(id, data)
    .then(() => {
      response(res, 'User has been updated', { status: 'succeed', statusCode: 200 }, null)
    }).catch(() => {
      const error = new createError(500, 'Looks like server having trouble')
      return next(error)
    })
  },
  login: async (req, res, next) => {
    const { email, password } = req.body
    if(!email || !password) {
      const error = new createError(400, 'Email or Password cannot be empty')
      return next(error)
    }
    const checkEmail = await usersModels.login(email)
  
    if(checkEmail.length === 0) {
      const error = new createError(401, 'Invalid email or password')
      return next(error)
    }
    const dataUser = checkEmail[0]
    const match = await bcrypt.compare(password, dataUser.password);
    if(!match) {
      const error = new createError(401, 'Invalid email or password')
      return next(error)
    }
    // delete password object
    delete dataUser.password

    const accessToken = await jwt.sign({ id: dataUser.id, email: dataUser.email }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '7d' })
    const refreshToken = await jwt.sign({ id: dataUser.id, email: dataUser.email }, process.env.REFRESH_TOKEN_KEY)
    if(!accessToken || !refreshToken) {
      const error = new createError(500, 'Generate token failed')
      return next(error)  
    }
    response(res, { accessToken, refreshToken }, { status: 'succeed', statusCode: 200 }, null)
  },
  updatePhotoProfile: (req, res, next) => {
    const { id } = req.params
    if(!id) {
      const error = new createError(400, 'Id cannot be empty')
      return next(error)
    }
    if(!req.file) {
      const error = new createError(400, 'Photo Profile cannot be empty')
      return next(error)
    }

    usersModels.getUserById(id)
      .then( results => {
        if (results.length === 0) {
          const error = new createError(404, `ID Not Found`)
          return next(error)
        }
        const dataResults = results[0]

        const oldImage = dataResults.photoProfile
        if (oldImage) {
          const replaceString = oldImage.replace(`${process.env.BASE_URL}/photo/`, '')
          fs.unlink(`./uploads/${replaceString}`, err => {
            if (err) {
              const error = new createError(500, 'Failed to delete old photos')
              return next(error)
            }
          })
        }
        const data = {
          photoProfile:`${process.env.BASE_URL}/photo/${req.file.filename}`,
          updatedAt: new Date()
        }
        usersModels.updateUser(id, data)
        .then(() => {
          response(res, 'photo profile successfully updated', { status: 'succeed', statusCode: 200 }, null)
        }).catch(() => {
          const error = new createError(500, 'Looks like server having trouble')
          return next(error)
        })
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        return next(error)
      })
  },
  forgotPassword: async (req, res, next) => {
    const {email, code} = req.body
    if(!email || !code) {
      const error = new createError(401, 'Email or Code cannot be empty')
      return next(error)
    }
    const checkEmail = await usersModels.login(email)
    if(checkEmail.length === 0) {
      const error = new createError(401, 'Wrong email')
      return next(error)
    } else {
      next()
    }
  },
  confirmPassword: async (req, res, next) => {
    const email = req.params.email
    if(!email) {
      const error = new createError(400, 'email cannot be empty')
      return next(error)
    }

    const { password } = req.body 
    console.log(req.body)
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        const data = {
          password: hash,
          updatedAt: new Date()
        }  
        // check if object value is empty then delete if empty
        for (var propName in data) {
            if (data[propName] === null || data[propName] === undefined || !data[propName]) {
              delete data[propName];
            }
          }
    
        if(Object.keys(data).length === 0 ) {
          const error = new createError(400, 'Nothing to update')
          return next(error)
        }
        usersModels.confirmPasswordByEmail(email, data)
        .then(() => {
          response(res, 'User has been updated', { status: 'succeed', statusCode: 200 }, null)
        }).catch(() => {
          const error = new createError(500, 'Looks like server having trouble')
          return next(error)
        })
      })
    })
  }
}

module.exports = usersControllers