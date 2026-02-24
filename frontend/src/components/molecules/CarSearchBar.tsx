"use client";

import { Search, MapPin, Car, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCarSearchStore } from "@/store/useCarSearchStore";
import { LocationPicker } from "./LocationPicker";
import { DateRangePicker } from "./DateRangePicker";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface CarSearchBarProps {
  compact?: boolean;
}

export function CarSearchBar({ compact = false }: CarSearchBarProps) {
  const { location, setLocation, carType, setCarType, startDate, endDate, setStartDate, setEndDate } = useCarSearchStore();

  const handleDateSelect = (range: DateRange | undefined) => {
    setStartDate(range?.from);
    setEndDate(range?.to);
  };

  const dateValue: DateRange = { from: startDate, to: endDate };

  if (compact) {
    return (
      <div className="flex items-center border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer bg-background py-1.5 pl-6 pr-1.5 gap-3 whitespace-nowrap overflow-hidden min-w-[250px] max-w-full">
        <div className="flex items-center gap-2 text-blue-600 shrink-0">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-semibold text-foreground truncate max-w-[100px]">
            {location}
          </span>
        </div>
        <div className="h-4 w-[1px] bg-gray-300 shrink-0"></div>
        <div className="flex items-center gap-2 text-blue-600 shrink-0">
          <DateRangePicker 
            variant="compact" 
            date={dateValue} 
            onSelect={handleDateSelect}
            placeholder="Chọn ngày"
          />
        </div>
        <div className="h-4 w-[1px] bg-gray-300 shrink-0"></div>
        <div className="flex items-center gap-2 text-muted-foreground shrink-0 overflow-hidden">
          <Car className="w-4 h-4" />
          <span className="text-sm truncate max-w-[120px]">{carType}</span>
        </div>
        <div className="bg-blue-600 rounded-full p-2 text-white shrink-0 ml-auto transition-transform hover:scale-105">
          <Search className="w-4 h-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center border rounded-full shadow-lg transition-shadow bg-background h-16 w-full max-w-[850px] overflow-hidden">
      {/* Location Section */}
      <div className="flex-[1.2] h-full">
        <LocationPicker 
           location={location} 
           onSelect={setLocation} 
           variant="default" 
        />
      </div>

      {/* Date Section */}
      <div className="flex-1 h-full">
        <DateRangePicker 
          date={dateValue} 
          onSelect={handleDateSelect} 
        />
      </div>

      {/* Car Type Section */}
      <div className="flex-1 px-6 py-3 rounded-full hover:bg-muted group flex flex-col justify-center cursor-pointer transition-colors h-full border-l border-border">
        <div className="text-xs font-bold text-foreground">Loại xe</div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap mt-0.5">
          <Car className="w-3 h-3 shrink-0" />
          <span className="truncate">{carType}</span>
          <ChevronDown className="w-3 h-3 ml-auto opacity-50" />
        </div>
      </div>

      {/* Button Section */}
      <div className="pr-2 ml-2">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 shrink-0 font-bold shadow-md hover:shadow-lg transition-all"
        >
          TÌM XE
        </Button>
      </div>
    </div>
  );
}
