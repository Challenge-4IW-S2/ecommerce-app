import z from 'zod';
export const ProductSchema = z.object({
    name: z.string("Product name is required"),
    description: z.string().optional(),
    price_ht: z.number().positive("Price must be positive"),
    price_ttc: z.number().positive("Price must be positive"),
    slug: z.string("Slug is required"),
    category_id: z.string().uuid(),
})