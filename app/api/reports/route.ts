import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ReportStatus } from "@prisma/client";

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { incidentTypeId, incidentDate, location, description, status } =
      body;
    const report = await prisma.report.create({
      data: {
        incidentTypeId: incidentTypeId,
        incidentDate: incidentDate,
        location: location,
        description: description,
        status: status as ReportStatus,
        latitude: null,
        longitude: null,
      },
    });

    return NextResponse.json({ success: true, data: report });
  } catch (error) {
    return NextResponse.json(
      {
        error: "通報の送信に失敗しました",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
