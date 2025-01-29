'use server'
import { cookies } from "next/headers";

export async function setAllowedToShopOvertime() {
    
    const currentHour = new Date().getHours();
    const currentMin = new Date().getMinutes();
    const allowedToShopOvertime = currentHour === 20 && currentMin >= 55;

    if (allowedToShopOvertime) {
        (await cookies()).set("allowedToShopOvertime", "true", {maxAge: 1200});
    }
}