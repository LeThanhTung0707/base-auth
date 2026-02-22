"use client";

import { useMyBookings, useSubmitReview } from "@/hooks/useBookings";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { useState } from "react";
import { Booking } from "@/services/booking.service";

export default function TripsPage() {
  const { data: bookings = [], isLoading: loading } = useMyBookings();
  const submitReviewMutation = useSubmitReview();
  
  // Review Modal State
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = () => {
    if (!reviewBooking) return;
    submitReviewMutation.mutate({
      roomId: reviewBooking.roomId,
      bookingId: reviewBooking.id,
      rating,
      comment
    }, {
      onSuccess: () => setReviewBooking(null)
    });
  };



  if (loading) {
    return <div className="flex justify-center p-10"><Spinner /></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Chuyến đi của bạn</h2>

      {bookings.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground border rounded-xl">
          Bạn chưa có chuyến đi nào.
        </div>
      ) : (
        <div className="grid gap-6 space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex flex-col md:flex-row gap-6 border rounded-xl p-4 md:p-6 hover:shadow-md transition">
              <div className="w-full md:w-48 h-32 relative rounded-lg overflow-hidden shrink-0 bg-muted">
                {booking.room?.images?.[0] ? (
                  <Image 
                    src={booking.room.images[0]} 
                    alt="Room" 
                    fill 
                    className="object-cover" 
                  />
                ) : null}
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{booking.room?.name || "Phòng đã bị xóa"}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {format(new Date(booking.fromDate), "dd MMM, yyyy", { locale: vi })} – {" "}
                    {format(new Date(booking.toDate), "dd MMM, yyyy", { locale: vi })}
                  </p>
                  <div className="mt-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                    {booking.status}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="font-medium text-lg">
                    {booking.totalPrice.toLocaleString("vi-VN")} ₫
                  </p>

                  {booking.status === "COMPLETED" && !(booking as any).review && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setReviewBooking(booking);
                        setRating(5);
                        setComment("");
                      }}
                    >
                      Đánh giá chỗ nghỉ
                    </Button>
                  )}
                  {booking.status === "COMPLETED" && (booking as any).review && (
                    <span className="text-sm text-green-600 font-medium">Đã đánh giá</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!reviewBooking} onOpenChange={(open) => !open && setReviewBooking(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Đánh giá chuyến đi</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground">Chất lượng phòng như thế nào?</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${rating >= star ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nhận xét của bạn (Không bắt buộc)</label>
              <Textarea 
                placeholder="Chia sẻ trải nghiệm của bạn..."
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                rows={4}
              />
            </div>
            
            <Button onClick={submitReview} disabled={submitReviewMutation.isPending}>
              {submitReviewMutation.isPending ? "Đang gửi..." : "Gửi đánh giá"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
