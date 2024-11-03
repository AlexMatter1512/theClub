// src/hooks.server.js
import PocketBase from 'pocketbase';
import { env } from "$env/dynamic/private";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    event.locals.pb = new PocketBase(env.POCKETBASE_URL);

    // load the store data from the request cookie string
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
    if (event.locals.pb.authStore.isValid) {
        event.locals.cliente = event.locals.pb.authStore.model; // TODO: check if this needs to be serialized using structuredClone
    } else {
        event.locals.cliente = undefined;
    }
    // console.log('hook.server.js: event.locals.cliente:', event.locals.cliente);

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        // event.locals.pb.authStore.isValid && await event.locals.pb.collection('clienti').authRefresh();
        if (event.locals.pb.authStore.isValid) {
            if (event.locals.pb.authStore.isAdmin) {
                await event.locals.pb.admins.authRefresh();
            } else {
                await event.locals.pb.collection('clienti').authRefresh();
            }
        }
    } catch (_) {
        // clear the auth store on failed refresh 
        event.locals.pb.authStore.clear();
    }

    const response = await resolve(event);

    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({secure: false}));

    return response;
}