const cloudinary = require('../../Helpers/init_cloudinary');
const Sentry = require('@sentry/node');
const User = require('../../Models/User.model');
const ConnectionRequest = require('../../Models/ConnectionRequest.model');

const addConnection = async (req,res) => {
    try {
        const {sender,receiver} = req.body;
        const connReq = await ConnectionRequest.create({
            senderId: sender,
            receiverId: receiver,
            isAccepted: false
        });
        console.log(connReq);
        const updatedUserConnections = await User.findOneAndUpdate(
            {email: sender},
            { $set: {connectionRequests: connReq._id}},
            {new: true}
        );
        console.log(updatedUserConnections);
        res.json({status: 200, data: connReq});
    } catch (error) {
        console.log(error);
        Sentry.captureException(error);
    }
}

module.exports = addConnection;

