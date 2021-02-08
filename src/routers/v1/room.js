const express = require('express');
const router = express.Router()
const { uploadMulter } = require('../../middleware/uploadImage')
const {
  newRoom, addMember
} = require('../../controllers/room');

router
.post('/new-room', uploadMulter.single('photo'),newRoom)
.post('/add-member', addMember)

module.exports = router