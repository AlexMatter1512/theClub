import { loginSchema } from '$lib/schemas.js';
import { error, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	const form = await superValidate(zod(loginSchema));
	return { form };
};

export const actions = {
	login: async ({ request, locals }) => {
		const form = await superValidate(request, zod(loginSchema));
		const body = form.data;
        try {
			console.log(body.email, body.password);
			await locals.pb.collection('users').authWithPassword(body.email, body.password);
			
		} catch (err) {
			try {
				await locals.pb.admins.authWithPassword(body.email, body.password);
			} catch (err: any) {
				// Capture and include the error data in the message
				const errorMessage = "Errore durante il login:\n" + err.data?.message;
				return message(form, { status: "fail", text: errorMessage });
			}
		}
		console.log("redirecting to /private/dashboard");
		throw redirect(303, '/private/dashboard');
	}
};