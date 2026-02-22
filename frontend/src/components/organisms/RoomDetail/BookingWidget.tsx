"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { BookingService } from "@/services/booking.service";

interface BookingWidgetProps {
  price: number;
  roomId: string;
  averageRating?: number;
  reviewCount?: number;
}

export function BookingWidget({ price, roomId, averageRating = 0, reviewCount = 0 }: BookingWidgetProps) {
  const [date, setDate] = useState<DateRange | undefined>();
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const days = useMemo(() => {
    if (date?.from && date?.to) {
      const diffTime = Math.abs(date.to.getTime() - date.from.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  }, [date]);

  const totalPrice = days > 0 ? (price * days) + (price * 0.1) : 0;

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để đặt phòng!");
      router.push("/login");
      return;
    }

    if (!date?.from || !date?.to) {
      toast.warning("Vui lòng chọn ngày nhận và trả phòng!");
      return;
    }

    setLoading(true);
    try {
      const booking = await BookingService.createBooking({
        roomId,
        fromDate: date.from.toISOString(),
        toDate: date.to.toISOString(),
        totalPrice,
      });
      // Navigate to fake payment page
      router.push(`/book/${booking.id}/payment`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi khi đặt phòng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-xl border-t-0 md:border md:sticky md:top-24">
      <CardHeader className="pb-4">
        <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">{formatCurrency(price)}</span>
                <span className="text-muted-foreground">/ đêm</span>
            </div>
            <div className="text-sm font-medium">
                {reviewCount > 0 ? (
                  <span className="flex items-center gap-1 cursor-pointer">
                    <span className="font-semibold">{averageRating.toFixed(2)}</span>
                    <span className="text-muted-foreground underline">({reviewCount} đánh giá)</span>
                  </span>
                ) : (
                  <span className="text-muted-foreground">Chưa có đánh giá</span>
                )}
            </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Date Picker Trigger (Simplified) */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="grid grid-cols-2 border rounded-lg overflow-hidden cursor-pointer hover:bg-gray-50">
              <div className="p-3 border-r">
                  <div className="text-[10px] uppercase font-bold text-gray-800">Nhận phòng</div>
                  <div className="text-sm text-gray-500">{date?.from ? format(date.from, "dd/MM/yyyy") : "Thêm ngày"}</div>
              </div>
              <div className="p-3">
                   <div className="text-[10px] uppercase font-bold text-gray-800">Trả phòng</div>
                   <div className="text-sm text-gray-500">{date?.to ? format(date.to, "dd/MM/yyyy") : "Thêm ngày"}</div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              disabled={(d: Date) => d < new Date() || d < new Date("1900-01-01")}
            />
          </PopoverContent>
        </Popover>

        <Button size="lg" className="w-full bg-rose-600 hover:bg-rose-700 text-lg" onClick={handleBooking} disabled={loading || days === 0}>
            {loading ? "Đang xử lý..." : "Đặt phòng"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
            Bạn vẫn chưa bị trừ tiền
        </div>

        {days > 0 && (
          <div className="space-y-2 pt-2">
               <div className="flex justify-between">
                  <span className="underline">{formatCurrency(price)} x {days} đêm</span>
                  <span>{formatCurrency(price * days)}</span>
               </div>
               <div className="flex justify-between">
                  <span className="underline">Phí dịch vụ</span>
                  <span>{formatCurrency(price * 0.1)}</span>
               </div>
               <hr />
               <div className="flex justify-between font-bold text-lg">
                  <span>Tổng trước thuế</span>
                  <span>{formatCurrency(totalPrice)}</span>
               </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
