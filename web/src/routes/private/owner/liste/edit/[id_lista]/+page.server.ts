import type { Lista, Evento } from '$lib/models';
import { listaSchema } from '$lib/schemas.js';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { env } from '$env/dynamic/private';

export const load = async ({ locals, params }) => {
    let lista = await locals.pb.collection("liste").getOne<Lista>(params.id_lista);
    const form = await superValidate(lista, zod(listaSchema));
    return {
        lista,
        form
    };
};

export const actions = {
    edit: async ({ locals, params, request }) => {
        const form = await superValidate(request, zod(listaSchema));
        if (env.SERVER_DEBUG === "true") console.log("form.data: ", form.data);
        if (!form.valid) {
            return message(form, {status:"fail", text:"Errore durante la validazione della lista"});
        }
        try{
            await locals.pb.collection("liste").update(params.id_lista, form.data);
        } catch (e) {
            console.error(e);
            return message(form, {status:"fail", text:"Errore durante la modifica della lista"});
        }
        return message(form, {status:"success", text:"Lista modificata con successo"});
    }
};