const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MyObjectId = mongoose.Types.ObjectId;

const OtpSchema = new Schema({
    user: { type: MyObjectId, ref: 'User' },
    // loggedin_user: { type: String, required: true, unique: true },
    otp: {
      type: String,
      required: true
    }
  },
  { timestamps: true, toJSON: { getters: true } },
);

const Otp = mongoose.model('Otp', OtpSchema);
module.exports = Otp;