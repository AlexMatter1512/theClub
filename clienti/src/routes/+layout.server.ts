export const load = async ({ locals }) =>{
    if (locals.cliente) {
        // console.log(locals.cliente)
        locals.cliente.avatar = locals.pb.files.getUrl(locals.cliente, locals.cliente.avatar)
        return {
            cliente: locals.cliente,
        }
    }
    return {
        cliente: undefined
    }
}

