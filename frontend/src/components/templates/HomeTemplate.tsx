"use client";

import { CategoryBar } from "@/components/organisms/CategoryBar";
import { ListingGrid } from "@/components/organisms/ListingGrid";

export function HomeTemplate() {
  return (
    <div className="flex flex-col min-h-screen">
      <CategoryBar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ListingGrid />
      </main>
    </div>
  );
}
