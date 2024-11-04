import { error, redirect } from '@sveltejs/kit';
import { generateRandomUsername } from '$lib/utils';
import { userSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms';

export const load = async () => {
	const form = await superValidate(zod(userSchema));
	return { form };
};

export const actions = {
	register: async ({ locals, request }) => {
		const form = await superValidate(request, zod(userSchema));
		try {
			// const body = Object.fromEntries(await request.formData()) as { [key: string]: string };
			const body = form.data;
			let username = generateRandomUsername(body.name);

			await locals.pb.collection('users').create({ username, ...body });
			// await locals.pb.collection('users').requestVerification(body.email);
		} catch (err) {
			console.log('Error: ', err);
			
			//@ts-expect-error
			let errorList = err.originalError.data.data;
			let errorString = '';
			// for every object in the errorList, add the error message to the error object

			for (const key in errorList) {
				if (errorList.hasOwnProperty(key) && errorList[key].message) {
				  errorString += key + ": " +errorList[key].message + ',\n';
				  console.log(errorList[key].message);  // Logs only the "message" property
				}
			  }
			return message(form, {status:"fail", text:"Errore durante la registrazione: " + errorString});
		}

		throw redirect(303, '/auth/login');
	}
};