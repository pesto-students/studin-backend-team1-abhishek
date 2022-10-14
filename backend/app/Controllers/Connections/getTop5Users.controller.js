const cloudinary = require('../../Helpers/init_cloudinary');
const Sentry = require('@sentry/node');
const User = require('../../Models/User.model');

const getTop5Users = async (req, res) => {
    try {
        const allUsers5 = await User.find().limit(5);
        res.json({status: 200, data: allUsers5});
    } catch (error) {
        Sentry.captureException(error);
    }
};

module.exports = getTop5Users;
