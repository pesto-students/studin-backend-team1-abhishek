require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const createError = require('http-errors');
// const Sentry = require('@sentry/node');
// const Tracing = require('@sentry/tracing');
const mongoClient = require('./helpers/init_mongodb');
// const cloudinary=require('./helpers/init_cloudinary')
const fileupload=require('express-fileupload')

// const redisClient = require('./helpers/init_redis');
const bodyParser = require('body-parser');
var cors = require('cors')

//importing auth middleware to protect API routes
// const { requireAuth } = require('./middlewares/jwt_auth');

//importing routes
const mainRouter = require('./v1/Routes/');
// const v1AuthRouter = require('./v1/Routes/Auth.route');
// const v1ProfileRouter = require('./v1/Routes/Profile.route');
// const v1PostsRouter = require('./v1/Routes/Posts.route');
// const v1ConnectionsRouter = require('./v1/Routes/Connections.route');
// const v1SearchRouter = require('./v1/Routes/Search.route');
// const v1RecommendationsRouter = require('./v1/Routes/Recommendation.route');
// const v1LiveStreamRouter = require('./v1/Routes/Livestream.route');

//express app instance
const app = express();

//middlewares
app.use(express.static('public'));
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json())
app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

//view engine
app.set('view engine', 'ejs');

//main routes - protected with jwt middleware
app.use(mainRouter);
// app.get("/", (req, res) => { res.send("<h2>It's Working!</h2>"); });
// app.use('/api/v1/auth', v1AuthRouter)
// app.use('/api/v1/profile', requireAuth, v1ProfileRouter)
// app.use('/api/v1/posts', requireAuth, v1PostsRouter)
// app.use('/api/v1/connections', requireAuth, v1ConnectionsRouter)
// app.use('/api/v1/search', requireAuth, v1SearchRouter)
// app.use('/api/v1/recommendations', requireAuth, v1RecommendationsRouter)
// app.use('/api/v1/liveStream', requireAuth, v1LiveStreamRouter)
// app.get("/debug-sentry", function mainHandler(req, res) { throw new Error("My first Sentry error!"); });

//Error handling for non-existent routes using all catch
app.use(async(req,res,next) => {
    next(createError.NotFound("This route does not exist"));
})
app.use((err,req,res,next) => {
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
});

module.exports = app;