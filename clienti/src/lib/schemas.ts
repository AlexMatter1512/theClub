import { z } from 'zod';

export const loginUserSchema = z.object({
    email: z.string( {required_error: 'email necessaria'} ).email( {message: 'email non valida'} ),
    password: z.string( {required_error: 'password necessaria'} ).min(8, {message: 'La password deve essere di almeno 8 caratteri'}),
});

export const registerUserSchema = z.object({
    name: z.string( {required_error: 'nome necessario'} )
        .min(2, {message: 'Il nome deve essere di almeno 2 caratteri'})
        .max(64, {message: 'Massimo 64 caratteri'})
        .regex(/^[a-zA-Z\s]*$/, {message: 'Il nome può contenere solo lettere'})
        .trim(),

    surname: z.string( {required_error: 'cognome necessario'} )
        .min(2, {message: 'Il cognome deve essere di almeno 2 caratteri'})
        .max(64, {message: 'Massimo 64 caratteri'})
        .regex(/^[a-zA-Z\s]*$/, {message: 'Il cognome può contenere solo lettere'})
        .trim(),

    birthdate: z.string( {required_error: 'data di nascita necessaria'} )
        .date( 'data di nascita non valida' ),

    email: z.string( {required_error: 'email necessaria'} )
        .email( {message: 'email non valida'} ),

    password: z.string( {required_error: 'password necessaria'} )
        .min(8, {message: 'La password deve essere di almeno 8 caratteri'})
        .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
            {message: 'La password deve contenere almeno una lettera maiuscola, una minuscola e un numero'}
        ),

    passwordConfirm: z.string( {required_error: 'conferma password necessaria'} ),

    phone: z.string( {required_error: 'numero di telefono necessario'} )
        .min(10, {message: 'Numero non valido'})
        .max(15, {message: 'Numero non valido'})
        .regex(/^\+?[0-9]*$/, {message: 'Numero non valido'}),

}).superRefine(({passwordConfirm, password}, ctx) => {
    if (password !== passwordConfirm) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Le password non corrispondono',
            path: ['passwordConfirm']
        });
    }
})

export const verifyPhoneSchema = z.object({
    code: z.string( {required_error: 'codice necessario'} )
        .min(6, {message: 'Codice non valido'})
        .max(6, {message: 'Codice non valido'})
        .regex(/^[0-9]*$/, {message: 'Codice non valido'}),
});