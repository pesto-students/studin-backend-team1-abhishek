const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected!!');
    // console.log(dbInstance['studin-db']['posts']);
    // console.log(mongoose.connection);
    // return mongoose.connection;
    return;
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
};

connectDB();
// module.exports = db;
