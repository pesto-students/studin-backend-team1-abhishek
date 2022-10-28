const redis = require('redis');

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on('error', (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

redisClient.on('connect', () => {
  console.log('redisClient connected...');
});

redisClient.on('ready', () => {
  console.log('redisClient connected to redis and is ready to use...');
});

redisClient.on('error', (err) => {
  console.log(err.message);
});

redisClient.on('end', () => {
  console.log('redisClient disconnected from redis...');
});

// Terminate redis when pressing CTRL+C in terminal
process.on('SIGINT', () => {
  redisClient.quit();
});

module.exports = redisClient;
