import { redirect } from "@sveltejs/kit";
import { ZodError, ZodObject, type ZodAny } from "zod";

export function generateRandomUsername(name: string) {
    return name + Math.floor(Math.random() * 1000);
}


export function formatDate(date: Date) // for display
{
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function getDateString(date: string) // for javascript
{
    return new Date(date).toISOString().slice(0, 16);
}

export function checkAuth(locals:App.Locals) {
    if (!locals.cliente) {
        throw redirect(301, '/auth/login');
    }
}

//@ts-expect-error
export const validateData = async (formData: FormData, schema: ZodObject) => {
    const body = Object.fromEntries(await formData) as { [key: string]: string };
    
    try {
        const data = schema.parse(body);
        return {
            formData: data,
            errors: null
        }
    } catch (error) {
        if (error instanceof ZodError) {
            console.log('Zod Validation Error: ', error);
            const errors = error.flatten(); // Flatten the Zod errors
            return {
                formData: body,
                errors // Return the flattened errors
            };
        }
        throw error; // Re-throw if it's not a ZodError
    }
}