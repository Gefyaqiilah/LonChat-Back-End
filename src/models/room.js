const { actionQuery } = require('../helpers/actionQuery')

const roomModels = {
  newRoom: (payload) => {
    return actionQuery('INSERT INTO rooms SET ?', payload)
  }
}

module.exports = roomModels