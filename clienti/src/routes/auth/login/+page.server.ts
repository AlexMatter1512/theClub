import { loginUserSchema } from '$lib/schemas';
import { validateData } from '$lib/utils.js';
import { error, redirect, fail } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, locals }) => {
		// const body = Object.fromEntries(await request.formData()) as { [key: string]: string };
		const { formData, errors } = await validateData(await request.formData(), loginUserSchema);
		if (errors) {
			return fail(400, {
				data : formData,
				errors : errors.fieldErrors
			});
		}

        try {
			
			await locals.pb.collection('clienti').authWithPassword(formData.email, formData.password);
			
		} catch (err) {
			try {
				await locals.pb.admins.authWithPassword(formData.email, formData.password);
			} catch (err) {
				return {
					error: true,
					message: 'Something went wrong logging in'
				};
			}
			// throw error(500, 'Something went wrong logging in');
		}

		throw redirect(303, '/');
	}
};