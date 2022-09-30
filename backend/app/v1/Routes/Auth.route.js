const controllers = require('../../Controllers/Auth')
// const sendOTP = require('../../Controllers/Auth/sendOTP.controller')
const router = require('express').Router()

//test routes
router.get("/", (req, res) => { res.send("<h2>It's Working at auth base!</h2>"); });
// router.post("/createUser", controllers.createUser);
// router.get("/getUser", controllers.getUser);

//key routes
router.post("/login", controllers.login)
router.post('/register', controllers.register)
router.post('/logout', controllers.logout)
// OTP
router.route('/sendEmailOTP').post(controllers.sendOTP)
// auRouter.get('/verifyEmailOTP', controllers.verifyOTP)

module.exports = router;