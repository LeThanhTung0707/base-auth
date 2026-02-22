import { useEffect, useState } from "react";
import { Review, ReviewService } from "@/services/review.service";
import { Star, User as UserIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReviewListProps {
  roomId: string;
  averageRating: number;
  reviewCount: number;
}

export function ReviewList({ roomId, averageRating, reviewCount }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await ReviewService.getRoomReviews(roomId);
        setReviews(data.reviews);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setLoading(false);
      }
    };
    if (roomId) fetchReviews();
  }, [roomId]);

  if (loading) {
    return <div className="py-8 animate-pulse bg-muted h-32 rounded-xl"></div>;
  }

  return (
    <div className="py-8 border-t">
      <div className="flex items-center gap-4 mb-6 relative z-0">
        <Star className="w-6 h-6 fill-primary text-primary" />
        <h2 className="text-2xl font-semibold">
          {reviewCount > 0 ? (
            <>
              {averageRating.toFixed(2)} · {reviewCount} đánh giá
            </>
          ) : (
            "Chưa có đánh giá"
          )}
        </h2>
      </div>

      {reviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {reviews.map((r) => (
            <div key={r.id} className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={r.user?.avatar || "/default-avatar.png"} />
                  <AvatarFallback><UserIcon className="w-6 h-6" /></AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-base">
                    {r.user?.firstName || r.user?.lastName 
                      ? `${r.user.firstName} ${r.user.lastName}`.trim() 
                      : "Khách hàng ẩn danh"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(r.createdAt), "MMMM yyyy", { locale: vi })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < r.rating ? "fill-primary text-primary" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              {r.comment && (
                <p className="text-gray-700 leading-relaxed text-sm">
                  {r.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
