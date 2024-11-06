import { redirect, fail } from '@sveltejs/kit';
import { generateRandomUsername } from '$lib/utils';
import { registerUserSchema } from '$lib/schemas.js';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import twilio from 'twilio';
import { env } from '$env/dynamic/private';

export const load = async () => {
	return { form: await superValidate(zod(registerUserSchema)) };
};

export const actions = {
	register: async ({ locals, request }) => {
		const { PHONE_VERIFICATION, MAIL_VERIFICATION } = env;
		const form = await superValidate(request, zod(registerUserSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const formData = form.data;
		let username = generateRandomUsername(formData.name);
		
		if (!formData.phone.startsWith('+39')) {
			formData.phone = '+39' + formData.phone;
		}
		
		try {
			await locals.pb.collection('clienti').create({ username, ...formData });
			await locals.pb.collection('clienti').authWithPassword(formData.email, formData.password);			
		} catch (err: any) {
			console.log('Error: ', err);
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
		
		if(PHONE_VERIFICATION === 'true') {
			throw redirect(303, `/me/phone`);
		}
		throw redirect(303, '/');
	}
};