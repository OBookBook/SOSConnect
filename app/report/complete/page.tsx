"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink, Phone } from "lucide-react";

export default function CompletePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-950 p-4">
      <div className="max-w-2xl mx-auto pt-16">
        <Card className="p-8 text-center bg-white/80 backdrop-blur-sm">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-emerald-400" />
          </div>

          <h1 className="text-2xl font-bold mb-4">
            ご報告ありがとうございます
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            勇気を出してお話しいただき、ありがとうございます。
            <br />
            あなたの報告が、より安全な社会づくりに貢献します。
          </p>

          <div className="bg-sky-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="font-semibold mb-4">サポート窓口のご案内</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-sky-400 mr-3" />
                  <span>24時間相談ホットライン</span>
                </div>
                <Button variant="outline" size="sm">
                  0120-555-0000
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded">
                <div className="flex items-center">
                  <ExternalLink className="h-5 w-5 text-sky-400 mr-3" />
                  <span>オンラインチャット相談</span>
                </div>
                <Button variant="outline" size="sm">
                  相談を始める
                </Button>
              </div>
            </div>
          </div>

          <div className="space-x-4">
            <Link href="/">
              <Button variant="outline">トップページへ</Button>
            </Link>
            {/* <Button
              variant="default"
              className="bg-sky-400 hover:bg-sky-500"
              onClick={() => window.location.reload()}
            >
              新しい報告を作成
            </Button> */}
          </div>
        </Card>
      </div>
    </div>
  );
}
