"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CUISINES = [
  { name: "Việt Nam", emoji: "🇻🇳", count: 1240, color: "bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30 hover:border-red-300" },
  { name: "Nhật Bản", emoji: "🇯🇵", count: 380, color: "bg-pink-50 dark:bg-pink-950/20 border-pink-100 dark:border-pink-900/30 hover:border-pink-300" },
  { name: "Hàn Quốc", emoji: "🇰🇷", count: 265, color: "bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30 hover:border-blue-300" },
  { name: "Ý", emoji: "🇮🇹", count: 178, color: "bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30 hover:border-green-300" },
  { name: "Trung Quốc", emoji: "🇨🇳", count: 310, color: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-100 dark:border-yellow-900/30 hover:border-yellow-300" },
  { name: "Ấn Độ", emoji: "🇮🇳", count: 95, color: "bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900/30 hover:border-orange-300" },
  { name: "Thái Lan", emoji: "🇹🇭", count: 140, color: "bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/30 hover:border-purple-300" },
  { name: "Mỹ", emoji: "🇺🇸", count: 220, color: "bg-sky-50 dark:bg-sky-950/20 border-sky-100 dark:border-sky-900/30 hover:border-sky-300" },
];

export function FoodTopCuisines() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Ẩm thực theo quốc gia</h2>
        <p className="text-muted-foreground text-sm mt-1">Khám phá hương vị từ khắp nơi trên thế giới</p>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
        {CUISINES.map((c) => (
          <Card
            key={c.name}
            className={cn(
              "flex flex-col items-center gap-2 p-4 cursor-pointer border transition-all duration-200 hover:scale-105 hover:shadow-md",
              c.color
            )}
          >
            <span className="text-3xl">{c.emoji}</span>
            <span className="text-xs font-semibold text-center leading-tight">{c.name}</span>
            <span className="text-[10px] text-muted-foreground">{c.count.toLocaleString()} quán</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
