import { getCurrentMetricsByTimeFrame, TimeFrame, timeFrameSchema } from "@/lib/mongo/metrics";
import { type NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: Promise<{ timeFrame: TimeFrame }> }) {

    const { timeFrame } = await params

    try {
        const validTimeFrame = timeFrameSchema.safeParse(timeFrame)
        if (!validTimeFrame.success) {
            return NextResponse.json(validTimeFrame.error.formErrors, { status: 400 })
        }
        const res = await getCurrentMetricsByTimeFrame(timeFrame)
        return NextResponse.json(res)
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 500 })
    }
}