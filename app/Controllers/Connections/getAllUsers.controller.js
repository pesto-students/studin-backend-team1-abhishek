const cloudinary = require('../../Helpers/init_cloudinary');
const Sentry = require('@sentry/node');
const User = require('../../Models/User.model');



const getAllUsers = async (req, res) => {
    try {

        const currentUserId = req.user._id;
        const currentUserData = await User.findOne({
            _id: currentUserId
        })

        const allUsers = await User.find({
           _id: { $ne: currentUserId }
        });

        res.json({status: 200, data: allUsers});
    } catch (error) {
        console.log(error);
        Sentry.captureException(error);
    }
};

module.exports = getAllUsers;
