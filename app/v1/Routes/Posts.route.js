const controllers = require('../../Controllers/Post/Posts.controller');
const express = require('express');
const router = new express.Router();

router.post('/', controllers.getAllPosts);
router.get('/getMyPosts', controllers.getMyPosts);
router.post('/getThirdPartyPosts', controllers.getThirdPartyPosts);
router.get('/:postId', controllers.getPost);
router.post('/createPost', controllers.createPost);
router.delete('/:postId', controllers.deletePost);
router.post('/addLike', controllers.addLike);
router.post('/disLike', controllers.disLike);
router.post('/comment/:postId', controllers.addComment);
router.post('/unComment/:postId/:commentId', controllers.removeComment);

// router.post('/like/:postId', controllers.addLike);
// router.post('/unLike/:postId', controllers.removeLike);

module.exports = router;

