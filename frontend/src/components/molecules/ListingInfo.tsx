import { PriceDisplay } from "@/components/atoms/PriceDisplay";
import { RatingBadge } from "@/components/atoms/RatingBadge";

interface ListingInfoProps {
  location: string;
  distance: string;
  dates: string;
  price: number;
  rating: number;
  ratingCount?: number;
}

export function ListingInfo({ location, distance, dates, price, rating, ratingCount }: ListingInfoProps) {
  return (
    <div className="flex flex-col gap-1 mt-2">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-base truncate pr-2">{location}</h3>
        <RatingBadge rating={rating} count={ratingCount} />
      </div>
      <p className="text-muted-foreground text-sm">{distance}</p>
      <p className="text-muted-foreground text-sm">{dates}</p>
      <div className="mt-1">
        <PriceDisplay price={price} className="text-sm" />
      </div>
    </div>
  );
}
