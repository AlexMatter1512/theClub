import type { Iscrizione_expanded } from '../../../../../common/script/models';

export const load = async ({ locals, url }) => {
    const { pb } = locals;
    const code = url.searchParams.get("code");

    if (!code) {
        return { status: 400, body: "Bad Request" };
    }
    try {
        const iscrizione = await pb.collection("iscrizioni_expanded").getOne<Iscrizione_expanded>(code);
        console.log("fine_evento", iscrizione.fine_evento);
        console.log("inizio_evento", iscrizione.inizio_evento);
        console.log("new Date()", new Date().toISOString());

        let inTime: boolean = iscrizione.fine_evento > new Date().toISOString();
        let tooEarly: boolean = iscrizione.inizio_evento > new Date().toISOString();

        if (iscrizione.entrato) {
            return {
                status: 409, // 409 Conflict
                message: "Utente già entrato",
                iscrizione: iscrizione
            };
        } else if (!inTime) {
            return {
                status: 410, // 410 Gone
                message: "Iscrizione Scaduta",
                iscrizione: iscrizione
            };
        } else if (tooEarly) {
            return {
                status: 403, // 403 Forbidden
                message: "Evento non ancora iniziato",
                iscrizione: iscrizione
            };
        }
        return {
            status: 200, // 200 OK
            iscrizione: iscrizione
        };
    }
    catch (e) {
        return { 
            status: 404, // 404 Not Found
            message: "Iscrizione non trovata",
            iscrizione: null
        };
    }
};

export const actions = {
    conferma_ingresso: async ({ request, locals }) => {
        let { pb } = locals;
        let id_iscrizione: string = Object.fromEntries(await request.formData()).id_iscrizione as string;
        
        try {
            await pb.collection("iscrizioni").update(id_iscrizione, { 
                entrato: true,
                data_ingresso: new Date().toISOString()
            });
            return {
                status: 200, // 200 OK
                message: "Ingresso Confermato!"
            };
        } catch (e) {
            return {
                status: 500, // 500 Internal Server Error
                message: "Errore nella conferma dell'ingresso"
            };
        }
    }
};