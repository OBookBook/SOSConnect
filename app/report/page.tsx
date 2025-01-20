"use client";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Home,
  Send,
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

const steps = [
  {
    id: "type",
    question: "どのような種類の通報でしょうか？",
    component: "type",
  },
  {
    id: "date",
    question: "いつ頃のことでしょうか？",
    component: "date",
  },
  {
    id: "location",
    question: "どちらで起きたことでしょうか？",
    component: "location",
  },
  {
    id: "description",
    question: "差し支えない範囲で状況を教えていただけますか？",
    component: "description",
  },
];

export default function ReportPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [incidentType, setIncidentType] = useState("");
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!date || !location || !description || !incidentType) {
      toast({
        title: "エラー",
        description: "すべての項目を入力してください。",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          incidentTypeId: incidentType,
          incidentDate: date.toISOString(),
          location,
          description,
          status: "PENDING",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "通報の送信に失敗しました");
      }

      router.push("/report/complete");
    } catch (error) {
      toast({
        title: "エラー",
        description:
          error instanceof Error
            ? error.message
            : "予期せぬエラーが発生しました",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderInput = () => {
    const step = steps[currentStep];

    switch (step.component) {
      case "type":
        return (
          <Select value={incidentType} onValueChange={setIncidentType}>
            <SelectTrigger>
              <SelectValue placeholder="通報の種類を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">暴力</SelectItem>
              <SelectItem value="2">虐待</SelectItem>
              <SelectItem value="3">不審者</SelectItem>
              <SelectItem value="4">その他</SelectItem>
            </SelectContent>
          </Select>
        );

      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date
                  ? format(date, "yyyy年MM月dd日", { locale: ja })
                  : "日付を選択"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ja}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );

      case "location":
        return (
          <Input
            placeholder="場所を入力"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        );

      case "description":
        return (
          <Textarea
            placeholder="安心してお話しください。ご自身のペースで構いません。"
            className="min-h-[150px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-950 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 pt-4">
          <Link href="/">
            <Button
              variant="ghost"
              className="gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Home className="h-4 w-4" />
              ホームに戻る
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "h-2 rounded-full flex-1 mx-1",
                  index <= currentStep
                    ? "bg-sky-400"
                    : "bg-gray-200 dark:bg-gray-700"
                )}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            {currentStep + 1} / {steps.length}
          </p>
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="bg-sky-50 dark:bg-gray-800 p-4 rounded-lg inline-block">
              <p className="text-lg font-medium">
                {steps[currentStep].question}
              </p>
            </div>

            <div className="space-y-4">
              {renderInput()}

              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleBack}
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    戻る
                  </Button>
                )}

                <Button
                  className={cn(
                    "flex-1 bg-sky-400 hover:bg-sky-500",
                    currentStep === 0 && "w-full"
                  )}
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      {isSubmitting ? "送信中..." : "送信する"}
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      次へ
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <Toaster />
    </div>
  );
}
