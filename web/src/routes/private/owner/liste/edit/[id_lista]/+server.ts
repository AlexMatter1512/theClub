// src/routes/api/csv/+server.ts
import { json } from '@sveltejs/kit';

export const DELETE = async ({ locals, params }) => {
    try {
        await locals.pb.collection("liste").delete(params.id_lista);
    } catch (e) {
        console.error(e);
        return json({status:"fail", text:"Errore durante l'eliminazione della lista"});
    }
    return json({status:"success", text:"Lista eliminata con successo"});
}