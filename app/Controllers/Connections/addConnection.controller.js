const Sentry = require('@sentry/node');
const User = require('../../Models/User.model');
const ConnectionRequest = require('../../Models/ConnectionRequest.model');

const addConnection = async (req,res) => {
    try {
        const {senderEmail, receiverEmail} = req.body;
        
        senderData = await User.findOne({ email : senderEmail });
        receiverData = await User.findOne({ email : receiverEmail });

        const existingConnRequest = await ConnectionRequest.findOne({
            senderId: senderData._id,
            receiverId: receiverData._id
        });
        console.log(existingConnRequest);
        if (!existingConnRequest){
            const connReq = await ConnectionRequest.create({
                senderId: senderData._id,
                receiverId: receiverData._id,
                isAccepted: false
            });
            console.log(connReq);
            const updatedReceiverConnections = await User.findOneAndUpdate(
                { _id: receiverData._id },
                { $set: {connectionRequests: connReq._id}},
                { new: true }
            );
            console.log(updatedReceiverConnections);
            res.json({status: 200, data: updatedReceiverConnections});
        }
    } catch (error) {
        console.log(error);
        Sentry.captureException(error);
    }
}

module.exports = addConnection;

