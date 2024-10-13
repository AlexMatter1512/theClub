import { error } from '@sveltejs/kit';

export const actions = {
	updateProfile: async ({ request, locals }) => {
		let data: FormData = await request.formData();
		const userAvatar = data.get('avatar') as File;

		if (userAvatar?.size === 0) {
			data.delete('avatar');
		}

		try {
			const { name, avatar } = await locals.pb.collection('clienti').update(locals?.cliente?.id, data);

			locals.cliente.name = name;
			locals.cliente.avatar = avatar;
		} catch (err) {
			console.log('Error: ', err);

			throw error(400, 'Something went wrong updating your profile');
		}

		return {
			success: true
		};
	}
};
