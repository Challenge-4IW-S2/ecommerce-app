import z from 'zod';

export const OrderSchema = z.object({
    user_id: z.string().uuid(),
    status: z.string(),
    total_price: z.number(),
    invoice: z.string(),
   /* invoice: z.array(z.object({
        address_id: z.string().uuid(),
        product_id: z.string().uuid(),
        quantity: z.number(),
        price: z.number(),
    })),*/
});
