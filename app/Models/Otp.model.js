const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MyObjectId = mongoose.Types.ObjectId;

const OtpSchema = new Schema({
  userId: {
    type: MyObjectId, 
    ref: 'User'
  },
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true,
  },
},
{
  timestamps: true, 
  toJSON: {
    getters: true
  }},
);

OtpSchema.index({createdAt: 1}, {expireAfterSeconds: 110});

const Otp = mongoose.model('Otp', OtpSchema);
module.exports = Otp;
