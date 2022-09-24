const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const mongoClient = require('./helpers/init_mongodb');
const redisClient = require('./helpers/init_redis');
// //const bodyParser = require('body-parser');

//importing routes
const v1AuthRouter = require('./v1/Routes/Auth.route');
const v1ProfileRouter = require('./v1/Routes/Profile.route');
const v1PostsRouter = require('./v1/Routes/Posts.route');
const v1ConnectionsRouter = require('./v1/Routes/Connections.route');
const v1SearchRouter = require('./v1/Routes/Search.route');
const v1RecommendationsRouter = require('./v1/Routes/Recommendation.route');
const v1LiveStreamRouter = require('./v1/Routes/Livestream.route');

//importing auth middleware to protect API routes
const { requireAuth } = require('./helpers/jwt_auth');

//express app instance
const app = express();

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// //app.use(bodyParser.json())

//view engine
app.set('view engine', 'ejs');

//main routes - protected with jwt middleware
app.get("/", (req, res) => { res.send("<h2>It's Working!</h2>"); }); //home test
app.use('/api/v1/auth', requireAuth, v1AuthRouter)
app.use('/api/v1/profile', requireAuth, v1ProfileRouter)
app.use('/api/v1/posts', requireAuth, v1PostsRouter)
app.use('/api/v1/connections', requireAuth, v1ConnectionsRouter)
app.use('/api/v1/search', requireAuth, v1SearchRouter)
app.use('/api/v1/recommendations', requireAuth, v1RecommendationsRouter)
app.use('/api/v1/liveStream', requireAuth, v1LiveStreamRouter)
// app.get("/debug-sentry", function mainHandler(req, res) { throw new Error("My first Sentry error!"); }); //test sentry

module.exports = app;