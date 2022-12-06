const Otp = require('../../Models/Otp.model');
const User = require('../../Models/User.model');
const createToken = require('../../Middlewares/generateJWT');
const Sentry = require('@sentry/node');

const login = async (req, res) => {
  try {
    // console.log(req.body);
    const {email, otp} = req.body;

    //Handling guest user credentials
    if (email === 'guest@gmail.com' && otp === '123456') {
      const signedJwt = createToken({'email': email}, "access");
      const userData = await User.findOne({
        email: email,
      });
      let responsePayload = {
        userEmail: email,
        accessToken: signedJwt,
        status: 201 
      }
      if (userData){
        responsePayload['userId'] = userData._id;
      }
      res
        .cookie("accessToken", `Bearer ${signedJwt}`, {
          httponly: true,
          sameSite: "none",
          secure: true,
          maxAge: 1000 * 60 * 30,
        })
        .header("Access-Control-Allow-Credentials", true)
        .header("Origin-Allow-Credentials", true)
        .json(responsePayload);
      console.log('cookie created successfully');
      return
    }

    const existingUser = await User.findOne({
      email: email,
    });
    let latestUser = '';
    if (!existingUser) {
      res.json({status: 400, message: 'You seem to be new here. Please register!'});
    } else {
      latestUser = await Otp.findOne({
        email: email,
      });
    }

    if (latestUser && latestUser.otp !== otp) {

      res.json({ status: 400, message: "Invalid OTP for user!" })
    } else {
      const { accessToken } = req.cookies;
      if (accessToken) {
        const {accessToken} = req.cookies;
        // delete req.user.accessToken;
        const user = JSON.parse(JSON.stringify(req.user));
        const cleanUser = Object.assign({}, user);
        res
          .cookie("accessToken", `Bearer ${accessToken}`, {
            httponly: true,
            sameSite: "none",
            secure: true,
            maxAge: 1000 * 60 * 30,
          })
          .header("Access-Control-Allow-Credentials", true)
          .header("Origin-Allow-Credentials", true)
          .json({ data: cleanUser });
      } else {
          const signedJwt = createToken({'email': email}, "access");
          const userData = await User.findOne({
            email: email,
          });
          console.log('user data before sending login info --> ', userData);
          let responsePayload = {
            userEmail: email,
            accessToken: signedJwt,
            status: 201 
          }
          if (userData){
            responsePayload['userId'] = userData._id;
          }
          res
            .cookie("accessToken", `Bearer ${signedJwt}`, {
              httponly: true,
              sameSite: "none",
              secure: true,
              maxAge: 1000 * 60 * 30,
            })
            .header("Access-Control-Allow-Credentials", true)
            .header("Origin-Allow-Credentials", true)
            .json(responsePayload);
          console.log('cookie created successfully');
        }
    }

    return;
  } catch (error) {
    Sentry.captureException(error);
    res.json({
      status: 400,
      message: 'Error occured during login'});
    return;
  }
};

module.exports = login;
