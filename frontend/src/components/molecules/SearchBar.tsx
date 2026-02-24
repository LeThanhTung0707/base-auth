"use client";

import { Search } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";
import { LocationPicker } from "./LocationPicker";
import { DateRangePicker } from "./DateRangePicker";
import { DateRange } from "react-day-picker";

interface SearchBarProps {
  compact?: boolean;
}

export function SearchBar({ compact = false }: SearchBarProps) {
  const { location, setLocation, startDate, endDate, setDates } = useSearchStore();

  const handleDateSelect = (range: DateRange | undefined) => {
    setDates(range?.from, range?.to);
  };

  const dateValue: DateRange = { from: startDate, to: endDate };

  if (compact) {
    return (
      <div className="flex items-center border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer bg-background py-2 pl-6 pr-2 gap-3 whitespace-nowrap">
          <div className="text-sm font-semibold truncate max-w-[120px]">{location}</div>
          <div className="h-4 w-[1px] bg-gray-300"></div>
          <div className="text-sm font-semibold">
            <DateRangePicker 
              variant="compact" 
              date={dateValue} 
              onSelect={handleDateSelect} 
              placeholder="Tuần bất kỳ"
            />
          </div>
          <div className="h-4 w-[1px] bg-gray-300"></div>
          <div className="text-sm text-muted-foreground mr-2">Thêm khách</div>
          <div className="bg-[#FF385C] rounded-full p-2.5 text-white">
             <Search className="w-4 h-4" strokeWidth={3} />
          </div>
      </div>
    );
  }

  return (
    <div className="flex items-center border rounded-full shadow-sm hover:shadow-md transition-shadow bg-background h-16 w-full max-w-[850px] overflow-hidden">
      {/* Location Section */}
      <div className="flex-1 h-full">
         <LocationPicker 
            location={location} 
            onSelect={setLocation} 
            variant="default"
         />
      </div>

      {/* Time Section */}
      <div className="flex-1 h-full">
        <DateRangePicker 
          date={dateValue} 
          onSelect={handleDateSelect} 
        />
      </div>

      {/* Guests Section */}
      <div className="flex-[1.2] pl-8 pr-2 py-2 rounded-full hover:bg-muted flex items-center justify-between group cursor-pointer transition-colors border-l border-border h-full">
        <div className="flex flex-col">
          <div className="text-xs font-bold text-foreground">Khách</div>
          <div className="text-sm text-muted-foreground truncate">
            Thêm khách
          </div>
        </div>
        <div className="bg-[#FF385C] rounded-full p-3 text-white flex items-center justify-center shrink-0 hover:bg-[#D90B3E] transition-colors">
          <Search className="w-4 h-4" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}
