import { z } from 'zod';

// Poster schema similar to the avatar schema for file validation
const posterSchema = z
  .any()
  .refine((file) => file instanceof File, { message: 'File obbligatorio' })
  .refine((file) => file?.size <= 2 * 1024 * 1024, { message: 'Il file deve essere minore di 2MB' })
  .refine(
    (file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file?.type),
    { message: 'Sono permessi solo JPEG, PNG e GIF' }
  );
  
export const eventSchema = z.object({
    nome:
        z.string({ required_error: 'Nome necessario' })
            .min(2, { message: 'Il nome deve essere di almeno 2 caratteri' })
            .max(128, { message: 'Il nome può essere lungo al massimo 128 caratteri' }),
    fine:
        z.string({ required_error: 'Data di fine necessaria' }),

    inizio:
        z.string({ required_error: 'Data di inizio necessaria' }),

    luogo:
        z.string({ required_error: 'Luogo necessario' }),

    poster: posterSchema,
});

export const listaSchema = z.object({
    nome:
        z.string({ required_error: 'Nome necessario' })
            .min(2, { message: 'Il nome deve essere di almeno 2 caratteri' })
            .max(128, { message: 'Il nome può essere lungo al massimo 128 caratteri' }),
    descrizione: 
        z.string()
        .max(128, { message: 'La descrizione può essere lunga al massimo 128 caratteri' })
        .optional(),
    nome_pr:
        z.string({ required_error: 'Nome del proprietario necessario' })
            .min(2, { message: 'Il nome del proprietario deve essere di almeno 2 caratteri' })
            .max(128, { message: 'Il nome del proprietario può essere lungo al massimo 128 caratteri' }),
});