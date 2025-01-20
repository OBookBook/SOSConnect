import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { incidentTypeId, incidentDate, location, description, status } =
      body;

    const incidentType = await prisma.incidentType.findFirst({
      where: {
        name: incidentTypeId, // フロントエンドから送られてくる値に合わせて
      },
    });

    if (!incidentType) {
      return new NextResponse("Invalid incident type", { status: 400 });
    }

    const report = await prisma.report.create({
      data: {
        incidentTypeId: incidentType.id, // 見つかったincidentTypeのIDを使用
        incidentDate: new Date(incidentDate), // 日付を適切な形式に変換
        location,
        description,
        status: status as any, // PrismaのReportStatusとして扱う
        latitude: null, // オプショナルなフィールド
        longitude: null, // オプショナルなフィールド
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("[REPORTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
