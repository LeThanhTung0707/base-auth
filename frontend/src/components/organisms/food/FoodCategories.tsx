"use client";

import { cn } from "@/lib/utils";

interface Category {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

const CATEGORIES: Category[] = [
  { id: "pizza", label: "Pizza", emoji: "🍕", color: "from-orange-400 to-red-400" },
  { id: "pho", label: "Phở", emoji: "🍜", color: "from-amber-400 to-orange-400" },
  { id: "sushi", label: "Sushi", emoji: "🍣", color: "from-pink-400 to-rose-400" },
  { id: "burger", label: "Burger", emoji: "🍔", color: "from-yellow-400 to-amber-400" },
  { id: "salad", label: "Salad", emoji: "🥗", color: "from-green-400 to-emerald-400" },
  { id: "bbq", label: "BBQ", emoji: "🥩", color: "from-red-500 to-rose-500" },
  { id: "banh-mi", label: "Bánh mì", emoji: "🥖", color: "from-yellow-500 to-orange-400" },
  { id: "dessert", label: "Tráng miệng", emoji: "🍰", color: "from-pink-300 to-purple-400" },
  { id: "bubble-tea", label: "Trà sữa", emoji: "🧋", color: "from-purple-400 to-indigo-400" },
  { id: "seafood", label: "Hải sản", emoji: "🦞", color: "from-blue-400 to-cyan-400" },
  { id: "vegan", label: "Chay", emoji: "🌿", color: "from-green-500 to-lime-400" },
  { id: "coffee", label: "Cà phê", emoji: "☕", color: "from-stone-400 to-amber-600" },
];

interface FoodCategoriesProps {
  activeCategory: string | null;
  onSelect: (id: string | null) => void;
}

export function FoodCategories({ activeCategory, onSelect }: FoodCategoriesProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Danh mục món ăn</h2>
          <p className="text-muted-foreground text-sm mt-1">Bạn muốn ăn gì hôm nay?</p>
        </div>
        {activeCategory && (
          <button
            onClick={() => onSelect(null)}
            className="text-sm text-orange-500 hover:text-orange-600 font-medium underline-offset-4 hover:underline transition-colors"
          >
            Xem tất cả
          </button>
        )}
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(activeCategory === cat.id ? null : cat.id)}
            className={cn(
              "flex flex-col items-center gap-2 py-3 px-2 rounded-xl border transition-all duration-200 group hover:scale-105 hover:shadow-md",
              activeCategory === cat.id
                ? "border-orange-400 bg-orange-50 dark:bg-orange-950/30 shadow-md scale-105"
                : "border-border bg-card hover:border-orange-300"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-xl bg-gradient-to-br shadow-sm",
                cat.color
              )}
            >
              {cat.emoji}
            </div>
            <span
              className={cn(
                "text-xs font-medium leading-tight text-center",
                activeCategory === cat.id
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-muted-foreground group-hover:text-foreground"
              )}
            >
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
