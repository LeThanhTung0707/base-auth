import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookingService } from "@/services/booking.service";
import { ReviewService } from "@/services/review.service";
import { toast } from "react-toastify";

export const queryKeys = {
  myBookings: ['my-bookings'] as const,
};

export function useMyBookings() {
  return useQuery({
    queryKey: queryKeys.myBookings,
    queryFn: BookingService.getMyBookings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSubmitReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { roomId: string; bookingId: string; rating: number; comment: string }) => {
      return ReviewService.createReview(data.roomId, data.bookingId, data.rating, data.comment);
    },
    onSuccess: () => {
      toast.success("Đánh giá của bạn đã được gửi!");
      // Invalidate the cache to automatically refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.myBookings });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Lỗi khi gửi đánh giá");
    }
  });
}
