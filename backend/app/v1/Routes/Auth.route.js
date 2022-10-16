const controllers = require('../../Controllers/Auth');
const express = require('express');
const { requireAuth } = require('../../Middlewares/bkp_jwt_auth');
const router = new express.Router();
// const { authLoginValidation } = require('../../Middlewares/requestValidations/authLogin');

// test routes
router.get('/', (req, res) => {
  res.send('<h2>It\'s Working at auth base!</h2>');
});
// router.post("/createUser", controllers.createUser);
// router.get("/getUser", controllers.getUser);

// key routes
// router.post('/login', authLoginValidation, controllers.login);
router.post('/login', controllers.login);
router.post('/register', controllers.register);
router.get('/logout', controllers.logout);
// OTP
router.route('/sendEmailOTP').post(controllers.sendOTP);

router.post('/profileimage', controllers.profileImage);

router.get('/verifyUserLogin', requireAuth,controllers.verifyUserLogin);

module.exports = router;
