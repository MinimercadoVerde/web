import { deleteNovelty, postNewProductReport, postPendingValidationReport } from "@/lib/mongo/novelties";
import { NewProductReport, NewProductReportSchema, noveltiesSchema, PendingValidationReport, PendingValidationReportSchema } from "@/model/novelties";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const reportTypeSchema = z.enum(["new_product", "validate"])
export type ReportType = z.infer<typeof reportTypeSchema>
export async function POST(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const reportType = searchParams.get('type') as ReportType

    if (!reportType) return NextResponse.json({ error: 'Report type not specified' }, { status: 400 })

    if (!reportTypeSchema.safeParse(reportType).success) { return NextResponse.json({ error: 'invalid report type' }, { status: 400  }) }

    try {
        const body = await request.json()
        const validBody = validateBody(reportType, body)
        if (!validBody.success) return NextResponse.json(validBody.error.formErrors, { status: 400 })

        const response = await post(reportType, body)

        return NextResponse.json(response, { status: 200 })
    } catch (error: any) {
        if (error.message === 'Unexpected end of JSON input') return NextResponse.json({ error: "No se puedo leer correctamente el body" }, { status: 500 })
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ barcode: string }> }) {

    const searchParams = request.nextUrl.searchParams

    const reportType = searchParams.get('type') as ReportType
    if (!reportType) return NextResponse.json({ error: 'Report type not specified' }, { status: 400 })

    const barcode = (await params).barcode
    if (!reportTypeSchema.safeParse(reportType)) {
        return NextResponse.json({ error: 'Invalid report type' }, { status: 400 })
    }

    try {
        const response = await deleteNovelty(reportType, barcode)
        return NextResponse.json(response, {status: 200 })
    } catch (error: any) {
        if (error.message === 'Unexpected end of JSON input') return NextResponse.json({ error: "No se puedo leer correctamente el body" }, { status: 500 })
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}


const post = (reportType: ReportType, body: Object) => {
    switch (reportType) {
        case "new_product":
            return postNewProductReport(body as NewProductReport)
        case "validate":
            return postPendingValidationReport(body as PendingValidationReport)
    }
}

const validateBody = (reportType: ReportType, body: Object) => {
    switch (reportType) {
        case "new_product":
            return NewProductReportSchema.safeParse(body)

        case "validate":
            return PendingValidationReportSchema.safeParse(body)
    }
}