"use client";

import { cn } from "@/lib/utils";
import { Zap, ShieldCheck, MapPin, Star } from "lucide-react";

export function CarHero() {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-white">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 -skew-x-12 translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 max-w-2xl">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-6 tracking-wide uppercase">
                <Zap className="w-3 h-3 fill-blue-700" />
                Dịch vụ thuê xe chuyên nghiệp
             </div>
             
             <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
                Chinh phục mọi cung đường cùng <span className="text-blue-600 italic">Car Service</span>
             </h1>
             
             <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Tự do khám phá, làm chủ hành trình của bạn. Chúng tôi cung cấp giải pháp thuê xe đa dạng, 
                từ xe tự lái tiết kiệm đến các dòng xe hạng sang đẳng cấp.
             </p>

             <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-2">
                   <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                      <ShieldCheck className="w-5 h-5" />
                   </div>
                   <div className="text-sm font-bold text-gray-800 underline decoration-green-200 decoration-4 underline-offset-4">An tâm tuyệt đối</div>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                      <Star className="w-5 h-5 fill-orange-600" />
                   </div>
                   <div className="text-sm font-bold text-gray-800 underline decoration-orange-200 decoration-4 underline-offset-4">Chất lượng 5 sao</div>
                </div>
             </div>
          </div>
          
          <div className="flex-1 relative w-full max-w-[600px]">
             {/* Main Hero Image Placeholder - Mocking with a stylized box and glow */}
             <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 rounded-[40px] shadow-2xl overflow-hidden border-8 border-white group">
                <img 
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop" 
                  alt="Modern car" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                
                {/* Floating Info card */}
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between border border-white/40 shadow-xl">
                      <div>
                         <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Dòng xe được yêu thích</div>
                         <div className="text-lg font-black text-gray-900">Porsche 911 Carrera</div>
                      </div>
                      <div className="flex flex-col items-end">
                         <div className="text-blue-600 font-black text-xl">2.5tr<span className="text-xs font-bold text-gray-500">/ngày</span></div>
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Background blobs */}
             <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-blue-200/50 rounded-full blur-[60px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
