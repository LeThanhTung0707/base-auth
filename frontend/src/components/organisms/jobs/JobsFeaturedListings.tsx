"use client";

import { 
  Building2, 
  MapPin, 
  CircleDollarSign, 
  Clock, 
  Flame, 
  Heart,
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const featuredJobs = [
  {
    id: 1,
    title: "Senior Fullstack Developer (Next.js & NestJS)",
    company: "TechHub Global",
    location: "Tp. Hồ Chí Minh",
    salary: "35 - 55 triệu",
    time: "2 giờ trước",
    tags: ["Hybrid", "Thưởng Tết", "Bảo hiểm"],
    image: "https://images.unsplash.com/photo-1549923746-c502d488b3aa?w=100&h=100&fit=crop",
    hot: true
  },
  {
    id: 2,
    title: "Project Manager quốc tế",
    company: "VinGroup",
    location: "Hà Nội",
    salary: "Thỏa thuận",
    time: "5 giờ trước",
    tags: ["Tiếng Anh", "Lương tháng 13", "Team building"],
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    hot: true
  },
  {
    id: 3,
    title: "Chuyên viên Marketing đa kênh",
    company: "Green Solutions",
    location: "Đà Nẵng",
    salary: "15 - 25 triệu",
    time: "1 ngày trước",
    tags: ["Remote", "Linh hoạt"],
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=100&h=100&fit=crop",
    hot: false
  },
  {
    id: 4,
    title: "UI/UX Designer (Product Design)",
    company: "Designers Pro",
    location: "Tp. Hồ Chí Minh",
    salary: "20 - 35 triệu",
    time: "3 giờ trước",
    tags: ["Macbook Pro", "Snack bar"],
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bde3?w=100&h=100&fit=crop",
    hot: false
  },
  {
    id: 5,
    title: "Kế toán tổng hợp",
    company: "E-Commerce Corp",
    location: "Hà Nội",
    salary: "12 - 18 triệu",
    time: "6 giờ trước",
    tags: ["Lương tháng 13", "Bảo hiểm"],
    image: "https://images.unsplash.com/photo-1454165833767-027fffd1623b?w=100&h=100&fit=crop",
    hot: false
  },
  {
    id: 6,
    title: "Nhân viên Kinh doanh (Bất động sản)",
    company: "Luxury Homes",
    location: "Đà Nẵng",
    salary: "10 - 50 triệu",
    time: "12 giờ trước",
    tags: ["Hoa hồng cao", "Đào tạo"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
    hot: true
  }
];

export function JobsFeaturedListings() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {featuredJobs.map((job) => (
         <Card key={job.id} className="group hover:shadow-2xl transition-all duration-300 border-none bg-white overflow-hidden relative">
            {job.hot && (
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1 z-10 shadow-sm">
                 <Flame className="w-3 h-3 fill-white" />
                 HOT
              </div>
            )}
            
            <div className="p-5 flex flex-col h-full">
               <div className="flex gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl border border-gray-100 flex-shrink-0 overflow-hidden bg-gray-50 flex items-center justify-center">
                     <img src={job.image} alt={job.company} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                     <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight mb-1">
                        {job.title}
                     </h3>
                     <p className="text-sm text-gray-600 truncate flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {job.company}
                     </p>
                  </div>
               </div>

               <div className="space-y-2 mb-4 flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                     <MapPin className="w-4 h-4 text-blue-500" />
                     {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-600">
                     <CircleDollarSign className="w-4 h-4" />
                     {job.salary}
                  </div>
               </div>

               <div className="flex flex-wrap gap-2 mb-5">
                  {job.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none font-medium px-2 py-0.5 text-[11px]">
                       {tag}
                    </Badge>
                  ))}
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                     <Clock className="w-3.5 h-3.5" />
                     {job.time}
                  </div>
                  <div className="flex items-center gap-2">
                     <button className="p-2 rounded-full hover:bg-rose-50 hover:text-rose-500 text-gray-400 transition-colors">
                        <Heart className="w-5 h-5" />
                     </button>
                     <Button size="sm" className="bg-gray-900 hover:bg-blue-600 text-white rounded-lg h-8 px-4 font-bold transition-all">
                        Ứng tuyển
                     </Button>
                  </div>
               </div>
            </div>
         </Card>
       ))}
    </div>
  );
}
