// const { authService } = require('../../Services/Auth.service');
const cloudinary = require('../../Helpers/init_cloudinary');
const createToken = require('../../Services/Auth.service');
const Sentry = require('@sentry/node');
const User = require('../../Models/User.model');

const findUserByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};

const register = async (req, res) => {
  try {
    console.log("Entering register body");
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
    // console.log(imageResult);
    const payload = {
      email: userId,
      firstName: firstName,
      lastName: lastName,
      schoolName: schoolName,
      collegeName: collegeName,
      // interests: interests,
      profilePhoto: imageResult.secure_url,
    };
    console.log(payload);
    console.log("Starting MongoDB insert");
    // try {
    const newUser = await User.create(payload);  
    console.log(newUser);
    console.log("Creating new token");
    const signedJwt = await createToken({'email': userId});
    console.log(signedJwt);
    console.log("Sending jwt data");
    res.json({status: 200, accessToken: signedJwt});
    //   return
    //   // return [true, newUser];
    // } catch (error) {
    //   console.log(error);
    //   console.log("Error occured when creating user");
    // }
  } catch (error) {
      return res.status(400).send({
        error: error.message,
        message: 'Unable to create new user',
        });
    return [false, 'Unable to sign up, Please try again later', error];
  }
};

// const register = async (req, res) => {
//   const {email, otp} = req.body;
//   const isExisting = await findUserByEmail(email);
//   if (isExisting) {
//     return res.send('Already existing');
//   }
//   // create new user
//   const newUser = await createUser(email, otp);
//   if (!newUser[0]) {
//     return res.status(400).send({
//       message: 'Unable to create new user',
//     });
//   }
//   res.send(newUser);
// };

module.exports = register;
