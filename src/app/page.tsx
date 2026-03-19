"use client";

import { useState } from "react";
import { MainLayout } from "@/components/templates/MainLayout";
import { HeroSection } from "@/components/organisms/HeroSection";
import { SearchForm } from "@/components/organisms/SearchForm";
import { ResultSection } from "@/components/organisms/ResultSection";
import { ErrorCard } from "@/components/molecules/ErrorCard";

export default function Home() {
  const [address, setAddress] = useState("");
  const [trashType, setTrashType] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    category: string;
    nextDate: string;
    reasoning?: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [lastSubmitted, setLastSubmitted] = useState<{ address: string; trashType: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !trashType) return;
    
    const prefectures = [
      "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
      "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
      "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
      "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
      "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
      "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
      "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
    ];

    if (!prefectures.some(pref => address.includes(pref))) {
      setError("都道府県名（東京都、大阪府など）から入力してください。");
      return;
    }
    
    setLastSubmitted({ address, trashType });
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch("/api/trash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, trashType }),
      });

      if (!response.ok) {
        throw new Error("API Route Error");
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      setResult(data);
    } catch (err: any) {
      setError(err.message || "お調べ中にエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  const isSameAsLast = lastSubmitted?.address === address && lastSubmitted?.trashType === trashType;

  return (
    <MainLayout>
      <HeroSection />
      
      <SearchForm 
        address={address}
        setAddress={setAddress}
        trashType={trashType}
        setTrashType={setTrashType}
        onSubmit={handleSubmit}
        loading={loading}
        disabled={loading || !address || !trashType || isSameAsLast}
      />

      <ErrorCard message={error} />
      
      <ResultSection result={result} loading={loading} />
    </MainLayout>
  );
}
