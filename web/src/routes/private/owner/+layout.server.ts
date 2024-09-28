import { redirect } from '@sveltejs/kit';

export const load = async ({locals}) => {
    if (!locals.user.owner) 
        throw redirect(303, "/");
};