"use client";

import { 
  CircleDollarSign, 
  Settings2, 
  MapPin, 
  Fuel, 
  Star,
  Zap,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const featuredCars = [
  {
    id: 1,
    name: "Mazda 6 - 2023",
    type: "Sedan",
    location: "Quận 1, TP. HCM",
    price: "1.2tr",
    rating: 4.9,
    reviews: 124,
    transmission: "Tự động",
    fuel: "Xăng",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
    hot: true,
    promo: "Giảm 15%"
  },
  {
    id: 2,
    name: "Toyota Fortuner Legend",
    type: "SUV",
    location: "Quận 7, TP. HCM",
    price: "1.8tr",
    rating: 4.8,
    reviews: 86,
    transmission: "Tự động",
    fuel: "Dầu",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    hot: false,
    promo: null
  },
  {
    id: 3,
    name: "Mercedes-Benz E300",
    type: "Hạng sang",
    location: "Quận 2, TP. HCM",
    price: "3.5tr",
    rating: 5.0,
    reviews: 42,
    transmission: "Tự động",
    fuel: "Xăng",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    hot: true,
    promo: "Luxury"
  },
  {
    id: 4,
    name: "Tesla Model 3",
    type: "Xe điện",
    location: "Ba Đình, Hà Nội",
    price: "2.5tr",
    rating: 4.9,
    reviews: 28,
    transmission: "Tự động",
    fuel: "Điện",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
    hot: false,
    promo: "Eco-friendly"
  },
  {
    id: 5,
    name: "Mitsubishi Xpander",
    type: "Xe 7 chỗ",
    location: "Cầu Giấy, Hà Nội",
    price: "900k",
    rating: 4.7,
    reviews: 215,
    transmission: "Tự động",
    fuel: "Xăng",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop",
    hot: false,
    promo: "Rẻ nhất"
  },
  {
    id: 6,
    name: "Ford Ranger Wildtrak",
    type: "Bán tải",
    location: "Thanh Khê, Đà Nẵng",
    price: "1.4tr",
    rating: 4.9,
    reviews: 94,
    transmission: "Tự động",
    fuel: "Dầu",
    image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400&h=300&fit=crop",
    hot: true,
    promo: "Outdoor"
  }
];

export function CarFeaturedListings() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {featuredCars.map((car) => (
         <Card key={car.id} className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border-none bg-white overflow-hidden relative rounded-[32px]">
            {/* Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden m-3 rounded-[24px]">
               <img src={car.image} alt={car.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               
               {/* Top Badges */}
               <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {car.hot && (
                    <Badge className="bg-orange-500 text-white border-none shadow-lg animate-pulse">
                       <Zap className="w-3 h-3 mr-1 fill-white" />
                       HÀNG HOT
                    </Badge>
                  )}
                  {car.promo && (
                    <Badge className="bg-blue-600 text-white border-none shadow-lg">
                       {car.promo}
                    </Badge>
                  )}
               </div>

               {/* Heart Button */}
               <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-rose-500 transition-all shadow-xl">
                  <Star className="w-5 h-5" />
               </button>

               {/* Location floating */}
               <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-bold border border-white/10">
                  <MapPin className="w-3 h-3" />
                  {car.location}
               </div>
            </div>
            
            <div className="p-6 pt-2">
               <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest">{car.type}</span>
                  <div className="flex items-center gap-1">
                     <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                     <span className="text-xs font-bold text-gray-900">{car.rating}</span>
                     <span className="text-[10px] text-gray-400">({car.reviews})</span>
                  </div>
               </div>

               <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors truncate">
                  {car.name}
               </h3>

               <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-gray-50 border border-gray-100 transition-colors group-hover:bg-blue-50/50 group-hover:border-blue-100">
                     <Settings2 className="w-4 h-4 text-blue-500" />
                     <span className="text-xs font-bold text-gray-700">{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-gray-50 border border-gray-100 transition-colors group-hover:bg-blue-50/50 group-hover:border-blue-100">
                     <Fuel className="w-4 h-4 text-orange-500" />
                     <span className="text-xs font-bold text-gray-700">{car.fuel}</span>
                  </div>
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Giá thuê lẻ</div>
                    <div className="flex items-baseline gap-1">
                       <span className="text-2xl font-black text-gray-900">{car.price}</span>
                       <span className="text-[11px] font-bold text-gray-400 uppercase">/ ngày</span>
                    </div>
                  </div>
                  <Button className="bg-gray-900 group-hover:bg-blue-600 text-white rounded-2xl px-6 h-12 font-black transition-all shadow-xl shadow-gray-200 group-hover:shadow-blue-200">
                     ĐẶT XE NGAY
                  </Button>
               </div>
            </div>
         </Card>
       ))}
    </div>
  );
}
