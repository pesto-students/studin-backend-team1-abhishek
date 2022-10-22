const login = require('./login.controller');
const logout = require('./logout.controller');
const register = require('./register.controller');
const sendOTP = require('./sendOTP.controller');
const createUser = require('./createUser.controller');
const getUser = require('./getUser.controller');
const profileImage = require('./profileImage.controller');
const verifyUserLogin = require('./verifyUserLogin.controller');

module.exports = {
  login,
  logout,
  register,
  sendOTP,
  createUser,
  getUser,
  profileImage,
  verifyUserLogin,
};
