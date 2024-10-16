import { loginUserSchema } from '$lib/schemas';
import { redirect, fail } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async () => {
	return { form: await superValidate(zod(loginUserSchema)) };
});

export const actions = {
	login: async ({ request, locals }) => {
		const form = await superValidate(request, zod(loginUserSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('clienti').authWithPassword(form.data.email, form.data.password);
		} catch (err) {
			if (err instanceof ClientResponseError) {
				if (err.status === 400) {
					return message(form, 'email o password non valide', { status: 400 });
				}
			}
			return message(form, 'Errore durante l\'autenticazione', { status: 500 });
		}
		throw redirect(303, '/');
	}
};