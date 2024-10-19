import type { Evento } from '../../../../../../../../common/script/models';

export const load = async ({ locals, params }) => {
    let lista = await locals.pb.collection("liste").getOne(params.id_lista);
    return {
        lista
    };
};