const cloudinary = require('../../Helpers/init_cloudinary');
const Sentry = require('@sentry/node');
const User = require('../../Models/User.model');

const getAllUsers = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const allUsers = await User.find({
            // _id: currentUserId
        });
        // console.log('allUsers data -->', allUsers);
        // const updatedUserConnections = await User.findOne({ _id: currentUserId })
        //     .populate({path: 'connections'})

        res.json({status: 200, data: allUsers});
    } catch (error) {
        console.log(error);
        Sentry.captureException(error);
    }
};

module.exports = getAllUsers;
