const express = require('express')
const router = express.Router()

const {
getDataFriendsById,
addFriend
}= require('../controllers/friends')

router
  .get('/:id', getDataFriendsById)
  .post('/', addFriend)

module.exports = router