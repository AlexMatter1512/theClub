import { z } from 'zod';

// Helper function to calculate age
const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};
// Define a Zod schema for file validation
const avatarSchema = z
  .any()
  .refine((file) => file instanceof File, { message: 'Devi caricare un file valido' })
  .refine((file) => file?.size <= 5 * 1024 * 1024, { message: 'Il file deve essere minore di 5MB' })
  .refine(
    (file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file?.type),
    { message: 'Tipo di file non valido. Sono permessi solo JPEG, PNG e GIF' }
  );

export const loginUserSchema = z.object({
    email: z.string({ required_error: 'email necessaria' }).email({ message: 'email non valida' }),
    password: z
        .string({ required_error: 'password necessaria' })
        .min(8, { message: 'La password deve essere di almeno 8 caratteri' }),
});

export const registerUserSchema = z
    .object({
        name: z
            .string({ required_error: 'nome necessario' })
            .min(2, { message: 'Il nome deve essere di almeno 2 caratteri' })
            .max(64, { message: 'Massimo 64 caratteri' })
            .regex(/^[a-zA-Z\s]*$/, { message: 'Il nome può contenere solo lettere' })
            .trim(),

        surname: z
            .string({ required_error: 'cognome necessario' })
            .min(2, { message: 'Il cognome deve essere di almeno 2 caratteri' })
            .max(64, { message: 'Massimo 64 caratteri' })
            .regex(/^[a-zA-Z\s]*$/, { message: 'Il cognome può contenere solo lettere' })
            .trim(),

        birthdate: z
            .string({ required_error: 'data di nascita necessaria' })
            .refine((dateStr) => {
                const birthDate = new Date(dateStr);
                const today = new Date();

                // Check if the date is valid and not in the future
                if (
                    isNaN(birthDate.getTime()) ||
                    birthDate > today ||
                    calculateAge(birthDate) < 18
                ) {
                    return false;
                }

                return true;
            }, { message: 'Devi avere almeno 18 anni' }),

        email: z
            .string({ required_error: 'email necessaria' })
            .email({ message: 'email non valida' }),

        password: z
            .string({ required_error: 'password necessaria' })
            .min(8, { message: 'La password deve essere di almeno 8 caratteri' })
            .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, {
                message:
                    'La password deve contenere almeno una lettera maiuscola, una minuscola e un numero',
            }),

        passwordConfirm: z.string({ required_error: 'conferma password necessaria' }),

        phone: z
            .string({ required_error: 'numero di telefono necessario' })
            .min(10, { message: 'Numero non valido' })
            .max(15, { message: 'Numero non valido' })
            .regex(/^\+?[0-9]*$/, { message: 'Numero non valido' }),
        
        avatar: avatarSchema.optional(),
    })
    .superRefine(({ passwordConfirm, password }, ctx) => {
        if (password !== passwordConfirm) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Le password non corrispondono',
                path: ['passwordConfirm'],
            });
        }
    });

export const verifyPhoneSchema = z.object({
    code: z
        .string({ required_error: 'codice necessario' })
        .min(6, { message: 'Codice non valido' })
        .max(6, { message: 'Codice non valido' })
        .regex(/^[0-9]*$/, { message: 'Codice non valido' }),
});

export const updateProfileSchema = z.object({
    name: z
        .string({ required_error: 'nome necessario' })
        .min(2, { message: 'Il nome deve essere di almeno 2 caratteri' })
        .max(64, { message: 'Massimo 64 caratteri' })
        .regex(/^[a-zA-Z\s]*$/, { message: 'Il nome può contenere solo lettere' })
        .trim(),

    surname: z
        .string({ required_error: 'cognome necessario' })
        .min(2, { message: 'Il cognome deve essere di almeno 2 caratteri' })
        .max(64, { message: 'Massimo 64 caratteri' })
        .regex(/^[a-zA-Z\s]*$/, { message: 'Il cognome può contenere solo lettere' })
        .trim(),

    birthdate: z
        .string({ required_error: 'data di nascita necessaria' })
        .refine((dateStr) => {
            const birthDate = new Date(dateStr);
            const today = new Date();

            // Check if the date is valid and not in the future
            if (
                isNaN(birthDate.getTime()) ||
                birthDate > today ||
                calculateAge(birthDate) < 18
            ) {
                return false;
            }

            return true;
        }, { message: 'Devi avere almeno 18 anni' }),

    avatar: avatarSchema.optional(),
});