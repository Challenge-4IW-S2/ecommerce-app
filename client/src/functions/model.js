import ky from "ky";
import {z} from "zod";

export function fetchModelStructure(modelName) {
    try {
        return ky.get(`${import.meta.env.VITE_API_BASE_URL}model/${modelName}`).json();
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
                name: z.string().nonempty("Product name is required"),
                price: z.number().positive("Price must be positive"),
                description: z.string().optional(),
            });
        case 'address':
           return  z.object({
                street: z.string("Street is required"),
                city: z.string("City is required"),
                zip_code: z.string("Zip code is required"),
                country: z.string("Country is required"),
                user_id: z.string().uuid(),
            })

        default:
            return z.object({});
    }

}