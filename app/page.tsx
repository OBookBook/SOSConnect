"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight, Heart, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-950">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center items-center mb-8">
            <ShieldCheck className="h-16 w-16 text-sky-500" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            あなたの勇気が誰かを救う
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            目撃した暴力や虐待の通報に躊躇していませんか？
            <br />
            あなたの安全を守りながら、その人を助けることができます。
          </p>

          <div className="grid gap-8 md:grid-cols-3 mb-12">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/50 backdrop-blur-sm">
              <ShieldCheck className="h-8 w-8 mx-auto mb-4 text-sky-500" />
              <h3 className="font-semibold mb-2">安全な匿名通報</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                個人を特定できる情報は一切記録されません
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/50 backdrop-blur-sm">
              <Clock className="h-8 w-8 mx-auto mb-4 text-sky-500" />
              <h3 className="font-semibold mb-2">サポート体制</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                専門家による支援をご用意
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/50 backdrop-blur-sm">
              <Heart className="h-8 w-8 mx-auto mb-4 text-sky-500" />
              <h3 className="font-semibold mb-2">確実な支援</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                近くの支援団体に直接つながります
              </p>
            </Card>
          </div>

          <Link href="/report" className="inline-block">
            <Button
              size="lg"
              className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              匿名で報告する
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            * 緊急の危険がある場合は、すぐに110番通報してください
          </p>
        </div>
      </main>
    </div>
  );
}
