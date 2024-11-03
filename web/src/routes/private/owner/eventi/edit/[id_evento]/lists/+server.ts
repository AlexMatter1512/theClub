// src/routes/api/csv/+server.ts
import { json } from '@sveltejs/kit';

export const POST = async ({ locals, params, request }) => {
    const requestBody = await request.text();
    const body = JSON.parse(requestBody);
    const idEvento = params.id_evento;
    const idListe: string[] = body.liste;

    try {
        idListe.forEach(async idLista => {
            await locals.pb.collection("liste_eventi").create({
                evento: idEvento,
                lista: idLista,
            },
            { requestKey: null }
        );
        });
    } catch (e) {
        console.error(e);
        return json({status:"fail", text:"Errore durante l'aggiunta delle liste"});
    }
    return json({status:"success", text:"Liste aggiunte con successo"});
}

export const DELETE = async ({ locals, params, request }) => {
    const requestBody = await request.text();
    const body = JSON.parse(requestBody);
    const idListaEvento: string = body.id_lista_evento;

    try {
        await locals.pb.collection("liste_eventi").delete(idListaEvento);
    } catch (e) {
        console.error(e);
        return json({status:"fail", text:"Errore durante l'eliminazione delle liste"});
    }
    return json({status:"success", text:"Liste eliminate con successo"});
}

