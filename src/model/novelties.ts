import { z } from "zod";

export const NewProductReportSchema = z.object({
    barcode: z.string(),
    name: z.string(),
    measure: z.string(),
    costPrice: z.number(),
    brand: z.string(),
})
export const PendingValidationReportSchema = z.object({
    barcode: z.string(),
    name: z.string(),
    image: z.string(),
    key: z.string(),
    value: z.string()
})

export const noveltiesSchema = z.object({
    NewProductReports: z.array(NewProductReportSchema),
    PendingValidationReport: z.array(PendingValidationReportSchema),
})

export type NewProductReport = z.infer<typeof NewProductReportSchema>
export type PendingValidationReport = z.infer<typeof PendingValidationReportSchema>
export type Novelties = z.infer<typeof noveltiesSchema>