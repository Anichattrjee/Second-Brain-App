import express from "express";
import { forgotPassword, login, logout, resetPassword, signup, verifyEmail } from "../controllers/auth.controller";
import { registerSchema } from "../schemas";
import { validate } from "../middlewares/validationMiddleware";

const authRouter=express.Router();

authRouter.post("/signup", validate(registerSchema), signup );
authRouter.post("/login",login);

authRouter.post("/forgot-password",forgotPassword);
authRouter.post("/reset-password",resetPassword);
authRouter.get("/verify-email/:token",verifyEmail);

authRouter.post("/logout",logout);


export default authRouter;