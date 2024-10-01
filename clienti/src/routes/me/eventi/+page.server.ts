import type { Evento, Iscrizione, Iscrizione2_duplicate, Iscrizione_expanded } from '$lib/models.js';
import { checkAuth } from '$lib/utils.js';

//TODO: error handling

export const load = async ({ locals }) => {
    checkAuth(locals);
    const iscrizioni: Iscrizione_expanded[] = await locals.pb.collection("iscrizioni_expanded").getFullList<Iscrizione_expanded>(
        {
            filter: `id_cliente = "${locals.cliente.id}"`,
            expand: 'id_evento,id_lista'
        }
    );

    iscrizioni.forEach(async (iscrizione) => {
        if (iscrizione.expand && iscrizione.expand.id_evento) {
            iscrizione.expand.id_evento.poster = await locals.pb.files.getUrl(iscrizione.expand.id_evento, iscrizione.expand.id_evento.poster);
        }
    });

    return {
        iscrizioni
    }
};

export const actions = {
    unsubscribe: async ({ locals, params, request }) => {
        const body = Object.fromEntries(await request.formData()) as { [key: string]: string };
        await locals.pb.collection("iscrizioni").delete(body.id_iscrizione);
        return {
            status: 200,
            body: {
                message: "Disiscrizione completata"
            }
        }
    }
};