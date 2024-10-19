import { eventSchema } from "$lib/schemas";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
export const load = async () => {
    const form = await superValidate(zod(eventSchema));
    return { form };
};

export const actions = {
    nuovo: async ({ locals, request }) => {
        const form = await superValidate(request, zod(eventSchema));
        const updateObj = {
            ...form.data, // Spread the entire form.data object
            inizio: new Date(form.data.inizio), // Override inizio with the Date object
            fine: new Date(form.data.fine),     // Override fine with the Date object
        };
        try {
            await locals.pb.collection("eventi").create(updateObj);
        } catch (e) {
            console.error(e);
            return message(form, {status:"fail", text:"Errore durante la creazione dell'evento"});
        }
        return message(form, {status:"success", text:"Evento creato con successo"});
    }
};