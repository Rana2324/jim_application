import dotenv from 'dotenv';
import mongoose from "mongoose";


dotenv.config();

const connectDb = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in the environment variables");
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);

    }
};

export default connectDb;
