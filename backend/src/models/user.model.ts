import mongoose, { Schema } from "mongoose";
import { UserType } from "../types/userType";
import bcrypt from "bcryptjs";

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

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next();
    }
    try {
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(this.password,salt);
        this.password=hashedPassword;
        next();
    } catch (error) {
        next(error as Error);
    }
});

const User=mongoose.model<UserType>("User",userSchema);
export default User;
