import {z} from "zod";
import Swal from "sweetalert2";
import { useAPI } from "../composables/useAPI.js";

export async function fetchModelStructure(modelName) {
    try {
        const { results } = await useAPI('get', `model/${modelName}`, {}, {}, '', true);
        return results.value;
    } catch (error) {
        console.error("Error fetching model structure:", error);
        throw error;
    }
}
export function filterUnwantedFields  (data, unwantedFields) {
    return Object.keys(data)
        .filter(key => !unwantedFields.includes(key))
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
}

export function getEntitySchema (entityType){
    switch (entityType) {
        case 'user':
            return z.object({
                email: z.string().email("Invalid email format"),
                password: z.string().min(6, "Password must be at least 6 characters long"),
                firstname: z.string(),
                lastname: z.string(),
                phone: z.string().optional(),
                role: z.string(),
            });
        case 'product':
            return z.object({
                name: z.string("Product name is required").min(3, "Product name must be at least 3 characters long"),
                description: z.string().optional(),
                category_id: z.string(),
                slug: z.string().min(3, "Slug must be at least 3 characters long"),
                price_ht: z.string().regex(/^\d+(\.\d{2})?$/, { message: "Price must be a number with up to two decimal places" }),
                is_active: z.boolean().optional(),
                quantity: z.number().int().min(0, "Quantity must be a positive integer"),

            });
        case 'address':
            return z.object({
                street: z.string({ required_error: "Street is required"}).min(5, { message: "Street must be at least 5 characters long" }),
                city: z.string("City is required")
                    .regex(/^[a-zA-Z\s]+$/, {message: "City must contain only letters" }),
                postal_code: z.string()
                    .regex(/^\d{5}$/, { message: "Postal code must contain exactly 5 digits" }),
                country: z.string("Country is required")
                    .regex(/^[a-zA-Z\s]+$/, { message: "Country must contain only letters" }),
                user_id: z.string().uuid(),
            }).required();

        case 'userRole':
            return z.object({
                name: z.string("Role is required")
            });
        case 'category':
            return z.object({
                name: z.string("Category is required")
            });

        case 'productPicture':
            return z.object({
                product_id: z.string().uuid("Invalid product ID"),
                url: z.string().url("Invalid URL format")
            })

        default:
            return z.object({});
    }

}
export const  handleHttpResponse = async (response) => {
    switch (response.status) {
        case 200:
        case 201:
           return await Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Operation successful',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
           });
        case 404:
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Resource not found',
            });
        default:
            return { success: false, message: 'An error occurred' };
    }
};
