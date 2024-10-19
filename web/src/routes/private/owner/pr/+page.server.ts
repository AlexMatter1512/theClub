import type { User } from '../../../../../../common/script/models';

export const load = async ({locals}) => {
    // get all the users that are not verified from locals.pb.collection('users')
    let users = await locals.pb.collection('users').getFullList<User>()
    let unverifiedUsers = []
    for (let user of users) {
        user.avatar = await locals.pb.getFileUrl(user, user.avatar)
        if (user.avatar === "") {
            user.avatar = 'https://preview.redd.it/qb5mm556vei71.jpg?auto=webp&s=29bee2062481c32630dacc1f6c74b9f3a764e03a'
        }
        if (!user.verified) {
            unverifiedUsers.push(user)
        }
    }
    return {
        users,
        unverifiedUsers
    }
};