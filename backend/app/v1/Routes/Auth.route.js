const controllers = require('../../Controllers/Auth.controller')
const router = require('express').Router()

router.post('/login', controllers.login)
router.post('/register', controllers.register)
router.post('/logout', controllers.logout)
// OTP
router.get('/sendEmailOTP', controllers.sendOTP)
router.get('/verifyEmailOTP', controllers.verifyOTP)

module.exports = router;