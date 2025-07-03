import {z} from "zod";
import { emailSchema, passwordSchema } from "./common.schema";

export const registerSchema=z.object({
    body:z.object({
        username:z.string().min(3,"Username must be atleast 3 characters.").max(30,"Username can contain maximum 30 characters"),
        email:emailSchema,
        password:passwordSchema,
        confirmPassword:z.string()
    }).refine((data)=>data.password=== data.confirmPassword,{
        message:"Passwords don't match.",
        path:["confirmPassword"]
    })
});


export const loginSchema=z.object({
    body:z.object({
        email:emailSchema,
        password:z.string().min(1, "Password is required."),
    })
});

export const forgotPasswordSchema=z.object({
    body:z.object({
        email:emailSchema
    })
});

export const resetPasswordSchema=z.object({
    body:z.object({
        token:z.string().min(1,"Reset Token Is required."),
        password:passwordSchema,
        confirmPassword:z.string()
    }).refine((data)=>data.password=== data.confirmPassword,{
        message:"Passwords don't match.",
        path:["confirmPassword"]
    })
});

export type RegisterInput=z.infer<typeof registerSchema>['body'];
export type LoginInput=z.infer<typeof loginSchema>['body'];
export type ForgotPasswordInput=z.infer<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput=z.infer<typeof resetPasswordSchema>['body'];