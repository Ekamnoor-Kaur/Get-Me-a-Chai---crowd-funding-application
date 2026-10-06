import mongoose from "mongoose";
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;   // already connected
        }
        const conn = await mongoose.connect("mongodb://localhost:27017/chai");
        // console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message)
    }
}
export default connectDB;