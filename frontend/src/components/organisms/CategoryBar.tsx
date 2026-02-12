"use client";

import { CategoryItem } from "@/components/molecules/CategoryItem";
import { 
  Umbrella, 
  Tent, 
  Mountain, 
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";


const CATEGORIES = [
  { label: "Beachfront", icon: Umbrella },
  { label: "Cabins", icon: Tent },
  { label: "Trending", icon: Mountain },
  { label: "Lakefront", icon: Waves },
  { label: "City", icon: Building2 },
  { label: "Countryside", icon: TreePine },
  { label: "Boats", icon: Ship },
  { label: "Castles", icon: Castle },
  { label: "Farms", icon: Warehouse },
  { label: "Luxe", icon: Sofa },
  { label: "Tropical", icon: Palmtree },
  { label: "Arctic", icon: Snowflake },
];

export function CategoryBar() {
  const [activeCategory, setActiveCategory] = useState("Beachfront");

  return (
    <div className="w-full border-b bg-background pt-4">
        <div className="container mx-auto px-4">
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-8 pb-2">
                    {CATEGORIES.map((category) => (
                    <CategoryItem
                        key={category.label}
                        icon={category.icon}
                        label={category.label}
                        isActive={activeCategory === category.label}
                        onClick={() => setActiveCategory(category.label)}
                    />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="invisible sm:visible" />
            </ScrollArea>
      </div>
    </div>
  );
}
