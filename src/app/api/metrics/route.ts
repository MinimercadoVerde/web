import { upsertTodaysMetrics } from "@/lib/mongo/metrics";
import { unit } from "@/model/order";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(request: NextRequest) {

    const bodySchema = z.object({ saleValue: z.number().positive(), unit })
    type Body = z.infer<typeof bodySchema>

    try {
        const body = await request.json() as Body
        const validRequest = bodySchema.safeParse(body)
        if (!validRequest.success) {
            return NextResponse.json(validRequest.error.formErrors, {
                status: 400
            })
        }
        const { saleValue, unit } = body
        const res = await upsertTodaysMetrics(saleValue, unit)
        return NextResponse.json(res)

    } catch (error: any) {
        return NextResponse.json(error.message, { status: 500 })
    }
}