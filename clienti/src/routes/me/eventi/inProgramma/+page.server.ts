import type { Evento, Iscrizione, Iscrizione2_duplicate, Iscrizione_expanded } from '$lib/models.js';
import { checkAuth } from '$lib/utils.js';

//TODO: error handling

export const actions = {
    unsubscribe: async ({ locals, params, request }) => {
        const body = Object.fromEntries(await request.formData()) as { [key: string]: string };
        const iscrizione: Iscrizione_expanded = await locals.pb.collection("iscrizioni_expanded").getOne<Iscrizione_expanded>(body.id_iscrizione);
        if ((iscrizione.id_cliente !== locals.cliente.id) || (iscrizione.entrato)) {
            return {
                status: 403,
                body: {
                    message: "Non autorizzato"
                }
            }
        }
        await locals.pb.collection("iscrizioni").delete(body.id_iscrizione);
        return {
            status: 200,
            body: {
                message: "Disiscrizione completata"
            }
        }
    }
};