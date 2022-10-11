const {requireAuth} = require('../../Middlewares/jwt_auth');
const express = require('express');
const router = new express.Router();

// All routes index file
const v1AuthRouter = require('./Auth.route');
const v1ProfileRouter = require('./Profile.route');
const v1PostsRouter = require('./Posts.route');
const v1ConnectionsRouter = require('./Connections.route');
const v1SearchRouter = require('./Search.route');
const v1RecommendationsRouter = require('./Recommendation.route');
const v1LiveStreamRouter = require('./Livestream.route');

router.get('/', (req, res) => {
  res.send('<h2>It\'s Working!</h2>');
});
router.use('/api/v1/auth', v1AuthRouter);
router.use('/api/v1/profile', requireAuth, v1ProfileRouter);
router.use('/api/v1/posts', requireAuth, v1PostsRouter);
router.use('/api/v1/connections', requireAuth, v1ConnectionsRouter);
router.use('/api/v1/search', requireAuth, v1SearchRouter);
router.use('/api/v1/recommendations', requireAuth, v1RecommendationsRouter);
router.use('/api/v1/liveStream', requireAuth, v1LiveStreamRouter);

module.exports = router;
