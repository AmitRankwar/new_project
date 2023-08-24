const mongoose = require("mongoose");

mongoose.set("strictQuery", false); // Avoid strict mode for query filter

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Database connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
    }
};

module.exports = connectDB;
