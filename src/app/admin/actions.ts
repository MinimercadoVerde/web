'use server'
import { cookies } from "next/headers";

export async function adminAuth(password: string) {

    if (password !== process.env.ADMIN_PASSWORD) return false;
    (await cookies()).set('adminSession', '12345')
    return true
}