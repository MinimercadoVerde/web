import { z } from "zod";

const tenantSchema = z.object({
    clientId: z.string(),
    key: z.string(),
    secret: z.string(),
    name: z.string(),
    address: z.object({
        city: z.string(),
        neighborhood: z.string(),
        street: z.string(),
        number: z.string(),
    }),
    contact: z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string(),
    }),
    logo: z.string(),
})