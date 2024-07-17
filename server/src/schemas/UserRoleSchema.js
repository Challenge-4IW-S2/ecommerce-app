import z from 'zod';
export const UserRoleSchema = z.object({
    name: z.string("Role is required")
})
