const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConnectionRequestSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
},
{timestamps: true},
);

const ConnectionRequest = mongoose.model('ConnectionRequest',
    ConnectionRequestSchema);

module.exports = ConnectionRequest;
