"use client";

import { useState } from "react";
import { JobsHero } from "@/components/organisms/jobs/JobsHero";
import { JobsCategories } from "@/components/organisms/jobs/JobsCategories";
import { JobsFeaturedListings } from "@/components/organisms/jobs/JobsFeaturedListings";
import { JobsCompanyGrid } from "@/components/organisms/jobs/JobsCompanyGrid";
import { useJobSearchStore } from "@/store/useJobSearchStore";

export function JobsTemplate() {
  const { keyword } = useJobSearchStore();

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f6]">
      {/* Hero Section */}
      <JobsHero />

      <main className="flex-1 space-y-12 pb-20">
        {/* Job Categories */}
        <section className="bg-white border-b">
           <div className="container mx-auto">
              <JobsCategories />
           </div>
        </section>

        {/* Featured Jobs */}
        <section className="container mx-auto px-4">
           <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Việc làm hấp dẫn</h2>
                <p className="text-muted-foreground">Những cơ hội nghề nghiệp tốt nhất dành cho bạn</p>
              </div>
              <button className="text-blue-600 font-semibold hover:underline">Xem tất cả</button>
           </div>
           <JobsFeaturedListings />
        </section>

        {/* Top Companies */}
        <section className="container mx-auto px-4">
           <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Top Công ty hàng đầu</h2>
                <p className="text-muted-foreground">Làm việc tại những môi trường chuyên nghiệp nhất</p>
              </div>
              <button className="text-blue-600 font-semibold hover:underline">Khám phá ngay</button>
           </div>
           <JobsCompanyGrid />
        </section>
      </main>
    </div>
  );
}
