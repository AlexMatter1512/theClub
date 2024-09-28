import { error, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData()) as { [key: string]: string };

        try {
			
			await locals.pb.collection('users').authWithPassword(body.email, body.password);
			
		} catch (err) {
			try {
				await locals.pb.admins.authWithPassword(body.email, body.password);
			} catch (err) {
				return {
					error: true,
					message: 'Something went wrong logging in'
				};
			}
			// throw error(500, 'Something went wrong logging in');
		}

		throw redirect(303, '/private/dashboard');
	}
};