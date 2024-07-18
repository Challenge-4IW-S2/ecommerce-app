import { z } from "zod";

export const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: err.errors,
                });
            }
            next(err);
        }
    };
};
