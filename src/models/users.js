const { actionQuery } = require('../helpers/actionQuery')

const usersModels = {
  userRegister: (data) => {
    return actionQuery('INSERT INTO users SET ?', data)
  },
  checkRegisteredEmail: (email) => {
    return actionQuery('SELECT email FROM users WHERE email = ?', email)
  }
}

module.exports = usersModels