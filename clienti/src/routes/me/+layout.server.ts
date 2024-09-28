import { checkAuth } from "$lib/utils.js";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
    checkAuth(locals);
};