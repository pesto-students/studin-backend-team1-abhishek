const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MyObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  age: {
    type: String,
  },
  schoolName: {
    type: String,
    default: '',
  },
  collegeName: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
  interests: {
    type: String,
    // enum: ['Music', 'Art', 'Sports', 'Literature', 'History',
    //   'Science', 'Technology', 'Gardening', 'Entertainment'],
  },
  bio: {
    type: String,
    default: '',
    trim: true,
  },
  profilePhoto: {
    type: String,
    default: '',
    get: (profilePhoto) => (profilePhoto ?
      `${profilePhoto}` : profilePhoto),
  },
  coverPhoto: {
    type: String,
    default: '',
    get: (coverPhoto) => (coverPhoto ?
      `${coverPhoto}` : coverPhoto),
  },
  posts: [{
    type: MyObjectId,
    ref: 'Post',
  }],
  connections: [{
    type: MyObjectId, 
    ref: 'User'
  }],
  connectionRequests: [{
    type: MyObjectId,
    ref: 'ConnectionRequest',
  }],
},
{
  timestamps: true, 
  toJSON: {
    getters: true
  }},
);

UserSchema.index({email: 'text'});

const User = mongoose.model('User', UserSchema);
module.exports = User;
