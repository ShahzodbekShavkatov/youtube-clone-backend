const router = require('express').Router()
const uploadController = require('../controllers/upload.js')


router.route('/')
    .post(uploadController.POST)


module.exports = router