import { Request, Response } from "express";
import User from "../models/user.model";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body.result.data;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser=await User.find({email});
  if(existingUser)
  {
    return res.status(400).json("User already exists");
  }
  //generate the random avatar
  const rn=Math.floor(Math.random()*100)+1;
  
  const newUser=await User.create({
    username,
    email,
    password,
    avatar:`https://avatar.iran.liara.run/public/${rn}`
  });


  
};


export const login = async () => {};

export const forgotPassword = async () => {};

export const resetPassword = async () => {};

export const verifyEmail = async () => {};

export const logout = async () => {};
