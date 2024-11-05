import type { Evento } from '$lib/models';

export const load = async ({locals}) => {
    let now = new Date().toISOString().replace("T", " ")
    let eventi = (await locals.pb.collection("eventi").getFullList<Evento>({
        filter: 'fine > "' + now + '"',
        sort: 'inizio',
    }));

    for (let evento of eventi) {
        // console.log(evento);
        evento.poster = await locals.pb.getFileUrl(evento, evento.poster);
    }
    return {
        eventi
    };
};