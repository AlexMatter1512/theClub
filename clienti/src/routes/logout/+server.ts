import { redirect } from '@sveltejs/kit';

export function POST ({ locals }) {
    locals.pb.authStore.clear();
    locals.cliente = undefined;
    throw redirect(303, "/auth/login");
}