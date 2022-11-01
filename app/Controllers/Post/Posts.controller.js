// const postsService = require('../services/Posts.service')
const cloudinary = require('../../Helpers/init_cloudinary');
const Sentry = require('@sentry/node');
const Post = require('../../Models/Posts.model');
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
    // console.log('currentUser',currentUserId);
    const allPosts = await Post.find({
      userId: currentUserId,
    })
    .populate({path: 'userId', select: ['profilePhoto']});
    // console.log(allPosts)
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
    const { body } = req;
    // if (!body.post_title || !body.post || !body.likes || !body.comments){
    // return;
    // }
    console.log("req.files-->");
    let imageResult = '';
    if (req.files){
      const file = req.files.image;
      console.log(file);
      if (file.size < 5000000){
        imageResult = await cloudinary.uploader.upload(file.tempFilePath, {
          public_id: `${Date.now()}`,
          resource_type: 'auto',
          folder: 'studin/posts',
        });
      } else {
        console.log("File size greater than 5mb");
        res.json({status: 400, message: "Failed during file upload. File might be too large!"});
        return;
      }
    }

    const newPost = {
      userId: req.user._id,
      content: body.content,
      imageUrl: imageResult ? imageResult.secure_url : '' ,
    };

    if (!req.files || req.files && req.files.image.size < 5000000){
      console.log("entering here - why?");
      const createdPost = await Post.create(newPost);
      console.log(createdPost);
      res.json({status: 200, data: createdPost});
      return;
    }
    // res.json({status: 400, message: "Failed during file upload. File might be too large!"});
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
    // console.log("postData -->");
    // console.log(postData);

    if (!postData.likes.includes(currentUser)){

      const oldDocument = await Post.findOneAndUpdate(
        { _id : postId }, 
        { $push: { likes: currentUser  } },
        function (error, success) {
              if (error) {
                  console.log(error);
              } else {
                  res.json({status: 200, message: "Successfully liked the post", data: success});
              }
        });
        
    } else {

      res.json({status: 200, message: "Error! You have already liked this post"});
      return;
    }
  } catch (error) {
    console.log('Error occured when adding like');
    Sentry.captureException(error);
    return;
  }
};
const disLike = async (req, res) => {
  try {
    const {postId} = req.body;
    currentUser = req.user._id;

    const postData = await Post.findOne({_id : postId}).populate({path: 'likes'});
    // console.log("postData -->");
    // console.log(postData);

    if (!postData.likes.includes(currentUser)){

      const oldDocument = await Post.findOneAndUpdate(
        { _id : postId }, 
        { $pull: { likes: currentUser  } },
        function (error, success) {
              if (error) {
                  console.log(error);
              } else {
                  res.json({status: 200, message: "Successfully dis-liked the post", data: success});
              }
        });
        
    } else {

      res.json({status: 200, message: "Error! You have dis-liked this post"});
      return;
    }
  } catch (error) {
    console.log('Error occured when removing like');
    Sentry.captureException(error);
    return;
  }
};

const addComment = async (req, res) => {
  try {
    const {id} = req.params;
    // console.log(id);
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
  disLike,
  addComment,
  removeComment,
};
