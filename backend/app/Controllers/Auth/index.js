const login = require('./login.controller')
const logout = require('./logout.controller')
const register = require('./register.controller')
const sendOTP = require('./sendOTP.controller')
const verifyOTP = require('./verifyOTP.controller')
const createUser = require('./createUser.controller')
const getUser = require('./getUser.controller')

module.exports = {login,logout,register,sendOTP,verifyOTP, createUser, getUser};