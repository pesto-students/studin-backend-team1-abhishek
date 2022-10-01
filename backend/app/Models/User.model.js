const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MyObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    first_name: {
      type: String,
      default: ""
    },
    last_name: {
      type: String,
      default: ""
    },
    age: {
      type: String,
      required: true
    },
    school_name: {
      type: String,
      default: ""
    },
    college_name: {
      type: String,
      default: ""
    },
    city: {
      type: String,
      default: ""
    },
    country: {
      type: String,
      default: ""
    },
    interests: {
      type: Array,
      default: [],
    },    
    bio: {
      type: String,
      default: '',
      trim: true,
    },
    profile_photo: {
      type: String,
      default: "",
      get: (profile_photo) => (profile_photo ? `${process.env.IMAGE_BASE_URL}${profile_photo}` : profile_photo),
    },
    posts: [{
      type: MyObjectId,
      ref: 'Post'
    }],
    connections: [{
      email: {type: String, default: ""},
      first_name: {type: String, default: ""},
      last_name: {type: String, default: ""}
    }],
    connection_requests: [{
      type: MyObjectId,
      ref: 'ConnectionRequest'
    }],
    // activated: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, toJSON: { getters: true } },
);

UserSchema.index({email: 'text'});

const User = mongoose.model('User', UserSchema);
module.exports = User;