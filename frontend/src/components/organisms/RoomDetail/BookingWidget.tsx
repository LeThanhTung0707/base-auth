"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "react-toastify";

interface BookingWidgetProps {
  price: number;
}

export function BookingWidget({ price }: BookingWidgetProps) {
  const [date, setDate] = useState<DateRange | undefined>();

  const handleBooking = () => {
    toast.info("Tính năng đặt phòng đang được phát triển!");
  };

  return (
    <Card className="shadow-xl border-t-0 md:border md:sticky md:top-24">
      <CardHeader className="pb-4">
        <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">{formatCurrency(price)}</span>
                <span className="text-muted-foreground">/ đêm</span>
            </div>
            <div className="text-sm underline font-medium cursor-pointer">
                124 đánh giá
            </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Date Picker Trigger (Simplified) */}
        <div className="grid grid-cols-2 border rounded-lg overflow-hidden">
            <div className="p-3 border-r hover:bg-gray-50 cursor-pointer">
                <div className="text-[10px] uppercase font-bold text-gray-800">Nhận phòng</div>
                <div className="text-sm text-gray-500">{date?.from ? format(date.from, "dd/MM/yyyy") : "Thêm ngày"}</div>
            </div>
            <div className="p-3 hover:bg-gray-50 cursor-pointer">
                 <div className="text-[10px] uppercase font-bold text-gray-800">Trả phòng</div>
                 <div className="text-sm text-gray-500">{date?.to ? format(date.to, "dd/MM/yyyy") : "Thêm ngày"}</div>
            </div>
        </div>

        <Button size="lg" className="w-full bg-rose-600 hover:bg-rose-700 text-lg" onClick={handleBooking}>
            Đặt phòng
        </Button>

        <div className="text-center text-sm text-muted-foreground">
            Bạn vẫn chưa bị trừ tiền
        </div>

        <div className="space-y-2 pt-2">
             <div className="flex justify-between">
                <span className="underline">{formatCurrency(price)} x 5 đêm</span>
                <span>{formatCurrency(price * 5)}</span>
             </div>
             <div className="flex justify-between">
                <span className="underline">Phí dịch vụ</span>
                <span>{formatCurrency(price * 0.1)}</span>
             </div>
             <hr />
             <div className="flex justify-between font-bold text-lg">
                <span>Tổng trước thuế</span>
                <span>{formatCurrency(price * 5.1)}</span>
             </div>
        </div>
      </CardContent>
    </Card>
  );
}
