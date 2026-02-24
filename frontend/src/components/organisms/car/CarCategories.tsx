"use client";

import { cn } from "@/lib/utils";
import { 
  Car, 
  Settings, 
  Zap, 
  Crown, 
  Users, 
  Truck,
  Leaf
} from "lucide-react";
import { useCarSearchStore } from "@/store/useCarSearchStore";

const categories = [
  { name: "Sedan", icon: Car, count: "120+", desc: "Thanh lịch & Tiết kiệm", color: "text-blue-600 bg-blue-50" },
  { name: "SUV", icon: Settings, count: "85+", desc: "Mạnh mẽ & Đa dụng", color: "text-orange-600 bg-orange-50" },
  { name: "Hạng sang", icon: Crown, count: "30+", desc: "Đẳng cấp & Sang trọng", color: "text-purple-600 bg-purple-50" },
  { name: "Xe điện", icon: Leaf, count: "25+", desc: "Bảo vệ môi trường", color: "text-emerald-600 bg-emerald-50" },
  { name: "Xe 7 chỗ", icon: Users, count: "45+", desc: "Thoải mái cho gia đình", color: "text-rose-600 bg-rose-50" },
  { name: "Bán tải", icon: Truck, count: "15+", desc: "Chở hàng & Offroad", color: "text-slate-600 bg-slate-50" },
];

export function CarCategories() {
  const { carType, setCarType } = useCarSearchStore();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
       {categories.map((cat) => (
         <button
           key={cat.name}
           onClick={() => setCarType(cat.name)}
           className={cn(
             "flex flex-col items-center text-center p-6 rounded-3xl transition-all border-2 group",
             carType === cat.name 
               ? "bg-white border-blue-600 shadow-xl shadow-blue-100 ring-4 ring-blue-50" 
               : "bg-white border-gray-100 hover:border-blue-200 hover:bg-blue-50/10 hover:shadow-lg"
           )}
         >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", cat.color)}>
               <cat.icon className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors uppercase tracking-wide">
               {cat.name}
            </h3>
            <p className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-tighter">
               {cat.count} xe sẵn sàng
            </p>
            <div className="text-[11px] text-gray-500 line-clamp-1 italic font-medium">
               {cat.desc}
            </div>
         </button>
       ))}
    </div>
  );
}
