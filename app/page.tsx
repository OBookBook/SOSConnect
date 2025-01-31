"use client";

import { ShieldCheck, Heart, Clock } from "lucide-react";
import { FeatureCard } from "@/components/features/home/FeatureCard";
import { HeroSection } from "@/components/features/home/HeroSection";
import { ReportButton } from "@/components/features/home/ReportButton";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "安全な匿名通報",
    description: "個人を特定できる情報は一切記録されません",
  },
  {
    icon: Clock,
    title: "サポート体制",
    description: "専門家による支援をご用意",
  },
  {
    icon: Heart,
    title: "確実な支援",
    description: "近くの支援団体に直接つながります",
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-950">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <HeroSection />
          <div className="md:hidden">
            <ReportButton />
          </div>
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
          <div className="hidden md:block">
            <ReportButton />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            * 緊急の危険がある場合は、すぐに110番通報してください
          </p>
        </div>
      </main>
    </div>
  );
}
