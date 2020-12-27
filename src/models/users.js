const { actionQuery } = require('../helpers/actionQuery')

const usersModels = {
  userRegister: (data) => {
    return actionQuery('INSERT INTO users SET ?', data)
  },
  checkRegisteredEmail: (email) => {
    return actionQuery('SELECT email FROM users WHERE email = ?', email)
  },
  checkDataUserByField: (field, dataSearch) => {
    return actionQuery(`SELECT COUNT(*) as user FROM users WHERE ${field} = ? `, dataSearch)
  },
  getAllUser: (limit, offset, order, username) => {
    if(username) {
      return actionQuery('SELECT id, username, name, email, phoneNumber, photoProfile, status, idMessage, currentLocation, bio FROM users WHERE username LIKE ?', `%${username}%`)
    } else {
      return actionQuery(`SELECT id, username, name, email, phoneNumber, photoProfile, status, idMessage, currentLocation, bio FROM users  ORDER BY createdAt ${order} LIMIT ${offset},${limit}`)
    }
  },
  countDataTable: (table) => {
    return actionQuery(`SELECT COUNT(*)as totalData FROM ${table}`)
  },
  getUserById: (id) => {
    return actionQuery('SELECT id, username, name, email, phoneNumber, photoProfile, status, idMessage, currentLocation, bio FROM users WHERE id = ? ', id)
  },
  deleteUser: (id) => {
    return actionQuery(`DELETE FROM users WHERE id = ?`, id)
  },
  updateUser: (id, data) => {
    return actionQuery('UPDATE users SET ? WHERE id = ?', [data, id])
  },
  confirmPasswordByEmail: (email, data) => {
    return actionQuery('UPDATE users SET ? WHERE email = ?', [data, email])
  },
  login: (email) => {
    return actionQuery(`SELECT id, username, name, email, password, phoneNumber, photoProfile, status, idMessage, currentLocation, bio FROM users WHERE email = ?`, email)
  },
  searchRoleId: (id) => {
    return actionQuery(`SELECT roleId FROM users WHERE id = ?`, id)
  }
}

module.exports = usersModels