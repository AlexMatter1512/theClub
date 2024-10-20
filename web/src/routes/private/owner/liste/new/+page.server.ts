import { listaSchema } from '$lib/schemas.js';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
export const load = async ({locals}) => {
    const form = await superValidate(zod(listaSchema));

    return {
        form
    };
};

export const actions = {
    new: async ({request, locals}) => {
        console.log(request.body);
        const form = await superValidate(request, zod(listaSchema));
        console.log(form);

        if (form.valid) {
            try {
                await locals.pb.collection('liste').create(form.data);

                return message(form, {status: 'success', text: 'Lista creata con successo'});
            }
            catch (err) {
                console.error(err);
                return message(form, {status: 'fail', text: "Errore nella creazione della lista"});
            }
        } else {
            return message(form, {status: 'fail', text: 'Errore di validazione'});
        }

    }
};