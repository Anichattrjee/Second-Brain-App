import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    //if validation fails show all the errors
    if (!result.success) {
      return res.status(400).json({
        message: "Validation Failed.",
        errors: result.error.errors.map((err) => ({
          path: err.path.join("."),
          mess: err.message,
        })),
      });
    }

    //if no error means validation passed
    //then add the validated data to the req.body
    req.body=result.data;
    next();
  };
};
