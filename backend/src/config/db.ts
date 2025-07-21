import mongoose from "mongoose";
import { config } from "./config";

export const connectDB=async ()=>{
    try {
        const conn=await mongoose.connect( config.mongo_uri as string);
        console.log("MongoDB connected successfully to host : ", conn.connection.host);

        mongoose.connection.on("error", (error)=>{
            console.log("Error in connecting mongoDb: ",error);
        })
    } catch (error) {
        console.log("Failed to connect to databsae: ",error);
        process.exit(1);
    }
};

