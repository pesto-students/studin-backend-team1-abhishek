const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MyObjectId = mongoose.Types.ObjectId;

const CommentSchema = new Schema({
    author: { type: MyObjectId, ref: 'User' },
    text: { type: String, required: true }
  });

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;