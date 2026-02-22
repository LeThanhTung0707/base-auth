"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BookingService } from "@/services/booking.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { formatCurrency } from "@/lib/utils";
import { QrCode, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function FakePaymentPage() {
  const params = useParams();
  const bookingId = params?.id as string;
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // In a real scenario we'd query the booking details to show the amount,
  // but for the fake flow we'll just mock it or assume it's correct.
  // Optionally: fetch booking to get totalPrice. Let's do that for better UX.
  const [amount, setAmount] = useState<number | null>(null);

  useEffect(() => {
    // We could fetch the booking here to display the real amount.
    // For now we will just show a generic "Đang tải thông tin..." if not loaded,
    // or just hardcode a mock amount if API isn't ready.
    const fetchBooking = async () => {
      try {
        // Find from 'myBookings' to get price
        const bookings = await BookingService.getMyBookings();
        const currentBooking = bookings.find(b => b.id === bookingId);
        if (currentBooking) {
          setAmount(currentBooking.totalPrice);
        }
      } catch (e) {
        console.error("Failed to fetch booking", e);
      }
    };
    fetchBooking();
  }, [bookingId]);

  const handleFakePayment = async () => {
    setLoading(true);
    try {
      // Simulate real-world payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      await BookingService.updateBookingStatus(bookingId, "COMPLETED");
      setSuccess(true);
      
      toast.success("Thanh toán thành công! Chuyến đi đã được xác nhận.");
      
      // Give the user a moment to see the success state
      setTimeout(() => {
        router.push("/account/trips");
      }, 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi thanh toán");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container max-w-md mx-auto py-20 flex flex-col items-center text-center space-y-4">
        <CheckCircle2 className="w-20 h-20 text-green-500 animate-bounce" />
        <h1 className="text-2xl font-bold">Thanh toán thành công!</h1>
        <p className="text-muted-foreground">Phòng của bạn đã được đặt. Chúc bạn một chuyến đi vui vẻ.</p>
        <p className="text-sm">Đang chuyển hướng về trang chuyến đi...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-lg mx-auto py-12 flex flex-col justify-center min-h-[80vh]">
      <Card className="w-full border-t-4 border-t-[#A50064] shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-[#A50064] text-white font-bold p-2 px-6 rounded-full inline-block mb-4">
            MoMo
          </div>
          <CardTitle className="text-2xl">Thanh toán hóa đơn</CardTitle>
          <CardDescription>
            Quét mã QR bằng ứng dụng MoMo để hoàn tất thanh toán
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6 flex flex-col items-center">
          <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-300 w-64 h-64 flex flex-col items-center justify-center relative">
            <QrCode className="w-48 h-48 text-gray-800" />
            <div className="absolute inset-x-0 bottom-4 text-center text-sm font-semibold text-[#A50064]">
              {amount ? formatCurrency(amount) : "Đang tính toán..."}
            </div>
          </div>
          
          <div className="w-full space-y-2 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Mã đơn hàng</span>
              <span className="font-mono">{bookingId?.split('-')[0].toUpperCase()}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Nhà cung cấp</span>
              <span className="font-medium">BaseAuth Booking</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 text-[#A50064]">
              <span>Tổng thanh toán</span>
              <span>{amount ? formatCurrency(amount) : "---"}</span>
            </div>
          </div>
          
          <div className="flex items-center text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg w-full">
             <ShieldCheck className="w-4 h-4 mr-2 shrink-0" />
             Giao dịch được mã hoá an toàn
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-3">
          <p className="text-xs text-muted-foreground text-center">
            (Môi trường Test - Vui lòng click nút bên dưới thay vì quét mã thật)
          </p>
          <Button 
            className="w-full bg-[#A50064] hover:bg-[#8A0053] h-12 text-lg" 
            onClick={handleFakePayment}
            disabled={loading || amount === null}
          >
            {loading ? <Spinner className="text-white" /> : "Xác nhận đã thanh toán"}
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => router.back()} disabled={loading}>
            Hủy giao dịch
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
