import type { Evento, Iscrizione, Lista, Iscrizione2_duplicate, Lista_evento } from '$lib/models';
import { checkAuth } from '$lib/utils.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
    checkAuth(locals);

    // get the event data
    let evento: Evento = await locals.pb.collection("eventi").getOne<Evento>(params.id_evento);
    evento.poster = await locals.pb.getFileUrl(evento, evento.poster)

    // get the iscrizioni for the current cliente and the current evento
    let iscrizioni = await locals.pb.collection("iscrizioni_expanded").getFullList<Iscrizione>({
        filter: `id_evento = "${params.id_evento}" && id_cliente = "${locals.cliente.id}"`
    });
    if (iscrizioni.length > 0) {
        return {
            evento,
            iscritto: true,
        };
    }
    
    // get lists for the event
    let listeEvento = await locals.pb.collection("liste_eventi").getFullList({
        filter: `evento = "${params.id_evento}"`,
        expand: 'lista'
    });

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

        // get the id of the lista from the form data
        const body = Object.fromEntries(await request.formData()) as { [key: string]: string };
        const id_listaEvento = body.id_listaEvento;

        try {
            // Check if listaEvento is closed before creating iscrizione
            let listaEvento = await locals.pb.collection("liste_eventi").getOne<Lista_evento>(id_listaEvento);
            if (listaEvento.chiusura && new Date(listaEvento.chiusura) < new Date()) {
                return {
                    status: 400,
                    body: {
                        message: "Chiusura iscrizioni scaduta",
                        code: 0
                    }
                };
            }

            // Proceed with the iscrizione creation
            let iscrizione: Iscrizione2_duplicate = {
                lista_evento: id_listaEvento,
                cliente: locals.cliente.id,
                data_iscrizione: new Date().toISOString(),
            };

            iscrizione = await locals.pb.collection("iscrizioni").create(iscrizione);
            console.log(iscrizione.id);

            return {
                status: 200,
                body: {
                    message: "Iscrizione completata",
                    code: iscrizione.id
                }
            };
        } catch (e) {
            console.error(e);
            return {
                status: 500,
                body: {
                    message: "Errore durante l'iscrizione",
                    code: 0
                }
            };
        }
    }
};