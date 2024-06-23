import {ref} from 'vue';
import {z } from 'zod';

export const useUsers = () => {
    const users = ref([]);

    const userSchema = z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
    });

    const fetchUsers = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        const parsedData = userSchema.array().parse(data);
        users.value = parsedData;
    };

    return {
        users,
        fetchUsers,
    };
}