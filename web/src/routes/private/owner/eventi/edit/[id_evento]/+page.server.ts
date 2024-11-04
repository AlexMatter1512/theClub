import type { Iscrizione_expanded,  Evento, Lista, Lista_evento } from '$lib/models';
import { eventSchema } from '$lib/schemas';
import { correctDateString } from '$lib/utils.js';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { env } from '$env/dynamic/private';

export const load = async ({ locals, params }) => {
    let evento: Evento = await locals.pb.collection("eventi").getOne<Evento>(params.id_evento);
    evento.poster = await locals.pb.getFileUrl(evento, evento.poster)
    
    // im not expanding evento (and im doing the query above) because it would send the same data for each lista
    let listeEvento = await locals.pb.collection("liste_eventi").getFullList<Lista_evento>(
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
        let formData = await request.formData();
        if (env.SERVER_DEBUG === "true") {
            console.log("request formData: ", formData);
        }
        const form = await superValidate(formData, zod(eventSchema));
        if (env.SERVER_DEBUG === "true") console.log("form.data: ", form.data);
        let updateObj = {
            ...form.data, // Spread the entire form.data object
            inizio: new Date(form.data.inizio), // Override inizio with the Date object
            fine: new Date(form.data.fine),     // Override fine with the Date object
        };
        if (env.SERVER_DEBUG === "true") console.log("updateObj: ", updateObj);
        try {
            await locals.pb.collection("eventi").update(params.id_evento, updateObj);
        } catch (e) {
            console.error(e);
            return message(form, {status:"fail", text:"Errore durante la modifica dell'evento"});
        }
        return message(form, {status:"success", text:"Evento modificato con successo"});
    }
};