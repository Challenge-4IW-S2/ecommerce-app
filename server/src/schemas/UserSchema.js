import z from 'zod';
export const UserUpdateSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email("Invalid field 'email'"),
    //password: z.string().min(12,"Password must be at least 6 characters long").regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{12,}/),
    firstname: z.string("Field 'firstname' is required"),
    lastname: z.string( "Field 'lastname' is required"),
    phone: z.string("Invalid field 'phone'"),
    //is_verified: z.boolean(),
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

export const checkUserId = z.object({
    id: z.string().uuid(),
})

export const ClientUpdatePasswordSchema = z.object({
    oldPassword: z.string().min(1, 'Votre mot de passe actuel est requis'),
    newPassword: z.string().min(1, 'Votre nouveau mot de passe ne peut pas être vide'),
    confirmNewPassword: z.string().min(1, 'La confirmation de votre nouveau mot de passe ne peut pas être vide'),
});

export const ClientUpdateProfileSchema = z.object({
    firstname: z.string().min(1, 'Votre prénom ne peut pas être vide'),
    lastname: z.string().min(1, 'Votre nom ne peut pas être vide'),
    phone: z.string().trim().regex(/^0[1-9](?:[\s.-]*\d{2}){4}$/, "Votre numéro n'est pas au bon format").or(z.literal('')).nullable()
});

export const ClientDeleteAccountSchema = z.object({
    password: z.string(),
    deleteAccountPhrase: z.literal("Je souhaite supprimer mon compte")
});