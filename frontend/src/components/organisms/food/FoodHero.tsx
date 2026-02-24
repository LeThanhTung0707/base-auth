"use client";

import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useFoodSearchStore } from "@/store/useFoodSearchStore";

export function FoodHero() {
  const { setSearchQuery } = useFoodSearchStore();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-rose-500 to-pink-600 dark:from-orange-700 dark:via-rose-700 dark:to-pink-800">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center gap-6">
        {/* Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm border border-white/30">
          <span className="text-base">🍜</span>
          <span>Hàng nghìn nhà hàng đang chờ bạn</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight max-w-4xl">
          Đặt món ngon,
          <br />
          <span className="text-yellow-300">giao tận nhà</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl">
          Khám phá hàng nghìn nhà hàng, quán ăn và món ăn đường phố tại thành phố của bạn.
        </p>

        {/* Quick tags */}
        <div className="flex flex-wrap justify-center gap-2 text-sm mt-4">
          {["🍕 Pizza", "🍜 Phở", "🍣 Sushi", "🍗 Gà nướng", "🥗 Salad"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag.split(" ").slice(1).join(" "))}
              className="px-4 py-2 rounded-full bg-white/20 text-white border border-white/30 hover:bg-white text-orange-600 font-medium transition-all backdrop-blur-sm hover:scale-105"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
