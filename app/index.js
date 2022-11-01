require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const createError = require('http-errors');
const Sentry = require('@sentry/node');
const SentryTracing = require('@sentry/tracing');
const mongoClient = require('./Helpers/init_mongodb');
// const cloudinary=require('./helpers/init_cloudinary')
// const fileupload = require('express-fileupload');
// const redisClient = require('./helpers/init_redis');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');
const cors = require('cors');
// importing routes
const mainRouter = require('./v1/Routes/');

// express app instance
const app = express();

// middlewares
app.use(express.static('public'));
const issue2options = {
      credentials: true,
      // origin: ['https://reliable-parfait-d19e25.netlify.app', "http://localhost:3000"],
      origin: '*',
      // allowedHeaders: [
      //   "Content-Type",
      //   "Authorization",
      //   "Access-Control-Allow-Credentials",
      //   "Access-Control-Allow-Origin",
      // ],
      
}
// "x-csrf-token",
// ],
// origin: ['https://reliable-parfait-d19e25.netlify.app', "http://localhost:3000"],
// origin: ["https://reliable-parfait-d19e25.netlify.app", "http://localhost:3000"],
// exposedHeaders: ['*', 'Authorization' ],
// const issue2options = {
  // origin: 'http://localhost:3000',
  // origin: 'https://reliable-parfait-d19e25.netlify.app',
  // origin: '*',
  // methods: ["POST", "DELETE"],
  // methods: [ "HEAD", "PUT", "PATCH", "POST", "GET", "DELETE", "OPTIONS" ],
  // credentials: true,
  // allowedHeaders: ['Content-type','Authorization','Origin','Access-Control-Allow-Origin','Accept','Options','X-Requested-With'],
  // maxAge: 3600
// };
app.use(upload({
  useTempFiles: true,
  limits: {fileSize: 50 * 2024 * 1024},
}));
app.use(cors(issue2options));
app.use(express.json({limit: '25mb'}));
// app.use(express.urlencoded({limit: '25mb'}));
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());
// app.use(fileupload({
//       useTempFiles: true,
//       tempFileDir: '/tmp/',
//     }),
// );

// view engine
app.set('view engine', 'ejs');

// Sentry
Sentry.init({
  dsn: 'https://51acdaf504154a7d8e5d9f692eebfd4d@o1422930.ingest.sentry.io/6770144',
  tracesSampleRate: 1.0,
});

// main routes - protected with jwt middleware
app.use(mainRouter);

// Error handling for non-existent routes using all catch
app.use(async (req, res, next) => {
  next(new createError.NotFound('This route does not exist'));
});
app.use((err, req, res, next) => {
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

module.exports = app;
