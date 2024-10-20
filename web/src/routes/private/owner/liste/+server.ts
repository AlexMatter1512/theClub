import type { Lista } from "$lib/models.js";
import { json } from "@sveltejs/kit";

export const GET = async ({ locals }) => {
    let lista = await locals.pb.collection("liste").getFullList<Lista>(
        {
            sort: '-created'
        }
    );
    return json(lista);
}