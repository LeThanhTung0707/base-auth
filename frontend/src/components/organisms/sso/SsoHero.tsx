"use client";

import { Zap } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

export function SsoHero() {
  const { user } = useAuthStore();
  const displayName = user ? (user.firstName || user.email.split('@')[0]) : "Thành viên";

  return (
    <section className="relative pt-12 pb-24 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 text-white">
      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 text-xs font-bold mb-6 tracking-wider">
             <Zap className="w-3 h-3 fill-indigo-400 text-indigo-400" />
             CENTRALIZED AUTHENTICATION SYSTEM
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
             Chào mừng trở lại, 
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-fuchsia-300">
                {" "}{displayName}
             </span>
          </h1>
          
          <p className="text-lg text-indigo-100/80 mb-0 max-w-2xl leading-relaxed">
             Quản lý quyền truy cập, bảo mật tài khoản và các ứng dụng liên kết của bạn tại một nơi duy nhất. 
             An toàn, nhanh chóng và tin cậy tuyệt đối.
          </p>
        </div>
      </div>

      {/* Decorative Blur Blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
