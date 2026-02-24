"use client";

import { LogIn, ShieldAlert, Monitor, Smartphone, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const activities = [
  {
    type: "Login",
    app: "Stay Service",
    device: "Chrome on macOS",
    location: "Tp. Hồ Chí Minh, VN",
    time: "4 phút trước",
    status: "Success",
    icon: LogIn,
    color: "text-blue-500 bg-blue-50"
  },
  {
    type: "Alert",
    app: "SSO Admin",
    device: "Unknown Device",
    location: "Unknown Location",
    time: "2 giờ trước",
    status: "Blocked",
    icon: ShieldAlert,
    color: "text-rose-500 bg-rose-50"
  },
  {
    type: "Login",
    app: "Food Service",
    device: "App on iPhone 15",
    location: "Tp. Hồ Chí Minh, VN",
    time: "5 giờ trước",
    status: "Success",
    icon: Smartphone,
    color: "text-indigo-500 bg-indigo-50"
  },
  {
    type: "Login",
    app: "Stay Service",
    device: "Safari on iPad",
    location: "Hà Nội, VN",
    time: "1 ngày trước",
    status: "Success",
    icon: Monitor,
    color: "text-blue-500 bg-blue-50"
  }
];

export function SsoActivityTimeline() {
  return (
    <Card className="p-6 border-none shadow-xl bg-white overflow-hidden">
       <div className="flex items-center justify-between mb-8">
          <h3 className="font-extrabold text-gray-900 tracking-tight">Hoạt động tài khoản</h3>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">7 ngày qua</span>
       </div>

       <div className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
          {activities.map((act, i) => (
            <div key={i} className="relative flex gap-4 pl-10">
               {/* Icon Blob */}
               <div className={cn("absolute left-0 w-10 h-10 rounded-xl flex items-center justify-center z-10 shadow-sm", act.color)}>
                  <act.icon className="w-5 h-5" />
               </div>

               <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                     <h4 className="text-[13px] font-bold text-gray-900 truncate">
                        {act.type === "Alert" ? "Phát hiện truy cập lạ" : `Đăng nhập ${act.app}`}
                     </h4>
                     <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">{act.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                     <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {act.location}
                     </span>
                     <span>•</span>
                     <span>{act.device}</span>
                  </div>
                  {act.status === "Blocked" && (
                     <div className="mt-2 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded inline-block uppercase tracking-wider">
                        Ngăn chặn thành công
                     </div>
                  )}
               </div>
            </div>
          ))}
       </div>

       <button className="w-full mt-10 py-3 text-xs font-bold text-gray-500 hover:text-indigo-600 border-t border-gray-50 hover:bg-gray-50 transition-all rounded-b-2xl">
          XEM TOÀN BỘ NHẬT KÝ
       </button>
    </Card>
  );
}
