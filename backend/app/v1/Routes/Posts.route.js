const controllers = require('../../Controllers/Posts.controller')
const router = require('express').Router()

//Posts
router.get('/', controllers.getAllPosts)
router.get('/:postId', controllers.getPost)
router.post('/', controllers.createPost)
router.delete('/:postId',controllers.deletePost)

// Likes and comments
router.post('/like/:postId', controllers.addLike)
router.post('/unLike/:postId', controllers.removeLike)
router.post('/comment/:postId', controllers.addComment)
router.post('/unComment/:postId/:commentId', controllers.removeComment)


module.exports = router;

//Alternative:- Using middleware for a specific route
// const cacheNoStore = require('./middleware/cacheNoStore.js')
// module.exports = () => {
//    router.get('/:id', cacheNoStore, controllers.getProduct)
// }