import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { incidentTypeId, incidentDate, location, description, status } =
      body;

    const incidentType = await prisma.incidentType.findUnique({
      where: {
        id: incidentTypeId,
      },
    });

    if (!incidentType) {
      return NextResponse.json(
        { error: "通報種別が見つかりません" },
        { status: 400 }
      );
    }

    const report = await prisma.report.create({
      data: {
        incidentTypeId: incidentTypeId, // 直接IDを使用
        incidentDate: new Date(incidentDate), // 日付を適切な形式に変換
        location,
        description,
        status: status as any, // PrismaのReportStatusとして扱う
        latitude: null, // オプショナルなフィールド
        longitude: null, // オプショナルなフィールド
      },
    });

    return NextResponse.json({ success: true, data: report });
  } catch (error) {
    console.error("[REPORTS_POST]", error);
    return NextResponse.json(
      {
        error: "通報の送信に失敗しました",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
