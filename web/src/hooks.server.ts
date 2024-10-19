// src/hooks.server.js
import PocketBase from 'pocketbase';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    event.locals.pb = new PocketBase('http://mbp14alex.local:8090');

    // load the store data from the request cookie string
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
    if (event.locals.pb.authStore.isValid) {
        event.locals.user = event.locals.pb.authStore.model; // TODO: check if this needs to be serialized using structuredClone
    } else {
        event.locals.user = undefined;
    }
    // console.log("hooks: user: ",event.locals.user);

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        // event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
        if (event.locals.pb.authStore.isValid) {
            if (event.locals.pb.authStore.isAdmin) {
                await event.locals.pb.admins.authRefresh();
            } else {
                await event.locals.pb.collection('users').authRefresh();
            }
        }
    } catch (_) {
        // clear the auth store on failed refresh 
        console.log("hooks: failed to refresh auth");
        event.locals.pb.authStore.clear();
    }

    const response = await resolve(event);

    // send back the default 'pb_auth' cookie to the client with the latest store state
    // TODO: remove the 'secure: false' option when deploying to a secure environment
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({secure: false, sameSite: 'lax'}));

    return response;
}