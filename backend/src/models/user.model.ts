import mongoose, { Schema } from "mongoose";
import { UserType } from "../types/userType";

const userSchema=new Schema<UserType>({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const User=mongoose.model<UserType>("User",userSchema);
export default User;
