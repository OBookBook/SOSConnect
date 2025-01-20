"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
}

interface IpInfo {
  city: string;
  region: string;
  country: string;
  postal: string;
}

export function LocationInput({ value, onChange }: LocationInputProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://ipinfo.io?callback");
      const ipInfo: IpInfo = await response.json();
      if (ipInfo.postal) {
        const postalResponse = await fetch(
          `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${ipInfo.postal}`
        );
        const postalData = await postalResponse.json();

        if (postalData.results?.[0]) {
          const address = postalData.results[0];
          const detailedLocation = `${address.address1}${address.address2}${address.address3}`;
          onChange(detailedLocation);

          toast({
            title: "位置情報を取得しました",
            description: detailedLocation,
          });
          return;
        }
      }

      const location = `${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country}`;
      onChange(location);

      toast({
        title: "位置情報を取得しました",
        description: location,
      });
    } catch {
      toast({
        title: "エラーが発生しました",
        description: "位置情報の取得に失敗しました",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Input
        placeholder="場所を入力"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={getCurrentLocation}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            取得中...
          </>
        ) : (
          <>
            <MapPin className="mr-2 h-4 w-4" />
            現在地から入力
          </>
        )}
      </Button>
    </div>
  );
}
