const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected!!');
    return;
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
};

connectDB();
// module.exports = db;
