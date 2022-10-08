const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MyObjectId = mongoose.Types.ObjectId;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
    // user_id: ObjectId,
    user_id: {
      type: MyObjectId,
      ref: 'User'
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    image_url: {
      type: String,
      get: (post_image) => (post_image ? `${post_image}` : post_image),
    },
    likes: [{
      type: MyObjectId,
      ref: 'User'
    }],
    // likes: {type: Number},
    comments: [{
      type: MyObjectId,
      ref: 'Comment'
    }],
    // comments: [CommentSchema],
  },
  { timestamps: true, toJSON: { getters: true } },
);

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;