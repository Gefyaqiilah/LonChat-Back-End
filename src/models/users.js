const { actionQuery } = require('../helpers/actionQuery')

const usersModels = {
  userRegister: (data) => {
    return actionQuery('INSERT INTO users SET ?', data)
  },
  checkRegisteredEmail: (email) => {
    return actionQuery('SELECT email FROM users WHERE email = ?', email)
  },
  checkDataUserWithId: (id) => {
    return actionQuery('SELECT COUNT(*) as user FROM users WHERE id = ? ', id)
  },
  getAllUser: (limit, offset, order, username) => {
    if(username) {
      return actionQuery('SELECT username, name, email, phoneNumber, photoProfile, status, idMessage, currentLocation, bio FROM users WHERE username LIKE ?', `%${username}%`)
    } else {
      return actionQuery(`SELECT username, name, email, phoneNumber, photoProfile, status, idMessage, currentLocation, bio FROM users  ORDER BY createdAt ${order} LIMIT ${offset},${limit}`)
    }
  },
  countDataTable: (table) => {
    return actionQuery(`SELECT COUNT(*)as totalData FROM ${table}`)
  },
  getUserById: (id) => {
    return actionQuery('SELECT username, name, email, phoneNumber, photoProfile, status, idMessage, currentLocation, bio FROM users WHERE id = ? ', id)
  },
  deleteUser: (id) => {
    return actionQuery(`DELETE FROM users WHERE id = ?`, id)
  },
  updateUser: (id, data) => {
    return actionQuery('UPDATE users SET ? WHERE id = ?', [data, id])
  }
}

module.exports = usersModels