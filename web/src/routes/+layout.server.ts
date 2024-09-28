export const load = async ({ locals }) =>{
    if (locals.user) {
        // console.log(locals.user)
        locals.user.avatar = locals.pb.files.getUrl(locals.user, locals.user.avatar)
        return {
            user: locals.user,
        }
    }
    return {
        user: undefined
    }
}

