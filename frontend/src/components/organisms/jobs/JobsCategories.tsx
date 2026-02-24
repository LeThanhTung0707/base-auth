"use client";

import { useJobSearchStore } from "@/store/useJobSearchStore";
import { 
  Code2, 
  Megaphone, 
  DollarSign, 
  ShoppingBag, 
  Paintbrush, 
  Smartphone, 
  Briefcase, 
  HardHat,
  HeartPulse,
  Truck
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { name: "IT Phần mềm", icon: Code2, count: "1,245", color: "bg-blue-50 text-blue-600" },
  { name: "Marketing", icon: Megaphone, count: "850", color: "bg-rose-50 text-rose-600" },
  { name: "Kinh doanh", icon: DollarSign, count: "2,100", color: "bg-green-50 text-green-600" },
  { name: "Bán lẻ", icon: ShoppingBag, count: "1,500", color: "bg-orange-50 text-orange-600" },
  { name: "Thiết kế", icon: Paintbrush, count: "430", color: "bg-purple-50 text-purple-600" },
  { name: "Mobile App", icon: Smartphone, count: "210", color: "bg-indigo-50 text-indigo-600" },
  { name: "Nhân sự", icon: Briefcase, count: "340", color: "bg-cyan-50 text-cyan-600" },
  { name: "Xây dựng", icon: HardHat, count: "670", color: "bg-amber-50 text-amber-600" },
  { name: "Y tế", icon: HeartPulse, count: "180", color: "bg-red-50 text-red-600" },
  { name: "Vận tải", icon: Truck, count: "920", color: "bg-slate-50 text-slate-600" },
];

export function JobsCategories() {
  const { category, setCategory } = useJobSearchStore();

  return (
    <div className="py-10">
      <div className="flex items-center gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setCategory(cat.name)}
            className={cn(
              "flex flex-col items-center gap-3 p-4 rounded-2xl transition-all min-w-[120px] group",
              category === cat.name 
                ? "bg-white shadow-xl ring-2 ring-blue-600" 
                : "bg-transparent hover:bg-white hover:shadow-md"
            )}
          >
            <div className={cn("p-4 rounded-xl transition-transform group-hover:scale-110", cat.color)}>
              <cat.icon className="w-6 h-6" />
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                {cat.name}
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                {cat.count} việc làm
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
