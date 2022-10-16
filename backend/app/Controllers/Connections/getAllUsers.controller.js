const cloudinary = require('../../Helpers/init_cloudinary');
const Sentry = require('@sentry/node');
const User = require('../../Models/User.model');

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json({status: 200, data: allUsers});
    } catch (error) {
        console.log(error);
        Sentry.captureException(error);
    }
};

module.exports = getAllUsers;
