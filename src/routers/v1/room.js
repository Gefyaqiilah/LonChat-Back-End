const express = require('express');
const router = express.Router()
const { uploadMulter } = require('../../middleware/uploadImage')
const {
  newRoom
} = require('../../controllers/room');

router
.post('/new-room', uploadMulter.single('photo'),newRoom)

module.exports = router