import z from 'zod';

export const AddressSchema = z.object({
    street: z.string("Street is required"),
    city: z.string("City is required"),
    postal_code: z.string("Zip code is required"),
    country: z.string("Country is required"),
    user_id: z.string().uuid(),
})