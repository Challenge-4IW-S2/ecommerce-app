import z from 'zod';

export const CommentSchema = z.object({
    user_id: z.string().uuid(),
    product_id: z.string().uuid(),
    comment: z.string(),
    rating: z.number().int().min(1).max(5),
    is_active: z.boolean().optional(),

});