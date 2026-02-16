"use client";

import { CategoryItem } from "@/components/molecules/CategoryItem";
import { 
  Umbrella, 
  Tent, 
  Flame, 
  Waves, 
  Building2, 
  TreePine, 
  Ship, 
  Castle, 
  Warehouse, 
  Sofa, 
  Palmtree, 
  Snowflake 
} from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  { label: "Bãi biển", icon: Umbrella },
  { label: "Thành phố", icon: Building2 },
  { label: "Nông thôn", icon: TreePine },
  { label: "Núi", icon: Tent },
  { label: "Đảo", icon: Palmtree },
  { label: "Hoang dã", icon: Flame },
  { label: "Sang trọng", icon: Sofa },
  { label: "Khác", icon: Snowflake },
];

interface CategoryBarProps {
  activeCategory: string;
  onCategorySelect: (category: string) => void;
}

export function CategoryBar({ activeCategory, onCategorySelect }: CategoryBarProps) {
  return (
    <div className="w-full border-b bg-background sticky top-[80px] z-40 pt-4 pb-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar scroll-smooth">
          {CATEGORIES.map((category) => (
            <CategoryItem
              key={category.label}
              icon={category.icon}
              label={category.label}
              isActive={activeCategory === category.label}
              onClick={() => onCategorySelect(category.label)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
