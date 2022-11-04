const Sentry = require('@sentry/node');
const User = require('../../Models/User.model');
const ConnectionRequest = require('../../Models/ConnectionRequest.model');

const acceptConnectionRequest = async (req, res) => {
    try {
        const {connectionRequestId} = req.body;
        const connectionReqData = await ConnectionRequest.findOneAndUpdate({ _id : connectionRequestId }, { isAccepted: true});
        const updatedUserConnections1 = await User.findOneAndUpdate(
            { _id: connectionReqData.senderId }, 
            { $push: { connections: connectionReqData.receiverId  } });
        const updatedUserConnections2 = await User.findOneAndUpdate(
            { _id: connectionReqData.receiverId }, 
            { $push: { connections: connectionReqData.senderId  } });
        res.json({status: 200, message: 'Accepted conn req successfully!'});
        return;
    } catch (error) {
        console.log(error);
        Sentry.captureException(error);
        return;
    }
}

module.exports = acceptConnectionRequest;

