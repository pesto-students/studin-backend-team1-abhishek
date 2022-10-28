// const postsService = require('../services/Posts.service')
const cloudinary = require('../../Helpers/init_cloudinary');
const Sentry = require('@sentry/node');
const Post = require('../../Models/Posts.model');
const User = require('../../Models/User.model');
// const baseUrl = process.env.NEXT_STATIC_BASE_URL || 'http://localhost:9000';

const getPost = async (req, res) => {
  try {
    // const id = req.params.postId;
    // const post = await getPost(id);
    // const post = {id: "detailed post data"}
    res.json(post);
    return;
  } catch (err) {
    res.status(500).send(err);
    return;
  }
};

const getAllPosts = async (req, res) => {
  try {
    const {body} = req;
    // const currentUser = await User.findOne({
    //   email: body.email,
    // });
    const currentUserId = req.user._id;
    console.log('currentUser',currentUserId);
    const allPosts = await Post.find({
      userId: currentUserId,
    })
    .populate({path: 'userId', select: ['profilePhoto']});
    console.log(allPosts)
    res.status(200).send({status: 'OK', data: allPosts});
    return;
    // res.status(200).send("Get all posts for current user");
  } catch (error) {
    Sentry.captureException(error);
    console.log(error);
    console.log('Error occured when retrieving all posts');
    return;
  }
};
const createPost = async (req, res) => {
  try {
    const {body} = req;
    console.log(body);
    // if (!body.post_title || !body.post || !body.likes || !body.comments){
    // return;
    // }

    const file = req.files.image;
    const imageResult = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: 'auto',
      folder: 'studin/posts',
    });
    // console.log(`image result --> ${imageResult}`)
    // console.log(imageResult);
    const currentUser = await User.findOne({
      // email: 'test@gmail.com',
      _id: req.user._id
    });
    // console.log(currentUser)
    const newPost = {
      userId: req.user._id,
      // title: body.title ,
      content: body.content,
      imageUrl: imageResult.secure_url,
      // likes: [],
      // comments: []
    };
    const createdPost = await Post.create(newPost);
    console.log(createdPost);
    res.json({status: 200, data: createdPost});
    return;
  } catch (error) {
    Sentry.captureException(error);
    console.log('Error occured when creating post');
    console.log(error);
    return;
  }
};

const deletePost = async (req, res) => {
  try {
    // const {id} = req.params;
    // console.log();
    const deletedPost = await Post.deleteOne({post_title: 'Killer Miller'});
    res.status(200).json({status: 'OK', data: deletedPost});
    // res.send("Deleted 1 post for current user");
    return;
  } catch (error) {
    console.log('Error occured when deleting post');
    return;
  }
};

const addLike = async (req, res) => {
  try {
    const {postId} = req.body;
    currentUser = req.user._id;

    const postData = await Post.findOne({_id : postId}).populate({path: 'likes'});
    console.log("postData -->");
    console.log(postData);

    if (!postData.likes.includes(currentUser)){

      const oldDocument = await Post.findOneAndUpdate(
        { _id : postId }, 
        { $push: { likes: currentUser  } },
        function (error, success) {
              if (error) {
                  console.log(error);
              } else {
                  // console.log("Successfully liked the post!");
                  // console.log(success);
                  res.json({status: 200, message: "Successfully liked the post", data: success});
              }
        });
        
    } else {

      res.json({status: 200, message: "Error! You have already liked this post"});
      return;
    }

    // .populate({path: 'senderId', select: ['email', 'firstName', 'lastName', 'profilePhoto', 'schoolName']})
    // .limit(5);

    // const filter = { _id : postId };
    // const update = {$inc: {
    //   likes: 1, // Increments by 1. Similarly, -2 will decrement by 2.
    // },
    // };
    // const oldDocument = await Post.updateOne(filter, update);
    // res.status(200).json({status: 'OK', data: oldDocument});

    // console.log(oldDocument.n); // Number of documents matched
    // console.log(oldDocument.nModified); // Number of documents modified


    
    // const updatedLikes = Post.updateOne()
    
  } catch (error) {
    console.log('Error occured when adding like');
    Sentry.captureException(error);
    return;
  }
};
const removeLike = async (req, res) => {
  try {
    const filter = {post_title: 'Killer Miller'};
    const update = {$inc: {
      likes: -1, // Increments by 1. Similarly, -2 will decrement by 2.
    },
    };

    const oldDocument = await Post.updateOne(filter, update);
    // console.log(oldDocument.n); // Number of documents matched
    // console.log(oldDocument.nModified); // Number of documents modified
    res.status(200).json({status: 'OK', data: oldDocument});
    return;
  } catch (error) {
    console.log('Error occured when removing like');
    return;
  }
};
const addComment = async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id);
    const {author, text} = req.body;
    const oldDocument = await Post.updateOne(
        // { _id: id },
        {post_title: 'Killer Miller'},
        {$push: {comments: {author, text}},
        });
    res.status(200).json({status: 'OK', data: oldDocument});
    return;
  } catch (error) {
    console.log('Error occured when adding comment');
    console.log(error);
    return;
  }
};
const removeComment = async (req, res) => {
  try {
    return;
  } catch (error) {
    console.log('Error occured when removing comment');
    return;
  }
};

module.exports = {
  getPost,
  getAllPosts,
  createPost,
  deletePost,
  addLike,
  removeLike,
  addComment,
  removeComment,
};
