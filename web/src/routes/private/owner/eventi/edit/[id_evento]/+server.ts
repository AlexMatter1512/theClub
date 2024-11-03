// src/routes/api/csv/+server.ts
import { json } from '@sveltejs/kit';

export const DELETE = async ({ locals, params }) => {
    try {
        await locals.pb.collection("eventi").delete(params.id_evento);
    } catch (e) {
        console.error(e);
        return json({status:"fail", text:"Errore durante l'eliminazione dell'evento"});
    }
    return json({status:"success", text:"Evento eliminato con successo"});
}

