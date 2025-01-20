import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function ReportButton() {
  return (
    <Link href="/report" className="inline-block">
      <Button
        size="lg"
        className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        匿名で報告する
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  );
}
