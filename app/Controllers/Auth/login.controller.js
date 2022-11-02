const Otp = require('../../Models/Otp.model');
const User = require('../../Models/User.model');
const createToken = require('../../Middlewares/generateJWT');
const Sentry = require('@sentry/node');

const login = async (req, res) => {
  try {
    // console.log(req.body);
    const {email, otp} = req.body;
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
          res
            .cookie("accessToken", `Bearer ${signedJwt}`, {
              httponly: true,
              sameSite: "none",
              secure: true,
              maxAge: 1000 * 60 * 30,
            })
            .header("Access-Control-Allow-Credentials", true)
            .header("Origin-Allow-Credentials", true)
            .json({ userEmail: email, accessToken: signedJwt, status: 201 });
          console.log('cookie created successfully');
        }
    }
    // console.log('OTP matches, login successful!');
    // res.json({status: 201, message: 'Logged in and cookie created 100%'});
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
