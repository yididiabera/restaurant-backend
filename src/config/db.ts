import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log(`MongoDB is connected successfully🚀}`)
    } catch (err) {
        console.error("MongoDB connection error", err)
        process.exit(1)
    }
}

export default connectDB;