import express from "express";
import { config } from "./config/config";
import { connectDB } from "./config/db";
import authRouter from "./routes/auth.route";

const app=express();
const port= config.port;

app.use(express.json());


//routes
app.use("/api/auth",authRouter);

app.listen(port,async ()=>{

    console.log(`Server running on port : ${port}...`);
    await connectDB();
});