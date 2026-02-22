import { Star } from "lucide-react";

interface RatingBadgeProps {
  rating: number;
  count?: number;
  className?: string;
}

export function RatingBadge({ rating, count, className }: RatingBadgeProps) {
  if (!rating || rating === 0) {
    return (
      <div className={`flex items-center gap-1 text-sm ${className}`}>
        <Star className="w-4 h-4 text-black" />
        <span className="font-medium">Mới</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 text-sm ${className}`}>
      <Star className="w-4 h-4 fill-current text-black" />
      <span className="font-medium">{rating.toFixed(2)}</span>
      {count !== undefined && count > 0 && (
        <span className="text-muted-foreground">({count})</span>
      )}
    </div>
  );
}
