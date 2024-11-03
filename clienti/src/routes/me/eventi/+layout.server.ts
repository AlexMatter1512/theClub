import type { Iscrizione_expanded } from "$lib/models";
import { checkAuth } from "$lib/utils";

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