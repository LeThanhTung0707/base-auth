"use client";

import { ListingInfo } from "@/components/molecules/ListingInfo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ListingCardProps {
  id: string;
  images: string[];
  location: string;
  distance: string;
  dates: string;
  price: number;
  rating: number;
  ratingCount?: number;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

export function ListingCard({
  id,
  images,
  location,
  distance,
  dates,
  price,
  rating,
  ratingCount,
  isFavorite = false,
  onFavoriteToggle,
}: ListingCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setFavorite(!favorite);
    onFavoriteToggle?.(id);
  };

  return (
    <Card className="border-0 shadow-none group cursor-pointer bg-transparent rounded-none block">
      <div className="relative">
          <Link href={`/rooms/${id}`}>
            <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                {/* Image Carousel Mock - Just showing first image for now */}
                    <Image
                        src={images[0]}
                        alt={`Listing in ${location}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        priority
                    />
                </div>
                <ListingInfo
                    location={location}
                    distance={distance}
                    dates={dates}
                    price={price}
                    rating={rating}
                    ratingCount={ratingCount}
                />
            </CardContent>
          </Link>

          <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 text-white hover:bg-transparent hover:text-white hover:scale-110 active:scale-90 transition-transform z-10"
                onClick={handleFavoriteClick}
            >
                <Heart className={`w-6 h-6 ${favorite ? "fill-red-500 stroke-red-500" : "fill-black/50 stroke-white"}`} />
         </Button>
      </div>
    </Card>
  );
}
