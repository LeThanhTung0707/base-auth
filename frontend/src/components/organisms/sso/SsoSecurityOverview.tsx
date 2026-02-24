"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Smartphone, RefreshCw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function SsoSecurityOverview() {
  return (
    <Card className="p-6 border-none shadow-xl bg-white overflow-hidden relative">
       {/* Background accent */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full pointer-events-none -z-0" />
       
       <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
             <h3 className="font-extrabold text-gray-900 tracking-tight">Bảo mật tài khoản</h3>
             <Badge className="bg-emerald-500 text-white border-none">AN TOÀN</Badge>
          </div>

          {/* Security Score */}
          <div className="flex flex-col items-center py-4">
             <div className="relative flex items-center justify-center">
                {/* Circular indicator (simplified) */}
                <div className="w-28 h-28 rounded-full border-[8px] border-emerald-100 flex items-center justify-center relative">
                   <div className="absolute inset-0 border-[8px] border-emerald-500 rounded-full border-t-transparent -rotate-45" />
                   <span className="text-3xl font-black text-gray-900">92</span>
                </div>
                <div className="absolute -bottom-2 bg-gray-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">Excellent</div>
             </div>
             <p className="text-[13px] text-gray-500 mt-6 text-center">
                Điểm số bảo mật của bạn ở mức rất tốt. Hãy hoàn thành các đề xuất dưới đây để đạt 100 điểm.
             </p>
          </div>

          {/* Quick Actions / Checklist */}
          <div className="space-y-4">
             <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/50 border border-gray-100 group cursor-pointer hover:bg-white hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                   <Smartphone className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                   <div className="text-[13px] font-bold text-gray-900">Xác thực 2 yếu tố (2FA)</div>
                   <div className="text-[11px] text-emerald-600 font-medium">Đã kích hoạt</div>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
             </div>

             <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/50 border border-gray-100 group cursor-pointer hover:bg-white hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                   <RefreshCw className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                   <div className="text-[13px] font-bold text-gray-900">Mật khẩu (90 ngày)</div>
                   <div className="text-[11px] text-orange-600 font-medium">Cần cập nhật sớm</div>
                </div>
                <AlertCircle className="w-5 h-5 text-orange-400 animate-pulse" />
             </div>
          </div>

          <Button className="w-full bg-gray-900 hover:bg-indigo-600 text-white rounded-2xl font-bold py-6 shadow-lg shadow-gray-200">
             CẤU HÌNH BẢO MẬT
          </Button>
       </div>
    </Card>
  );
}
