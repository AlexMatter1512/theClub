import type { User } from '../../../../../../common/script/models';

export const load = async ({locals}) => {
    // get all the users that are not verified from locals.pb.collection('users')
    let users = await locals.pb.collection('users').getFullList<User>()
    for (let user of users) {
        user.avatar = await locals.pb.getFileUrl(user, user.avatar)
    }
    return {
        users
    }
};