import type { Lista, Lista_evento } from "$lib/models.js";
import { json } from "@sveltejs/kit";

export const GET = async ({ locals, url }) => {
    const idEvento = url.searchParams.get('id_evento'); // Correct way to get query parameters
    const liste_evento = await locals.pb.collection("liste_eventi").getFullList<Lista_evento>({
        filter: `evento = "${idEvento}"`,
        sort: '-created',
    });

    let liste = await locals.pb.collection("liste").getFullList<Lista>();
    
    // remove from liste all the liste_evento using the id to compare
    liste = liste.filter(l => !liste_evento.find(le => le.lista === l.id));

    return json(liste);
}