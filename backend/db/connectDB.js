import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MONGO_DB connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error while connecting Mongo DB ${error.message}`);
        process.exit(1);
    }
}