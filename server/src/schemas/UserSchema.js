import z from 'zod';
export const CreationUserSchema = z.object({
    email: z.string().email("Invalid field 'email'"),
    password: z.string().min(12,"Password must be at least 6 characters long").regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{12,}/),
    firstname: z.string("Field 'firstname' is required"),
    lastname: z.string( "Field 'lastname' is required"),
    phone: z.string("Invalid field 'phone'"),
    role: z.array(z.string("Invalid field 'role"))
})
export const UserUpdateSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email("Invalid field 'email'"),
    password: z.string().min(12,"Password must be at least 6 characters long").regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{12,}/),
    firstname: z.string("Field 'firstname' is required"),
    lastname: z.string( "Field 'lastname' is required"),
    phone: z.string("Invalid field 'phone'"),
    //is_verified: z.boolean(),
    role: z.array(z.string("Invalid field 'role")),
    deleted: z.boolean(),
})
export const GetUserSchema = z.object({
    email: z.string().email("Invalid field 'email'"),
    password: z.string().min(12,"Password must be at least 6 characters long").regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{12,}/),
    firstname: z.string("Field 'firstname' is required"),
    lastname: z.string( "Field 'lastname' is required"),
    phone: z.string("Invalid field 'phone'"),
    role: z.array(z.string("Invalid field 'role")),
    deleted: z.boolean(),
})
export const GetUsersSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email("Invalid field 'email'"),
    password: z.string().min(12,"Password must be at least 6 characters long").regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{12,}/),
    firstname: z.string("Field 'firstname' is required"),
    lastname: z.string( "Field 'lastname' is required"),
    phone: z.string("Invalid field 'phone'"),
    role: z.array(z.string("Invalid field 'role")),
    deleted: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
})
export const UserDeleteSchema = z.object({
    id: z.string().uuid(),
})

