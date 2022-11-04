const jwt = require('jsonwebtoken');
const Sentry = require("@sentry/node");
const User = require('../Models/User.model');
const {ACCESS_TOKEN_SECRET_KEY} = process.env;

const requireAuth = async (req, res, next) => {

  try {

    if (req.headers){
      const accessToken = req.headers.authorization ? req.headers["authorization"].split(' ')[1] : '';

      await jwt.verify(
        accessToken,
        ACCESS_TOKEN_SECRET_KEY,
        async (err, decodedToken) => {
          try {
            // console.log("Step 1");
            if (err) res.json({message: 'invalid token', status: 401});
            const {payload} = decodedToken;
            const user = await User.findOne({email: payload.email});
            // console.log("Step 2");
            if(!user){
              Sentry.captureMessage('Invalid user details', 'warning');
              res.json({message: 'Invalid user details', status: 400});
            }

            user.accessToken = accessToken;
            req.user = user;

            next();
          } catch (err) {
            Sentry.captureException(err);
            return;
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
