import { json } from '@sveltejs/kit';

export const DELETE = async ({ locals, request }) => {
    const requestBody = await request.json();
    const userId = requestBody.id;
    console.log('userId to delete:', userId);

    try {
        // Update the user's verified status in PocketBase
        await locals.pb.collection('users').delete(userId);

        return json({ status: 'success', text: 'User deleted successfully' });
    } catch (e) {
        console.error(e);
        return json({ status: 'fail', text: 'Error deleting the user' });
    }
};