import type { Iscrizione_expanded, Evento } from '$lib/models.js';

export const load = async ({ locals, params }) => {
    let evento: Evento = await locals.pb.collection("eventi").getOne<Evento>(params.id_evento);
    evento.poster = await locals.pb.getFileUrl(evento, evento.poster)
    
    // im not expanding evento (and im doing the query above) because it would send the same data for each lista
    let listeEvento = await locals.pb.collection("liste_eventi").getFullList(
        {
            filter: 'evento = "' + params.id_evento + '"',
            expand: 'lista'
        }
    );

    let iscrizioni_expanded = await locals.pb.collection("iscrizioni_expanded").getFullList<Iscrizione_expanded>(
        {
            filter: `id_evento = "${params.id_evento}"`,
        }
    );

    return {
        evento,
        iscrizioni_expanded,
        listeEvento
    };
};