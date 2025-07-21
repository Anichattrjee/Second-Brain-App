import { Request, Response } from "express";
import User from "../models/user.model";
import { registerSchema } from "../schemas";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";
import { sendEmail } from "../utils/sendEmail";


export const signup = async (req: Request, res: Response):Promise<any> => {
  try {
    const result = registerSchema.safeParse({body:req.body});
    if (!result.success) {
      return res.status(422).json({ message: result.error });
    }

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }
    //generate the random avatar
    const rn = Math.floor(Math.random() * 100) + 1;

    const newUser = await User.create({
      username,
      email,
      password,
      avatar: `https://avatar.iran.liara.run/public/${rn}`,
    });

    
    
    const token=jwt.sign({userId:newUser._id},config.jwt_secret as string,{expiresIn:"7d"});
    res.cookie("token", token,{
      httpOnly:true,
      sameSite:"strict",
      maxAge:7*24*60*60*1000
    });
    //TODO : Send a verify email to the email;
    const verifyUrl=`http://localhost:5001/api/v1/auth/verify-email/${token}`;

    await sendEmail(email,verifyUrl);
    res.status(200).json({message:"User registered successfully.", user:newUser});

  } catch (error) {
    console.log("Error in sign up controller.", error);
    return res.status(500).json({message:"Internal Server Error."});
  }
};

export const verifyEmail = async (req:Request,res:Response):Promise<any> => {
  try {
    const {token}=req.params;
    if(!token)
    {
      return res.status(404).json({message:"Token not found."});
    }

    const {userId }=jwt.verify(token, config.jwt_secret as string) as JwtPayload ;

    const user=await User.findById(userId);
    if(!user)
    {
      return res.status(404).json({message:"User doesnt exist"});
    }

    if(user.isEmailVerified)
    {
      return res.status(400).json({message:"Email already verified."});
    }

    user.isEmailVerified=true;
    await user.save();

    res.status(200).json({message:"Email verified successfully"});
    //  return res.redirect(`${BASE_URL}/verified-success`);
    //<Route path="/verified-success" element={<div>Email Verified Successfully 🎉</div>} />

  } catch (error) {
    console.log("Error in verifyEmail controller.", error);
    return res.status(500).json({message:"Internal Server Error."});
  }
};

export const login = async () => {};

export const forgotPassword = async () => {};

export const resetPassword = async () => {};



export const logout = async () => {};
