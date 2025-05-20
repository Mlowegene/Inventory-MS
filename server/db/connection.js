import mongoose from "mongoose";

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("database connection successfully");
        
    } catch (error) {
        console.error("connection failed", error.message);
        process.exit(1);
    }
}

export default connectionDB;