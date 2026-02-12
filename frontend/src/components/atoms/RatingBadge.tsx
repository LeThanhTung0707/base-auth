import { Star } from "lucide-react";

interface RatingBadgeProps {
  rating: number;
  count?: number;
  className?: string;
}

export function RatingBadge({ rating, count, className }: RatingBadgeProps) {
  return (
    <div className={`flex items-center gap-1 text-sm ${className}`}>
      <Star className="w-4 h-4 fill-current text-black" />
      <span className="font-medium">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-muted-foreground">({count})</span>
      )}
    </div>
  );
}
