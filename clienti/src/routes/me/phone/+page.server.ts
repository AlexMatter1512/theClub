import twilio from 'twilio';
import { TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE } from '$env/static/private';
import { verifyPhoneSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { fail } from '@sveltejs/kit';

export const actions = {
    verify: async ({ locals, request }) => {
        const { formData, errors } = await validateData(await request.formData(), verifyPhoneSchema);

        if (errors) {
            return fail(400,{data: formData, errors: errors.fieldErrors});
        }
        
        const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
        const verification = await client.verify.v2
            .services(TWILIO_VERIFY_SERVICE)
            .verificationChecks.create({
                to: locals.cliente.phone,
                code: formData.code
            });
        
        console.log(verification.status);

        if (verification.status === 'approved') {
            try {
                await locals.pb.collection('clienti').update(locals.cliente.id, { "phone_verified": true });
            } catch (error) {
                console.error(error);
                return {
                    status: 500,
                    body: { message: 'Internal server error' }
                };
            }
            return {
                status: 200,
                body: { message: 'Phone verified' }
            };
        }

        return {
            status: 400,
            body: { message: 'Invalid code' }
        };
    }
};