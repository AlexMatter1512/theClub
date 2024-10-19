import { formatDate } from '../../../../../../common/script/utils';
import type { Evento } from '../../../../../../common/script/models';

export const load = async ({locals}) => {
    let eventi = (await locals.pb.collection("eventi").getFullList<Evento>({
        sort: '-inizio',
    }));
    for (let evento of eventi) {
        // console.log(evento);
        evento.poster = await locals.pb.getFileUrl(evento, evento.poster);
        evento.formatted_inizio = formatDate(new Date(evento.inizio));
        evento.formatted_fine = formatDate(new Date(evento.fine));
    }
    return {
        eventi
    };
};