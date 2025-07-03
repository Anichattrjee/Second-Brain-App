import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  
};

export const login = async () => {};

export const forgotPassword = async () => {};

export const resetPassword = async () => {};

export const verifyEmail = async () => {};

export const logout = async () => {};
