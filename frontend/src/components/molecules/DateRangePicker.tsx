"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  className?: string;
  date?: DateRange;
  onSelect?: (date: DateRange | undefined) => void;
  placeholder?: string;
  variant?: "default" | "compact";
}

export function DateRangePicker({
  className,
  date,
  onSelect,
  placeholder = "Thêm ngày",
  variant = "default",
}: DateRangePickerProps) {
  if (variant === "compact") {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className={cn("text-sm font-semibold cursor-pointer", className)}>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM")} - {format(date.to, "dd/MM")}
                </>
              ) : (
                format(date.from, "dd/MM")
              )
            ) : (
              placeholder
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex-1 px-8 py-3 rounded-full hover:bg-muted relative group flex flex-col justify-center cursor-pointer transition-colors h-full w-full">
            <div className="text-xs font-bold text-foreground">Ngày nhận & trả</div>
            <div className="flex items-center gap-1 text-sm text-blue-600 font-medium whitespace-nowrap mt-0.5">
              <CalendarIcon className="w-3 h-3 shrink-0" />
              <span className="truncate">
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "dd/MM/y")} - {format(date.to, "dd/MM/y")}
                    </>
                  ) : (
                    format(date.from, "dd/MM/y")
                  )
                ) : (
                  placeholder
                )}
              </span>
            </div>
            {/* Divider for general SearchBar layout compatibility */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-border group-hover:hidden" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center" sideOffset={10}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelect}
            numberOfMonths={2}
            className="rounded-3xl border shadow-2xl"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
