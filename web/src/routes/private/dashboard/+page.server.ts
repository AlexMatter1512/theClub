import type { Lista, Evento } from '$lib/models';
import { formatDate } from '../../../../../common/script/utils';

export const load = async ({locals}) => {
    let now = new Date().toISOString().replace("T", " ")
    let eventi = await locals.pb.collection("eventi").getList<Evento>(1, 5, {
        filter: 'fine > "' + now + '"',
        sort: 'inizio',
    });

    let liste = await locals.pb.collection("liste").getList<Lista>(1, 5, {
        sort: '-created',
    });

    for (let evento of eventi.items) {
        // console.log(evento);
        evento.poster = await locals.pb.getFileUrl(evento, evento.poster);
    }
    return {
        eventi: eventi.items,
        liste: liste.items,
    };
};