"use client";

import { Card } from "@/components/ui/card";
import { ExternalLink, Star } from "lucide-react";

const companies = [
  {
    name: "FPT Software",
    description: "Tập đoàn công nghệ hàng đầu Việt Nam hiện nay.",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop",
    jobs: 142,
    rating: 4.8
  },
  {
    name: "Samsung Vina",
    description: "Môi trường làm việc năng động, chuyên nghiệp toàn cầu.",
    logo: "https://images.unsplash.com/photo-1596753426292-80325d799014?w=100&h=100&fit=crop",
    jobs: 56,
    rating: 4.7
  },
  {
    name: "Techcombank",
    description: "Ngân hàng thương mại cổ phần hàng đầu Việt Nam.",
    logo: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=100&h=100&fit=crop",
    jobs: 89,
    rating: 4.6
  },
  {
    name: "Grab Vietnam",
    description: "Siêu ứng dụng hàng đầu Đông Nam Á hiện nay.",
    logo: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=100&h=100&fit=crop",
    jobs: 34,
    rating: 4.9
  },
  {
    name: "Momo (M-Service)",
    description: "Ví điện tử số 1 Việt Nam với hàng triệu khách hàng.",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cc0d41?w=100&h=100&fit=crop",
    jobs: 28,
    rating: 4.8
  },
  {
    name: "Shopee Vietnam",
    description: "Sàn thương mại điện tử hàng đầu khu vực Việt Nam.",
    logo: "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=100&h=100&fit=crop",
    jobs: 75,
    rating: 4.7
  }
];

export function JobsCompanyGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
       {companies.map((company) => (
         <Card key={company.name} className="p-4 flex flex-col items-center text-center hover:shadow-lg transition-all border-none bg-white group cursor-pointer">
            <div className="w-16 h-16 rounded-2xl p-0.5 border border-gray-100 mb-4 overflow-hidden group-hover:scale-105 transition-transform">
               <img src={company.logo} alt={company.name} className="w-full h-full object-cover rounded-2xl" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors uppercase text-xs tracking-wider">
               {company.name}
            </h3>
            <div className="flex items-center gap-1 text-yellow-500 mb-3">
               <Star className="w-3 h-3 fill-yellow-500" />
               <span className="text-[10px] font-bold">{company.rating}</span>
            </div>
            <p className="text-[10px] text-gray-500 line-clamp-2 mb-4 h-8">
               {company.description}
            </p>
            <div className="mt-auto w-full pt-3 border-t border-gray-50">
               <div className="text-blue-600 font-bold text-xs">
                  {company.jobs} VIỆC LÀM
               </div>
            </div>
         </Card>
       ))}
    </div>
  );
}
