"use client";

import { useJobSearchStore } from "@/store/useJobSearchStore";
import { TrendingUp, Users, Building2, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function JobsHero() {
  const { setKeyword } = useJobSearchStore();

  const stats = [
    { label: "Việc làm mới", value: "2,500+", icon: TrendingUp, color: "text-green-500" },
    { label: "Ứng viên", value: "1.2M+", icon: Users, color: "text-blue-500" },
    { label: "Công ty", value: "50,000+", icon: Building2, color: "text-orange-500" },
  ];

  return (
    <section className="relative bg-white pt-10 pb-20 overflow-hidden border-b">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6">
             <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
             TÌM VIỆC LÀM TRONG MƠ CỦA BẠN
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Khám phá 
            <span className="text-blue-600"> 100,000+ </span>
            cơ hội nghề nghiệp mới mỗi ngày
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 max-w-2xl">
            Vieclam24h giúp bạn kết nối với những nhà tuyển dụng hàng đầu. 
            Nâng tầm sự nghiệp với hàng ngàn vị trí ứng tuyển từ các tập đoàn lớn đến Startup.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-8 items-center mb-10">
             {stats.map((stat, i) => (
               <div key={i} className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg bg-gray-50", stat.color)}>
                     <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
               </div>
             ))}
          </div>

          {/* Popular searches */}
          <div className="flex items-center gap-3 text-sm">
             <span className="text-gray-500 font-medium">Tìm kiếm phổ biến:</span>
             <div className="flex flex-wrap gap-2">
                {["Kế toán", "Bán hàng", "IT Phần mềm", "Marketing", "Xây dựng"].map((tag) => (
                  <button 
                    key={tag}
                    onClick={() => setKeyword(tag)}
                    className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all font-medium"
                  >
                    {tag}
                  </button>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Floating element decorative */}
      <div className="hidden lg:block absolute bottom-20 right-[15%] animate-bounce duration-[3000ms]">
         <div className="bg-white p-4 rounded-2xl shadow-xl border border-blue-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
               <MousePointer2 className="w-6 h-6" />
            </div>
            <div>
               <div className="text-sm font-bold text-gray-900">Click để ứng tuyển ngay!</div>
               <div className="text-xs text-blue-500 font-medium">10+ người vừa ứng tuyển</div>
            </div>
         </div>
      </div>
    </section>
  );
}


