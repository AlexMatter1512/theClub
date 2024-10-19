import type { Evento } from '../../../../../common/script/models';
import { formatDate } from '../../../../../common/script/utils';

export const load = async ({locals}) => {
    let now = new Date().toISOString().replace("T", " ")
    let eventi = await locals.pb.collection("eventi").getList<Evento>(1, 5, {
        filter: 'inizio > "' + now + '"',
        sort: 'inizio',
    });

    console.log(eventi);

    let liste = await locals.pb.collection("liste").getFullList();

    for (let evento of eventi.items) {
        // console.log(evento);
        evento.poster = await locals.pb.getFileUrl(evento, evento.poster);
        evento.formatted_inizio = formatDate(new Date(evento.inizio));
        evento.formatted_fine = formatDate(new Date(evento.fine));
    }
    return {
        eventi: eventi.items,
        liste
    };
};