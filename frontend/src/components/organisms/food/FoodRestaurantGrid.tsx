"use client";

import { Star, Clock, Bike, Flame, Leaf, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

const RESTAURANTS = [
  {
    id: "1",
    name: "Pizza 4P's",
    category: "pizza",
    cuisine: "Ý",
    rating: 4.8,
    reviewCount: 3240,
    deliveryTime: "25-35",
    deliveryFee: 15000,
    minOrder: 150000,
    tags: ["Bán chạy", "Nổi tiếng"],
    badges: ["award"],
    priceRange: "$$",
    description: "Pizza phong cách Nhật-Ý thủ công, tươi ngon mỗi ngày.",
    bgGradient: "from-orange-400 to-red-400",
    emoji: "🍕",
  },
  {
    id: "2",
    name: "Phở Hà Nội Gốc",
    category: "pho",
    cuisine: "Việt Nam",
    rating: 4.7,
    reviewCount: 5810,
    deliveryTime: "20-30",
    deliveryFee: 10000,
    minOrder: 80000,
    tags: ["Truyền thống", "Yêu thích"],
    badges: ["flame"],
    priceRange: "$",
    description: "Phở bò truyền thống Hà Nội, nước dùng hầm 12 tiếng.",
    bgGradient: "from-amber-400 to-orange-400",
    emoji: "🍜",
  },
  {
    id: "3",
    name: "Kichi Kichi Sushi",
    category: "sushi",
    cuisine: "Nhật Bản",
    rating: 4.6,
    reviewCount: 2120,
    deliveryTime: "30-45",
    deliveryFee: 20000,
    minOrder: 200000,
    tags: ["Premium", "Fresh"],
    badges: ["leaf"],
    priceRange: "$$$",
    description: "Sushi tươi mỗi ngày, nguyên liệu nhập khẩu trực tiếp.",
    bgGradient: "from-pink-400 to-rose-400",
    emoji: "🍣",
  },
  {
    id: "4",
    name: "The Burgers Vietnam",
    category: "burger",
    cuisine: "Mỹ",
    rating: 4.5,
    reviewCount: 1870,
    deliveryTime: "20-30",
    deliveryFee: 12000,
    minOrder: 120000,
    tags: ["Mới", "Hot"],
    badges: ["flame"],
    priceRange: "$$",
    description: "Smash burger thứ thiệt, patty chảo gang, sauce bí truyền.",
    bgGradient: "from-yellow-400 to-amber-400",
    emoji: "🍔",
  },
  {
    id: "5",
    name: "Gà Nướng Chum Hà Thành",
    category: "bbq",
    cuisine: "Việt Nam",
    rating: 4.9,
    reviewCount: 7210,
    deliveryTime: "35-50",
    deliveryFee: 0,
    minOrder: 100000,
    tags: ["Miễn phí ship", "Số 1"],
    badges: ["award", "flame"],
    priceRange: "$$",
    description: "Gà nướng chum đất nung nguyên con, thấm gia vị đặc trưng.",
    bgGradient: "from-red-500 to-rose-500",
    emoji: "🍗",
  },
  {
    id: "6",
    name: "Green Salad & Bowls",
    category: "salad",
    cuisine: "Mỹ",
    rating: 4.4,
    reviewCount: 890,
    deliveryTime: "15-25",
    deliveryFee: 10000,
    minOrder: 90000,
    tags: ["Healthy", "Vegan ok"],
    badges: ["leaf"],
    priceRange: "$$",
    description: "Salad và protein bowl lành mạnh, siêu tươi ngon.",
    bgGradient: "from-green-400 to-emerald-400",
    emoji: "🥗",
  },
  {
    id: "7",
    name: "Bánh Mì Phượng",
    category: "banh-mi",
    cuisine: "Việt Nam",
    rating: 4.9,
    reviewCount: 12400,
    deliveryTime: "15-20",
    deliveryFee: 8000,
    minOrder: 40000,
    tags: ["Huyền thoại", "Bán chạy"],
    badges: ["award"],
    priceRange: "$",
    description: "Bánh mì nổi tiếng toàn cầu, CNN vinh danh số 1 Hội An.",
    bgGradient: "from-yellow-500 to-orange-400",
    emoji: "🥖",
  },
  {
    id: "8",
    name: "Tiệm Trà Sữa Cô Ba",
    category: "bubble-tea",
    cuisine: "Đài Loan",
    rating: 4.3,
    reviewCount: 4560,
    deliveryTime: "20-30",
    deliveryFee: 10000,
    minOrder: 60000,
    tags: ["Tươi mát", "Trendy"],
    badges: [],
    priceRange: "$",
    description: "Trà sữa trân châu nguyên chất, 50+ topping lựa chọn.",
    bgGradient: "from-purple-400 to-indigo-400",
    emoji: "🧋",
  },
];

const BADGE_ICONS: Record<string, React.ReactNode> = {
  flame: <Flame className="w-3 h-3 fill-orange-400 text-orange-400" />,
  leaf: <Leaf className="w-3 h-3 fill-green-500 text-green-500" />,
  award: <Award className="w-3 h-3 fill-yellow-400 text-yellow-400" />,
};

const SORT_OPTIONS = [
  { id: "popular", label: "Phổ biến" },
  { id: "rating", label: "Đánh giá cao" },
  { id: "delivery", label: "Giao nhanh" },
  { id: "free-ship", label: "Miễn phí ship" },
];

interface FoodRestaurantGridProps {
  searchQuery: string;
  activeCategory: string | null;
}

function formatPrice(price: number) {
  if (price === 0) return "Miễn phí";
  return price.toLocaleString("vi-VN") + "đ";
}

export function FoodRestaurantGrid({ searchQuery, activeCategory }: FoodRestaurantGridProps) {
  const [sortBy, setSortBy] = useState("popular");

  const filtered = useMemo(() => {
    let list = [...RESTAURANTS];
    if (activeCategory) {
      list = list.filter((r) => r.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q)
      );
    }
    if (sortBy === "rating") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "delivery") {
      list = [...list].sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
    } else if (sortBy === "free-ship") {
      list = [...list].sort((a, b) => a.deliveryFee - b.deliveryFee);
    } else {
      list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return list;
  }, [searchQuery, activeCategory, sortBy]);

  return (
    <div>
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Nhà hàng nổi bật</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {filtered.length} nhà hàng phù hợp
          </p>
        </div>
        {/* Sort bar */}
        <div className="flex gap-2 flex-wrap">
          {SORT_OPTIONS.map((opt) => (
            <Button
              key={opt.id}
              size="sm"
              variant={sortBy === opt.id ? "default" : "outline"}
              onClick={() => setSortBy(opt.id)}
              className={cn(
                "rounded-full text-xs",
                sortBy === opt.id && "bg-orange-500 hover:bg-orange-600 border-orange-500"
              )}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <span className="text-6xl">🔍</span>
          <p className="text-xl font-semibold">Không tìm thấy nhà hàng nào</p>
          <p className="text-muted-foreground">Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((r) => (
            <Card
              key={r.id}
              className="overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 group bg-card"
            >
              {/* Thumbnail */}
              <div className={`relative bg-gradient-to-br ${r.bgGradient} h-40 flex items-center justify-center`}>
                <span className="text-7xl drop-shadow-xl group-hover:scale-110 transition-transform duration-300">
                  {r.emoji}
                </span>
                {/* Tag badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {r.tags.slice(0, 1).map((tag) => (
                    <Badge
                      key={tag}
                      className="text-[10px] font-semibold bg-white/90 text-foreground border-0 shadow-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                {/* Free delivery badge */}
                {r.deliveryFee === 0 && (
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white border-0 text-[10px]">
                    <Bike className="w-3 h-3 mr-1" />
                    Free ship
                  </Badge>
                )}
              </div>

              <CardContent className="p-4 space-y-2">
                {/* Name & price range */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm leading-snug line-clamp-1 group-hover:text-orange-500 transition-colors">
                    {r.name}
                  </h3>
                  <span className="text-xs text-muted-foreground shrink-0">{r.priceRange}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground line-clamp-2">{r.description}</p>

                {/* Rating & reviews */}
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold">{r.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({r.reviewCount.toLocaleString()})
                  </span>
                  {/* Badge icons */}
                  <div className="flex gap-1 ml-auto">
                    {r.badges.map((b, i) => (
                      <span key={i} title={b}>{BADGE_ICONS[b]}</span>
                    ))}
                  </div>
                </div>

                {/* Delivery info */}
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {r.deliveryTime} phút
                  </span>
                  <span className="flex items-center gap-1">
                    <Bike className="w-3 h-3" />
                    {formatPrice(r.deliveryFee)}
                  </span>
                  <span>Min: {(r.minOrder / 1000).toFixed(0)}k</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
