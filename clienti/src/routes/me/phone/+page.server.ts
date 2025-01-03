import twilio from 'twilio';
import { env } from '$env/dynamic/private';
const { TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE, PHONE_VERIFICATION, TEMP_PHONE } = env;
import { verifyPhoneSchema } from '$lib/schemas';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({locals}) => {
    if (PHONE_VERIFICATION !== 'true' || locals.cliente.phone_verified || (TEMP_PHONE && locals.cliente.phone !== TEMP_PHONE)) {
        throw redirect(303, '/');
    }

    try {
        const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
        const verification = await client.verify.v2
            .services(TWILIO_VERIFY_SERVICE)
            .verifications.create({
                channel: 'sms',
                to: locals.cliente.phone
            });

        console.log(verification.status);
    } catch (error) {
        console.error('Error: ', error);
        throw fail(500, { message: 'Errore interno del server' });
    }

    return {
        form: await superValidate(zod(verifyPhoneSchema))
    };
};

export const actions = {
    verify: async ({ locals, request }) => {
        const form = await superValidate(request, zod(verifyPhoneSchema));
        console.log("form: ", form);

        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
            const verification = await client.verify.v2
                .services(TWILIO_VERIFY_SERVICE)
                .verificationChecks.create({
                    to: locals.cliente.phone,
                    code: form.data.code
                });

            console.log(verification.status);

            if (verification.status === 'approved') {
                await locals.pb.collection('clienti').update(locals.cliente.id, { phone_verified: true });
                return message(form, 'Numero di telefono verificato');
            } else {
                return message(form, 'Codice di verifica non valido', { status: 400 });
            }
        } catch (error) {
            console.error('Error: ', error);
            return message(form, 'Errore interno del server', { status: 500 });
        }
    }
};