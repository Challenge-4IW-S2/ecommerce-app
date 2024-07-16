import z from 'zod';
export const UserRoleSchema = z.object({
    role: z.string("Role is required")
})
