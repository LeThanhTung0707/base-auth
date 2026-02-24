"use client";

import { useState } from "react";
import { FoodHero } from "@/components/organisms/food/FoodHero";
import { FoodCategories } from "@/components/organisms/food/FoodCategories";
import { FoodRestaurantGrid } from "@/components/organisms/food/FoodRestaurantGrid";
import { FoodFlashDeals } from "@/components/organisms/food/FoodFlashDeals";
import { FoodTopCuisines } from "@/components/organisms/food/FoodTopCuisines";

import { useFoodSearchStore } from "@/store/useFoodSearchStore";

export function FoodTemplate() {
  const { searchQuery } = useFoodSearchStore();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <FoodHero />

      <main className="flex-1">
        {/* Food Categories */}
        <section className="container mx-auto px-4 py-8">
          <FoodCategories
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </section>

        {/* Flash Deals */}
        <section className="bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-950/20 dark:to-orange-950/20 py-10">
          <div className="container mx-auto px-4">
            <FoodFlashDeals />
          </div>
        </section>

        {/* Top Cuisines */}
        <section className="container mx-auto px-4 py-10">
          <FoodTopCuisines />
        </section>

        {/* Restaurant Grid */}
        <section className="container mx-auto px-4 pb-16">
          <FoodRestaurantGrid
            searchQuery={searchQuery}
            activeCategory={activeCategory}
          />
        </section>
      </main>
    </div>
  );
}
