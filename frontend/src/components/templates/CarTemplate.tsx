"use client";

import { CarHero } from "@/components/organisms/car/CarHero";
import { CarCategories } from "@/components/organisms/car/CarCategories";
import { CarFeaturedListings } from "@/components/organisms/car/CarFeaturedListings";
import { CarBrands } from "@/components/organisms/car/CarBrands";

export function CarTemplate() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <CarHero />

      <main className="flex-1 space-y-16 pb-20">
        {/* Car Brands (Logo strip) */}
        <section className="bg-gray-50/50 py-10 border-b">
           <div className="container mx-auto px-4">
              <CarBrands />
           </div>
        </section>

        {/* Car Categories */}
        <section className="container mx-auto px-4">
           <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">Phân loại xe phổ biến</h2>
              <p className="text-muted-foreground mt-1">Tìm chiếc xe phù hợp nhất với nhu cầu di chuyển của bạn</p>
           </div>
           <CarCategories />
        </section>

        {/* Featured Cars */}
        <section className="container mx-auto px-4">
           <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">Xe đang sẵn sàng</h2>
                <p className="text-muted-foreground mt-1">Lựa chọn những mẫu xe đời mới, bảo trì tốt nhất</p>
              </div>
              <button className="text-blue-600 font-semibold hover:underline">Xem tất cả</button>
           </div>
           <CarFeaturedListings />
        </section>

        {/* Why choose us? (Banner) */}
        <section className="container mx-auto px-4">
           <div className="bg-blue-600 rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
              <div className="max-w-2xl relative z-10">
                 <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Trải nghiệm hành trình tuyệt vời cùng Car Service</h2>
                 <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                    Sản phẩm của chúng tôi mang lại sự an tâm tuyệt đối với bảo hiểm trọn gói, hỗ trợ 24/7 và chất lượng xe được kiểm tra nghiêm ngặt.
                 </p>
                 <div className="flex flex-wrap gap-4">
                    <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold border border-white/20">Bảo hiểm 100%</div>
                    <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold border border-white/20">Hỗ trợ 24/7</div>
                    <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold border border-white/20">Giao xe tận nơi</div>
                 </div>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}
