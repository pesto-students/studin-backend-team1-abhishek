const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MyObjectId = mongoose.Types.ObjectId;

const PostSchema = new Schema({
  userId: {
    type: MyObjectId,
    ref: 'User',
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  imageUrl: {
    type: String,
    get: (imageUrl) => (imageUrl ? `${imageUrl}` : imageUrl),
  },
  likes: [{
    type: MyObjectId,
    ref: 'User',
  }],
  comments: [{
    type: MyObjectId,
    ref: 'Comment',
  }],
},
{
  timestamps: true, 
  toJSON: {
    getters: true
  }},
);

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
