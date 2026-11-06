import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "e-commerce"
        });

        console.log("MongoDB Connected Successfully");
        console.log("Database Name:", mongoose.connection.name);

    } catch (error) {
        console.log("MongoDB Connection Error:", error.message);
        throw error;
    }
};

export default connectDB;