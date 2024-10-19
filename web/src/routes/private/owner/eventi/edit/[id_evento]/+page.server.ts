import type { Iscrizione_expanded, Evento } from '../../../../../../../../common/script/models';
import { eventSchema } from '$lib/schemas';
import { correctDateString } from '$lib/utils.js';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

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
    
    evento.inizio = correctDateString(evento.inizio);
    evento.fine = correctDateString(evento.fine);
    let { poster, ...eventoWithoutPoster } = evento;
    let form = await superValidate(eventoWithoutPoster, zod(eventSchema));

    return {
        form,
        evento,
        iscrizioni_expanded,
        listeEvento
    };
};

export const actions = {
    edit: async ({ locals, request, params }) => {
        const form = await superValidate(request, zod(eventSchema));
        let updateObj = {
            ...form.data, // Spread the entire form.data object
            inizio: new Date(form.data.inizio), // Override inizio with the Date object
            fine: new Date(form.data.fine),     // Override fine with the Date object
        };
        try {
            await locals.pb.collection("eventi").update(params.id_evento, updateObj);
        } catch (e) {
            console.error(e);
            return message(form, 'Errore durante la modifica dell\'evento');
        }
        return message(form, 'Evento modificato con successo');
    }
};