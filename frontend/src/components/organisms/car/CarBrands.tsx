"use client";

import { cn } from "@/lib/utils";

const brands = [
  { name: "Toyota", logo: "https://www.carlogos.org/car-logos/toyota-logo.png" },
  { name: "Mazda", logo: "https://www.carlogos.org/car-logos/mazda-logo.png" },
  { name: "Honda", logo: "https://www.carlogos.org/car-logos/honda-logo.png" },
  { name: "Hyundai", logo: "https://www.carlogos.org/car-logos/hyundai-logo.png" },
  { name: "Kia", logo: "https://www.carlogos.org/car-logos/kia-logo.png" },
  { name: "Ford", logo: "https://www.carlogos.org/car-logos/ford-logo.png" },
  { name: "Mitsubishi", logo: "https://www.carlogos.org/car-logos/mitsubishi-logo.png" },
  { name: "VinFast", logo: "https://www.carlogos.org/car-logos/vinfast-logo.png" },
  { name: "BMW", logo: "https://www.carlogos.org/car-logos/bmw-logo.png" },
  { name: "Mercedes", logo: "https://www.carlogos.org/car-logos/mercedes-benz-logo.png" },
];

export function CarBrands() {
  return (
    <div className="space-y-6">
       <div className="text-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">ĐỐI TÁC THƯƠNG HIỆU</p>
       </div>
       <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 hover:opacity-100 transition-opacity duration-500">
          {brands.map((brand) => (
            <div key={brand.name} className="h-8 md:h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 cursor-pointer">
               <img 
                 src={brand.logo} 
                 alt={brand.name} 
                 className="h-full w-auto object-contain" 
                 title={brand.name}
               />
            </div>
          ))}
       </div>
    </div>
  );
}
