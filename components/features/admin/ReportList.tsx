import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Report, ReportStatus } from "@prisma/client";

type ReportWithIncidentType = Report & {
  incidentType: {
    name: string;
  };
};

const statusMap: Record<ReportStatus, { label: string; color: string }> = {
  PENDING: { label: "未対応", color: "bg-yellow-500" },
  IN_PROGRESS: { label: "対応中", color: "bg-blue-500" },
  RESOLVED: { label: "解決済み", color: "bg-green-500" },
  REJECTED: { label: "却下", color: "bg-red-500" },
  REVIEWING: { label: "レビュー中", color: "bg-purple-500" },
} as const;

async function getReports(): Promise<ReportWithIncidentType[]> {
  const baseUrl = process.env.APP_URL;

  if (!baseUrl) {
    throw new Error("APP_URL environment variable is not set");
  }

  const response = await fetch(`${baseUrl}/api/reports`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("レポートの取得に失敗しました");
  }

  const data = await response.json();
  return data.data;
}

export default async function ReportList() {
  const reports = await getReports();

  return (
    <div className="container mx-auto py-10">
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">ID</TableHead>
              <TableHead className="font-semibold">
                インシデントタイプ
              </TableHead>
              <TableHead className="font-semibold">発生日時</TableHead>
              <TableHead className="font-semibold">場所</TableHead>
              <TableHead className="font-semibold">状態</TableHead>
              <TableHead className="font-semibold">登録日時</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report, index) => (
              <TableRow
                key={report.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{report.incidentType.name}</TableCell>
                <TableCell>
                  {format(new Date(report.incidentDate), "yyyy/MM/dd HH:mm", {
                    locale: ja,
                  })}
                </TableCell>
                <TableCell>{report.location}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      statusMap[report.status].color
                    } text-white px-3 py-1 rounded-full text-xs font-medium`}
                  >
                    {statusMap[report.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(report.createdAt), "yyyy/MM/dd HH:mm", {
                    locale: ja,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
