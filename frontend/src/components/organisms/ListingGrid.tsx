"use client";

import { ListingCard } from "./ListingCard";

import { useEffect, useState } from "react";
import { RoomService, Room } from "@/services/room.service";

interface ListingGridProps {
    category?: string;
}

export function ListingGrid({ category }: ListingGridProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const data = await RoomService.getRooms({ category });
        setRooms(data);
      } catch (error) {
        console.error("Failed to fetch rooms", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [category]);
  
  if (loading) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 pb-20">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square bg-muted/20 animate-pulse rounded-xl h-[300px]" />
            ))}
        </div>
    );
  }

  if (rooms.length === 0) {
      return (
          <div className="text-center py-20">
              <p className="text-muted-foreground">No places found in this category.</p>
          </div>
      );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 pb-20">
      {rooms.map((room) => (
        <ListingCard
            key={room.id}
            id={room.id}
            images={room.images && room.images.length > 0 ? room.images : [`https://picsum.photos/seed/${room.id}/400/400`]}
            location={room.name}
            distance={room.description?.substring(0, 30) + "..." || "No description"}
            dates="Available now"
            price={room.price}
            rating={room.averageRating || 0}
            ratingCount={room.reviewCount || 0}
        />
      ))}
    </div>
  );
}
