import { z } from "zod";

export const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            // Valider et transformer les données de la requête
            req.body = schema.parse(req.body);
            console.log(req.body)
            next(); // Passer au middleware suivant
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
