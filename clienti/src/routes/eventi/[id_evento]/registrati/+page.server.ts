import type { Evento, Iscrizione, Lista, Iscrizione2_duplicate } from '$lib/models';
import { checkAuth } from '$lib/utils.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
    checkAuth(locals);

    // get the event data
    let evento: Evento = await locals.pb.collection("eventi").getOne<Evento>(params.id_evento);
    evento.poster = await locals.pb.getFileUrl(evento, evento.poster)

    // get the iscizioni for the current cliente and the current evento
    let iscrizioni = await locals.pb.collection("iscrizioni_expanded").getFullList<Iscrizione>({
        filter: `id_evento = "${params.id_evento}" && id_cliente = "${locals.cliente.id}"`
    });
    if (iscrizioni.length > 0) {
        return {
            evento,
            iscritto: true,
        }
    }
    
    // im not expanding evento (and im doing the query above) because it would send the same data for each lista
    let listeEvento = await locals.pb.collection("liste_eventi").getFullList(
        {
            filter: 'evento = "' + params.id_evento + '"',
            expand: 'lista'
        }
    );

    return {
        evento,
        listeEvento,
        iscritto: false
    };
};


/** @type {import('./$types').Actions} */
export const actions = {
    registrati: async ({ locals, params, request }) => {
        if (!locals.cliente) {
            throw redirect(303, '/auth/login');
        }

        // get the id of the lista from the button registrati clicked
        const body = Object.fromEntries(await request.formData()) as { [key: string]: string };
        let id_listaEvento = body.id_listaEvento;
        let iscrizione: Iscrizione2_duplicate = {
            lista_evento: id_listaEvento,
            cliente: locals.cliente.id,
            data_iscrizione: new Date().toISOString(),
        }

        console.log(iscrizione);

        iscrizione = await locals.pb.collection("iscrizioni").create(iscrizione);
        console.log(iscrizione.id);

        return {
            status: 200,
            body: {
                message: "Iscrizione completata",
                code: iscrizione.id
            }
        }
    }
};