import type { Evento, Iscrizione, Lista } from '$lib/models';
import { checkAuth } from '$lib/utils.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
    checkAuth(locals);

    // get the event data
    let evento: Evento = await locals.pb.collection("eventi").getOne<Evento>(params.id_evento);
    evento.poster = await locals.pb.getFileUrl(evento, evento.poster)
    
    // im not expanding evento (and im doing the query above) because it would send the same data for each lista
    let iscrizioni = await locals.pb.collection("iscrizioni").getFullList<Iscrizione>(
        {
            filter: 'evento = "' + params.id_evento + '"',
            expand: 'lista'
        }
    );

    return {
        evento,
        listeEvento: iscrizioni
    };
};


/** @type {import('./$types').Actions} */
export const actions = {
    registrati: async ({ locals, params, request }) => {

        // get the id of the lista from the button registrati clicked
        const body = Object.fromEntries(await request.formData()) as { [key: string]: string };
        let id_lista = body.id_lista;
        
        // get the iscrizione record whith the right evento and lista
        let iscrizioni = await locals.pb.collection("iscrizioni").getFullList<Iscrizione>({
            filter: `evento = "${params.id_evento}" && lista = "${id_lista}"`
        });
        // it should be only one because the combination of evento and lista is unique
        let iscrizione = iscrizioni.length === 1 ? iscrizioni[0] : (() => { throw new Error('Unexpected number of iscrizioni found'); })();
        if (!iscrizione.prenotati.includes(locals.cliente.id)) {
            iscrizione.prenotati.push(locals.cliente.id);
            await locals.pb.collection("iscrizioni").update(iscrizione.id, iscrizione);
        }

        return {
            status: 200,
            body: {
                message: "Iscrizione completata",
                code: `${iscrizione.id}_${locals.cliente.id}`
            }
        }
    }
};