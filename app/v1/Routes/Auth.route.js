const controllers = require('../../Controllers/Auth');
const express = require('express');
const { requireAuth } = require('../../Middlewares/jwt_auth');
const router = new express.Router();

// test routes
router.get('/', (req, res) => {
  res.send('<h2>It\'s Working at auth base!</h2>');
});

router.post('/login', controllers.login);
router.post('/register', controllers.register);
router.get('/logout', controllers.logout);
router.route('/sendEmailOTP').post(controllers.sendOTP);
router.post('/profileimage', controllers.profileImage);
router.get('/verifyUserLogin', requireAuth,controllers.verifyUserLogin);

// router.post("/createUser", controllers.createUser);
router.get("/getAllUsers", controllers.getUser);

module.exports = router;
