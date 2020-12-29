const express = require('express')
const router = express.Router()

const {
getDataFriendsById
}= require('../controllers/friends')

router
  .get('/:id', getDataFriendsById)
  .post('/:id')

module.exports = router