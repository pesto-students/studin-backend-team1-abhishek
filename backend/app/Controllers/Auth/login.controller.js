// const {authService} = require('../../Services/Auth.service');
const Otp = require('../../Models/Otp.model');
const User = require('../../Models/User.model');
const createToken = require('../../Services/Auth.service');
const Sentry = require('@sentry/node');

const login = async (req, res) => {
  try {
    console.log(req.body);
    const {email, otp} = req.body;
    const existingUser = await User.findOne({
      email: email,
    });
    let latestUser = '';
    if (!existingUser) {
      res.status(400).json({status: 400});
    } else {
      latestUser = await Otp.findOne({
        email: email,
      });
    }
    console.log(latestUser);
    if (latestUser && latestUser.otp !== otp) {
      console.log('invalid otp!');
      res.json({
        status: 400,
        message: "Invalid OTP for user!"
      })
    } else {
        const signedJwt = createToken({'email': email}, "access");
        console.log(`jwt --> ${signedJwt}`);
        res.status(201).json({status: 201, signedJwt});
    }
    console.log('OTP matches, login successful!');
    return;
  } catch (error) {
    Sentry.captureException(error);
    res.status(400).json({status: 400, 
      message: 'Error occured during login'});
    return;
  }
};

module.exports = login;
