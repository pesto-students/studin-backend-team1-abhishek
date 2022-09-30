const mongoose = require('mongoose')

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.wough.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected!!');
        // console.log(dbInstance['studin-db']['posts']);
        // console.log(mongoose.connection);
        // return mongoose.connection;
        return
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};

connectDB();
// module.exports = db;