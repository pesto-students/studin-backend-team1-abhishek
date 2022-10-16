const jwt = require('jsonwebtoken');
const Sentry = require("@sentry/node");
const User = require('../Models/User.model');
const {ACCESS_TOKEN_SECRET_KEY} = process.env;

const requireAuth = async (req, res, next) => {

  try {
    if (req.cookies.accessToken) {
      const accessToken = req.cookies.accessToken.split(' ')[1];
      // const refreshToken = req.cookies.refreshToken.split(' ')[1];
      await jwt.verify(
        accessToken,
        ACCESS_TOKEN_SECRET_KEY,
        async (err, decodedToken) => {
          try {
            if (err) res.json({message: 'invalid token', status: 401});
            const {payload} = decodedToken;
            const user = await User.findOne({email: payload.email});
            if(!user){
              Sentry.captureMessage('Invalid user details', 'warning');
              res.json({message: 'Invalid user details', status: 400});
            }
            user.accessToken = accessToken;
            // user.refreshToken = refreshToken;
            req.user = user;
            next();
          } catch (err) {
            Sentry.captureException(err);
            res.json({message:'Try after sometime', status: 401});
          }
        }
      )

    } else {
      res
        .json({ message: 'Cookie did not exist in requireAuth middleware check', status: 401});
    }

  } catch (error) {
      console.log(error);
      Sentry.captureException('Error occured during auth verification')
  }

};

module.exports = {requireAuth};
