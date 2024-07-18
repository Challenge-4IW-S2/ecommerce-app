import z from 'zod';
export function productPictureSchema() {
    return z.object({
        product_id: z.string().uuid("Invalid UUID. Please provide a valid UUID."),
        url: z.string().url("Invalid URL. Please provide a valid URL."),
    });


}