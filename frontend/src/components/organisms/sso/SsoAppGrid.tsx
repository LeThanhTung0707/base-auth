"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSsoStore } from "@/store/useSsoStore";
import { 
  Plus, 
  Settings2, 
  LayoutGrid, 
  Search,
  BedDouble,
  Utensils,
  Briefcase,
  Monitor
} from "lucide-react";

const apps = [
  {
    name: "BaseAuth Stay",
    category: "Booking",
    description: "Nền tảng đặt phòng và lưu trú hàng đầu.",
    icon: BedDouble,
    color: "bg-rose-500",
    status: "Connected",
    url: "/"
  },
  {
    name: "BaseAuth Food",
    category: "Delivery",
    description: "Dịch vụ giao đồ ăn siêu tốc từ các nhà hàng nổi tiếng.",
    icon: Utensils,
    color: "bg-orange-500",
    status: "Connected",
    url: "/food"
  },
  {
    name: "BaseAuth Career",
    category: "HR & Jobs",
    description: "Cơ hội nghề nghiệp và kết nối nhà tuyển dụng.",
    icon: Briefcase,
    color: "bg-blue-600",
    status: "New",
    url: "/jobs"
  },
  {
    name: "Console Admin",
    category: "Developer",
    description: "Quản trị hệ thống và cấu hình API nâng cao.",
    icon: Settings2,
    color: "bg-slate-800",
    status: "Restricted",
    url: "#"
  },
  {
    name: "Analytics Pro",
    category: "Finance",
    description: "Phân tích dữ liệu kinh doanh và báo cáo tài chính.",
    icon: LayoutGrid,
    color: "bg-emerald-600",
    status: "Disconnected",
    url: "#"
  },
  {
    name: "Internal Chat",
    category: "Communication",
    description: "Hệ thống trao đổi nội bộ bảo mật cho doanh nghiệp.",
    icon: Monitor,
    color: "bg-indigo-600",
    status: "Connected",
    url: "#"
  }
];

export function SsoAppGrid() {
  const { searchQuery, setSearchQuery } = useSsoStore();

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
             Ứng dụng liên kết 
             <Badge variant="outline" className="bg-white border-indigo-200 text-indigo-600 rounded-lg">
                {filteredApps.length}
             </Badge>
          </h2>
          <div className="relative w-full sm:w-64">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input 
                placeholder="Tìm nhanh ứng dụng..." 
                className="pl-9 bg-white border-gray-200" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => (
              <Card key={app.name} className="group p-5 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 border-gray-100 bg-white shadow-sm overflow-hidden">
                 <div className="flex gap-4 items-start">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg", app.color)}>
                       <app.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                             {app.name}
                          </h3>
                          {app.status === "Connected" ? (
                             <div className="flex items-center gap-1.5 ">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Active</span>
                             </div>
                          ) : (
                             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{app.status}</span>
                          )}
                       </div>
                       <p className="text-xs text-gray-500 mb-4 line-clamp-1 italic">
                          {app.category}
                       </p>
                       <p className="text-[13px] text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                          {app.description}
                       </p>
                       
                       <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="w-full text-xs font-bold border-gray-200 hover:bg-gray-50 hover:text-indigo-600 rounded-xl" asChild>
                             <a href={app.url}>MỞ TRANG</a>
                          </Button>
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="w-10 p-0 rounded-xl bg-gray-50 border border-gray-100 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                          >
                             <Settings2 className="w-4 h-4" />
                          </Button>
                       </div>
                    </div>
                 </div>
              </Card>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-300" />
               </div>
               <h3 className="text-lg font-bold text-gray-900">Không tìm thấy ứng dụng</h3>
               <p className="text-sm text-gray-500">Thử tìm kiếm với từ khóa khác nhé!</p>
            </div>
          )}

          {/* New App Request Card */}
          <Card className="border-dashed border-2 border-gray-200 bg-transparent flex flex-col items-center justify-center p-6 text-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group cursor-pointer">
             <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center text-gray-400 group-hover:text-indigo-600 mb-3 transition-all">
                <Plus className="w-6 h-6" />
             </div>
             <div className="font-bold text-gray-500 group-hover:text-indigo-700 text-sm">Yêu cầu ứng dụng mới</div>
             <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Request Access</p>
          </Card>
       </div>
    </div>
  );
}
