const User = require('../../Models/User.model');
const cloudinary = require('../../Helpers/init_cloudinary');
const profileImage = async (req, res) => {
  try {
    const file = req.files.profile_photo;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'user',
      width: 400,
      crop: 'scale',
    });
    const user = User.create({
      profile_photo: result.secure_url,

    });
    res.status(200).json(user);
  } catch (error) {
    return;
  }
};

module.exports = profileImage;
