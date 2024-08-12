const express = require('express')
const router = express.Router()
const { validationErrorHandler, checkEmailOrUsername } = require('./../../middleware/index')
const { creatUserValidator, userLoginValidator } = require('./../../validation/auth_validation')
const { createUser, userLogin } = require('./../../controller/auth')
router.post('/auth/resgister', creatUserValidator, validationErrorHandler, createUser)
router.post('/auth/login', userLoginValidator, checkEmailOrUsername, validationErrorHandler, userLogin)
module.exports = router