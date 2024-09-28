import type { Evento } from '$lib/models.js';

export const load = async ({ locals, params }) => {
    let lista = await locals.pb.collection("liste").getOne(params.id_lista);
    return {
        lista
    };
};