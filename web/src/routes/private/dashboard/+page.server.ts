import type { Evento } from '$lib/models.js';

export const load = async ({locals}) => {
    let now = new Date().toISOString().replace("T", " ")
    let eventi = (await locals.pb.collection("eventi").getFullList<Evento>({
        filter: 'inizio > "' + now + '"',
    }));

    let liste = await locals.pb.collection("liste").getFullList();

    for (let evento of eventi) {
        // console.log(evento);
        evento.poster = await locals.pb.getFileUrl(evento, evento.poster);
    }
    return {
        eventi,
        liste
    };
};