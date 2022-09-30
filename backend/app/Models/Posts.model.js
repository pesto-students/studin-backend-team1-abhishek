const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MyObjectId = mongoose.Types.ObjectId;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
    // user_id: ObjectId,
    post_author: {
      type: MyObjectId,
      ref: 'User'
    },
    post_title: {
      type: String,
      required: true
    },
    post_content: {
      type: String
    },
    post_image: {
      type: String,
      get: (post_image) => (post_image ? `${process.env.BASE_URL}${post_image}` : post_image),
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