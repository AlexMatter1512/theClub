import { fail, redirect } from '@sveltejs/kit';
import { updateProfileSchema } from '$lib/schemas';
import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({locals}) => {
  let cliente = {
    name: locals.cliente.name,
    surname: locals.cliente.surname,
    birthdate: locals.cliente.birthdate ? new Date(locals.cliente.birthdate).toISOString().split('T')[0] : ''
  }

	return {
        form: await superValidate(cliente, zod(updateProfileSchema))
    };
	
};

export const actions = {
  updateProfile: async ({ request, locals }) => {
    const form = await superValidate(request, zod(updateProfileSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const formData = form.data;
      // Update the user data
      await locals.pb.collection('clienti').update(locals.cliente.id, formData);

    } catch (err) {
      console.log('Error: ', err);
	    return fail(500, {form})
    }
    // Return the updated form
    return message(form, 'Profilo aggiornato con successo');
    // throw redirect(300, '/me/profile');
  },
};