const Sentry = require('@sentry/node');
const User = require('../../Models/User.model');
const ConnectionRequest = require('../../Models/ConnectionRequest.model');

const getMyConnRequests = async (req, res) => {
    try {
        const myConnRequests = await ConnectionRequest.find({ receiverId: req.user._id, isAccepted: false })
        .populate({path: 'senderId', select: ['email', 'firstName', 'lastName', 'profilePhoto', 'schoolName']})
        .limit(5);
        console.log(myConnRequests);
        res.json({status: 200, data: myConnRequests});
        return;
    } catch (error) {
        console.log(error);
        Sentry.captureException(error);
    }
}

module.exports = getMyConnRequests;

