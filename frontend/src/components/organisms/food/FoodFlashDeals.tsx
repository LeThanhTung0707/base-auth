"use client";

import { Clock, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

const DEALS = [
  {
    id: "1",
    name: "Pizza Margherita cỡ lớn",
    restaurant: "Pizza 4P's",
    originalPrice: 280000,
    salePrice: 168000,
    discount: 40,
    emoji: "🍕",
    bg: "from-orange-500 to-red-500",
    timeLeft: 3600,
  },
  {
    id: "2",
    name: "Bộ sushi 12 miếng",
    restaurant: "Kichi Kichi",
    originalPrice: 320000,
    salePrice: 224000,
    discount: 30,
    emoji: "🍣",
    bg: "from-pink-500 to-rose-500",
    timeLeft: 7200,
  },
  {
    id: "3",
    name: "Combo Phở đặc biệt",
    restaurant: "Phở Hà Nội",
    originalPrice: 95000,
    salePrice: 57000,
    discount: 40,
    emoji: "🍜",
    bg: "from-amber-500 to-orange-500",
    timeLeft: 1800,
  },
  {
    id: "4",
    name: "Smash Burger + khoai tây chiên",
    restaurant: "The Burgers",
    originalPrice: 150000,
    salePrice: 105000,
    discount: 30,
    emoji: "🍔",
    bg: "from-yellow-500 to-amber-500",
    timeLeft: 5400,
  },
];

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

export function FoodFlashDeals() {
  const [timers, setTimers] = useState(DEALS.map((d) => d.timeLeft));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => prev.map((t) => Math.max(0, t - 1)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-4 py-2 rounded-xl shadow-lg">
          <Zap className="w-4 h-4 fill-white" />
          <span className="font-bold text-sm tracking-wide">FLASH DEALS</span>
        </div>
        <p className="text-muted-foreground text-sm">Ưu đãi có thể hết bất cứ lúc nào!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DEALS.map((deal, i) => (
          <Card
            key={deal.id}
            className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 group"
          >
            {/* Top banner */}
            <div className={`relative bg-gradient-to-br ${deal.bg} h-28 flex items-center justify-center`}>
              <span className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                {deal.emoji}
              </span>
              <Badge className="absolute top-2 left-2 bg-white text-rose-600 font-bold shadow text-xs border-0">
                -{deal.discount}%
              </Badge>
            </div>
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold text-sm leading-snug line-clamp-1">{deal.name}</p>
              <p className="text-xs text-muted-foreground">{deal.restaurant}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-rose-500 font-bold">{formatPrice(deal.salePrice)}</span>
                  <span className="text-xs text-muted-foreground line-through ml-2">
                    {formatPrice(deal.originalPrice)}
                  </span>
                </div>
              </div>
              {/* Countdown */}
              <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold">
                <Clock className="w-3 h-3" />
                <span>Còn {formatTime(timers[i])}</span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-rose-400 transition-all duration-1000"
                  style={{ width: `${(timers[i] / deal.timeLeft) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
