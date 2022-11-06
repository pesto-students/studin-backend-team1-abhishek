
const cloudinary = require('../../Helpers/init_cloudinary');
const Sentry = require('@sentry/node');
const Post = require('../../Models/Posts.model');
const User = require('../../Models/User.model');

const getPost = async (req, res) => {
  try {
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
    const currentUserId = req.user._id;

    const allPosts = await Post.find({
      userId: currentUserId,
    }).populate({path: 'userId', select: ['profilePhoto']});

    if (allPosts.length !== 0){

      res.send({status: 200, data: allPosts});
    } else {
      //Random posts for user with no posts created
      const allRandomPosts = await Post.find().limit(5).populate({
        path: 'userId', select: ['profilePhoto']
      });

      res.send({status: 200, data: allRandomPosts});
    }
    return;

  } catch (error) {
    Sentry.captureException(error);
    console.log(error);
    console.log('Error occured when retrieving all posts');
    return;
  }
};

const getMyPosts = async (req, res) => {
  try {
    // const {body} = req;
    const currentUserId = req.user._id;
    console.log("C-userId in inside MyPosts", currentUserId);

    const myPosts = await Post.find({
      userId: currentUserId,
    }).populate({path: 'userId', select: ['profilePhoto']});

    if (myPosts.length !== 0){

      res.send({status: 200, data: myPosts});
    } else {

      res.send({status: 400, message: "You have not created a post yet!"});
    }
    return;

  } catch (error) {
    Sentry.captureException(error);
    console.log(error);
    console.log('Error occured when retrieving my posts');
    return;
  }
};
const getThirdPartyPosts = async (req, res) => {
  try {
    const {connectionId} = req.body;
    const currentUserId = req.user._id;
    console.log("C-userId in inside ThirdPartyPosts", currentUserId);

    const thirdPosts = await Post.find({
      userId: connectionId,
    }).populate({path: 'userId', select: ['profilePhoto']});

    if (thirdPosts.length !== 0){

      res.send({status: 200, data: thirdPosts});
    } else {

      res.send({status: 400, message: "This connection has not posted yet!"});
    }
    return;

  } catch (error) {
    Sentry.captureException(error);
    console.log(error);
    console.log('Error occured when retrieving my posts');
    return;
  }
};
const createPost = async (req, res) => {
  try {
    const { body } = req;

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

      const updatedUserData = await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $push: { posts: createdPost._id }
      });

      console.log('createdPost --> ',createdPost);
      console.log('updatedUserData --> ',updatedUserData);

      res.json({status: 200, data: createdPost});
      return;
    }

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
    const deletedPost = await Post.deleteOne({post_title: 'Killer Miller'});
    res.status(200).json({status: 'OK', data: deletedPost});

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
    const {author, text} = req.body;
    const oldDocument = await Post.updateOne(
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
  getMyPosts,
  getThirdPartyPosts,
  createPost,
  deletePost,
  addLike,
  disLike,
  addComment,
  removeComment,
};
