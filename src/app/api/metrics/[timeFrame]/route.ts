import { getTodayMetrics } from "@/lib/mongo/metrics";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const timeFrame = z.enum(["day", "week", "month", "year"])
type TimeFrame = z.infer<typeof timeFrame>
export async function GET(request: NextRequest, { params }: { params: Promise<{ timeFrame: TimeFrame }> }){

    try {
        const res = await getTodayMetrics()
        return NextResponse.json(res)
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 500 })
    }
}