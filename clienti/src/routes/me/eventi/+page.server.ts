import type { Evento, Iscrizione } from '$lib/models.js';
import { checkAuth } from '$lib/utils.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    checkAuth(locals);
    const iscrizioni: Iscrizione[] = await locals.pb.collection("iscrizioni").getFullList<Iscrizione>(
        {
            filter: 'prenotati ?~ "' + locals.cliente.id + '"',
            expand: 'evento,lista'
        }
    );

    // const eventi: Evento[] = iscrizioni.map((iscrizione) => iscrizione.expand.evento);
    iscrizioni.forEach(async (iscrizione) => {
        if (iscrizione.expand && iscrizione.expand.evento) {
            iscrizione.expand.evento.poster = await locals.pb.files.getUrl(iscrizione.expand.evento, iscrizione.expand.evento.poster);
        }
    });
    // console.log(eventi);

    return {
        iscrizioni
    }
};

export const actions = {
    unsubscribe: async ({ locals, params, request }) => {
        const body = Object.fromEntries(await request.formData()) as { [key: string]: string };
        let id_iscrizione = body.id_iscrizione;
        let iscrizione: Iscrizione = await locals.pb.collection("iscrizioni").getOne<Iscrizione>(id_iscrizione);
        iscrizione.prenotati = iscrizione.prenotati.filter((id) => id !== locals.cliente.id);
        await locals.pb.collection("iscrizioni").update(iscrizione.id, iscrizione);
        return {
            status: 200,
            body: {
                message: "Disiscrizione completata"
            }
        }
    }
};