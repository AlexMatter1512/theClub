import { error, fail, redirect } from '@sveltejs/kit';
import { generateRandomUsername, validateData } from '$lib/utils';
import { TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE } from '$env/static/private';
import twilio from "twilio";
import { registerUserSchema } from '$lib/schemas.js';

export const actions = {
	register: async ({ locals, request }) => {
		try {
			// const body = Object.fromEntries(await request.formData()) as { [key: string]: string };
			const { formData, errors } = await validateData(await request.formData(), registerUserSchema);

			if (errors) {
				return fail(400,{data: formData, errors: errors.fieldErrors});
			}
			let username = generateRandomUsername(formData.name);
			if (!formData.phone.startsWith('+39')) {
				formData.phone = '+39' + formData.phone;
			}

			await locals.pb.collection('clienti').create({ username, ...formData });
			// await locals.pb.collection('clienti').requestVerification(body.email);

			const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
			const verification = await client.verify.v2
				.services(TWILIO_VERIFY_SERVICE)
				.verifications.create({
					channel: "sms",
					to: formData.phone
				});

			console.log(verification.status);

			await locals.pb.collection('clienti').authWithPassword(formData.email, formData.password);

		} catch (err) {
			console.log('Error: ', err);
			
			//TODO: better error handling for pb and twilio errors
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
			throw error(500, errorString);
		}

		throw redirect(303, '/me/phone');
	}
};