// src/routes/api/csv/+server.ts
import { json } from '@sveltejs/kit';

export const PATCH = async ({ locals, params, request }) => {
    const { chiusura } = await request.json();

    try {
        await locals.pb.collection("liste_eventi").update(params.id_listaevento, { chiusura });
    } catch (e) {
        console.error(e);
        return json({status:"fail", text:"Errore durante l'aggiornamento della lista"});
    }
    return json({status:"success", text:"Lista aggiornata con successo"});
}