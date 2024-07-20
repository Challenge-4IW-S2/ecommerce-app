import z from 'zod';
export const ProductSchema = z.object({
    name: z.string("Product name is required").min(3, "Product name must be at least 3 characters long"),
    description: z.string().optional(),
    category_id: z.string(),
    slug: z.string().min(3, "Slug must be at least 3 characters long"),
    price_ht: z.string().regex(/^\d+(\.\d{2})?$/, { message: "Price must be a number with up to two decimal places" }),
    is_active: z.boolean().optional(),
    quantity: z.string().regex(/^\d+$/, { message: "Quantity must be a positive integer" }),

})