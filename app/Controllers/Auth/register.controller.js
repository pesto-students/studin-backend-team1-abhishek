const cloudinary = require('../../Helpers/init_cloudinary');
// const createToken = require('../../Services/Auth.service');
const createToken = require('../../Middlewares/generateJWT');
const Sentry = require('@sentry/node');
const User = require('../../Models/User.model');

const register = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send('Insufficient data');
    }
    const {
      userId, firstName, lastName, schoolName, collegeName, interests,
    } = req.body;
    const file = req.files.image;

    const imageResult = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: 'auto',
      folder: 'studin/users-profile-images',
    });

    const payload = {
      email: userId,
      firstName: firstName,
      lastName: lastName,
      schoolName: schoolName,
      collegeName: collegeName,
      // interests: interests,
      profilePhoto: imageResult.secure_url,
    };
    const newUser = await User.create(payload);
    console.log('new user ._id --> ', newUser._id);
    const signedJwt = await createToken({'email': userId}, "access");
    return res
      .cookie("accessToken", `Bearer ${signedJwt}`, {
        httponly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 30,
      })
      .header("Access-Control-Allow-Credentials", true)
      .header("Origin-Allow-Credentials", true)
      .json({status: 200, accessToken: signedJwt, userId: newUser._id, userEmail: userId});
    console.log('cookie created successfully');

  } catch (error) {
      return res.send({
        status: 400,
        error: error.message,
        message: 'Unable to create new user',
      });
  }
};

module.exports = register;
