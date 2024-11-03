import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
    const requestBody = await request.json();
    const userId = requestBody.id;
    const verified = requestBody.verify;
    console.log('userId:', userId);

    try {
        // Update the user's verified status in PocketBase
        await locals.pb.collection('users').update(userId, { verified });

        return json({ status: 'success', text: 'User updated successfully' });
    } catch (e) {
        console.error(e);
        return json({ status: 'fail', text: 'Error updating the user' });
    }
};