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
		const { 
			PHONE_VERIFICATION,
			TWILIO_SID, 
			TWILIO_AUTH_TOKEN, 
			TWILIO_VERIFY_SERVICE,
		} = env;
		console.log('PHONE_VERIFICATION:', PHONE_VERIFICATION);
		console.log('TWILIO_SID:', TWILIO_SID);
		console.log('TWILIO_AUTH_TOKEN:', TWILIO_AUTH_TOKEN);
		console.log('TWILIO_VERIFY_SERVICE:', TWILIO_VERIFY_SERVICE);
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
		} catch (err) {
			console.log('Error: ', err);
			return message(form, 'Errore durante la registrazione', { status: 500 });
		}
		
		if(PHONE_VERIFICATION === 'true') {
			const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
			const verification = await client.verify.v2
				.services(TWILIO_VERIFY_SERVICE)
				.verifications.create({
					channel: 'sms',
					to: formData.phone
				});

			console.log(verification.status);

			throw redirect(303, `/me/phone`);
		}
		throw redirect(303, '/');
	}
};