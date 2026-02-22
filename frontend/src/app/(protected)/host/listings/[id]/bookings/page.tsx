"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BookingService, Booking } from "@/services/booking.service";
import { RoomService, Room } from "@/services/room.service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserCircle2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getStayStatus = (booking: Booking) => {
  if (booking.status === 'CANCELED') {
    return { label: 'Đã hủy', color: 'bg-red-100 text-red-700' };
  }
  
  const now = new Date();
  const start = new Date(booking.fromDate);
  const end = new Date(booking.toDate);
  
  // Set times to midnight to ensure clean day comparisons
  start.setHours(0,0,0,0);
  end.setHours(23,59,59,999);
  
  if (now < start) {
    return { label: 'Sắp tới', color: 'bg-blue-100 text-blue-700' };
  } else if (now > end) {
    return { label: 'Đã trả phòng', color: 'bg-gray-100 text-gray-700' };
  } else {
    return { label: 'Đang lưu trú', color: 'bg-green-100 text-green-700' };
  }
};

export default function HostRoomBookingsPage() {
  const params = useParams();
  const roomId = params?.id as string;
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    const fetchData = async () => {
      try {
        const [roomData, bookingsData] = await Promise.all([
          RoomService.getRoomById(roomId),
          BookingService.getRoomBookings(roomId),
        ]);
        setRoom(roomData);
        setBookings(bookingsData);
      } catch (error) {
        console.error("Lỗi tải thông tin:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roomId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold">Không tìm thấy phòng</h1>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/host/listings")}>
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-10 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Lịch sử đặt phòng</h1>
          <p className="text-muted-foreground mt-1">
            Cho căn hộ: <span className="font-semibold text-foreground">{room.name}</span>
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách khách thuê</CardTitle>
          <CardDescription>
            {bookings.length} lượt khách đã hoặc đang đặt căn hộ này.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                <tr>
                  <th className="py-3 px-4">Khách hàng</th>
                  <th className="py-3 px-4">Nhận phòng</th>
                  <th className="py-3 px-4">Trả phòng</th>
                  <th className="py-3 px-4">Thanh toán</th>
                  <th className="py-3 px-4">Lưu trú</th>
                  <th className="py-3 px-4 text-right">Tổng tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y relative">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-muted-foreground">
                      Chưa có ai đặt phòng này.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-muted/10 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 border">
                            <AvatarImage src={booking.user?.avatar || "/default-avatar.png"} />
                            <AvatarFallback>
                              <UserCircle2 className="w-6 h-6 text-muted-foreground" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {booking.user?.firstName && booking.user?.lastName 
                                ? `${booking.user.firstName} ${booking.user.lastName}` 
                                : 'Khách hàng'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {booking.user?.email || `ID: ${booking.userId.substring(0,8)}...`}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {format(new Date(booking.fromDate), "dd/MM/yyyy")}
                      </td>
                      <td className="py-3 px-4">
                        {format(new Date(booking.toDate), "dd/MM/yyyy")}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                            ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 
                              booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 
                              booking.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' : 
                              'bg-red-100 text-red-700'}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {(() => {
                          const stay = getStayStatus(booking);
                          return (
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stay.color}`}>
                              {stay.label}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {formatCurrency(booking.totalPrice)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
