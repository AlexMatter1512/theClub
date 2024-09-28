//@ts-nocheck
import type { Evento } from '$lib/models.js';

export const load = async ({ locals, params }) => {
    let evento: Evento = await locals.pb.collection("eventi").getOne<Evento>(params.id_evento);
    evento.poster = await locals.pb.getFileUrl(evento, evento.poster)
    
    // im not expanding evento (and im doing the query above) because it would send the same data for each lista
    let listeEvento = await locals.pb.collection("iscrizioni").getFullList(
        {
            filter: 'evento = "' + params.id_evento + '"',
            expand: 'lista,prenotati,entrati'
        }
    );

    return {
        evento,
        listeEvento
    };
};