import {z} from "zod";

export const objectIdSchema=z.string().regex(/^[0-9a-fA-F]{24}$/,{
    message:"Invalid ObjectID Format"
});

export const emailSchema=z.string().email({
    message:"Invalid Email"
});

export const urlSchema=z.string().url({
    message:"Please provide a valid Url."
});

export const passwordSchema=z.string().min(8,"Password must be atleast 8 characters.")