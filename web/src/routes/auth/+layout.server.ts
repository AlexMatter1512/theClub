import { redirect } from '@sveltejs/kit';

export const load = async ({locals}) => {
    if (locals.user?.verified) 
        throw redirect(303, "/");
};