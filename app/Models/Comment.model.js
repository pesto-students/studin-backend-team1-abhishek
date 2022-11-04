const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MyObjectId = mongoose.Types.ObjectId;

const CommentSchema = new Schema({
  userId: {
    type: MyObjectId, 
    ref: 'User'
  },
  comment: {
    type: String, 
    required: true
  },
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
