"use client";

import { CategoryBar } from "@/components/organisms/CategoryBar";
import { ListingGrid } from "@/components/organisms/ListingGrid";

import { useState } from "react";

export function HomeTemplate() {
  const [activeCategory, setActiveCategory] = useState<string>("");

  return (
    <div className="flex flex-col min-h-screen">
      <CategoryBar 
        activeCategory={activeCategory} 
        onCategorySelect={setActiveCategory} 
      />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ListingGrid category={activeCategory} />
      </main>
    </div>
  );
}
