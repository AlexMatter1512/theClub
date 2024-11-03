import type { Evento, Iscrizione, Iscrizione2_duplicate, Iscrizione_expanded } from '$lib/models.js';
import { checkAuth } from '$lib/utils.js';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
    throw redirect(303, '/me/eventi/inProgramma');
};