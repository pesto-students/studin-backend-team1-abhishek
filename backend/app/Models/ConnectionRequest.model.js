const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ConnectionRequestSchema = new Schema({
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    is_accepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

const ConnectionRequest = mongoose.model('ConnectionRequest', ConnectionRequestSchema);
module.exports = ConnectionRequest;