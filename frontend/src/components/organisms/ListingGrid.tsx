"use client";

import { ListingCard } from "./ListingCard";

/* Mock Data for demonstration */
const MOCK_LISTINGS = Array.from({ length: 12 }).map((_, i) => ({
  id: `listing-${i}`,
  images: [`https://picsum.photos/seed/${i + 100}/400/400`],
  location: `Location ${i + 1}`,
  distance: `${(i + 1) * 105} kilometers away`,
  dates: "Oct 22 - 27",
  price: 150 + i * 25,
  rating: 4.8 + (i % 3) * 0.1,
  ratingCount: 10 + i * 5,
}));

interface ListingGridProps {
    category?: string;
}

export function ListingGrid({ category }: ListingGridProps) {
  // TODO: Fetch data from API based on category
  console.log("Fetching listings for category:", category);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 pb-20">
      {MOCK_LISTINGS.map((listing) => (
        <ListingCard
            key={listing.id}
            {...listing}
        />
      ))}
    </div>
  );
}
