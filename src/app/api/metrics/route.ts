import { getTodayMetrics, upsertTodaysMetrics } from "@/lib/mongo/metrics";
import { unit } from "@/model/order";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({ saleValue: z.number().positive(), unit })
type Body = z.infer<typeof bodySchema>

export async function GET(request: NextRequest){
    try {
        const res = await getTodayMetrics()
        return NextResponse.json(res)
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {

    try {
        const body = await request.json() as Body
        const validRequest = bodySchema.safeParse(body)
        if (!validRequest.success) {
            return NextResponse.json(validRequest.error.formErrors, { status: 400 })
        }
        const { saleValue, unit } = body
        const res = await upsertTodaysMetrics(saleValue, unit)
        return NextResponse.json(res)

    } catch (error: any) {
        return NextResponse.json(error.message, { status: 500 })
    }
}

