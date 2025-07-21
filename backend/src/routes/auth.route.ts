import express from "express";
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/signup", signup); //error in this lime
authRouter.get("/verify-email/:token", verifyEmail);//and in this line
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/logout", logout);

export default authRouter;
