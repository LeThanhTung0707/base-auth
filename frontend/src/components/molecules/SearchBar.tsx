"use client";

import { Search } from "lucide-react";


interface SearchBarProps {
  compact?: boolean;
}

export function SearchBar({ compact = false }: SearchBarProps) {
  if (compact) {
    return (
      <div className="flex items-center border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer bg-background py-2 pl-6 pr-2 gap-3 whitespace-nowrap">
          <div className="text-sm font-semibold">Địa điểm bất kỳ</div>
          <div className="h-4 w-[1px] bg-gray-300"></div>
          <div className="text-sm font-semibold">Tuần bất kỳ</div>
          <div className="h-4 w-[1px] bg-gray-300"></div>
          <div className="text-sm text-muted-foreground mr-2">Thêm khách</div>
          <div className="bg-[#FF385C] rounded-full p-2.5 text-white">
             <Search className="w-4 h-4" strokeWidth={3} />
          </div>
      </div>
    );
  }

  return (
    <div className="flex items-center border rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-background h-16 w-full max-w-[850px]">
      {/* Location Section */}
      <div className="flex-1 px-8 py-3 rounded-full hover:bg-muted relative group">
        <div className="text-xs font-bold text-foreground">Địa điểm</div>
        <div className="text-sm text-muted-foreground truncate">
          Tìm kiếm điểm đến
        </div>
        {/* Divider */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-border group-hover:hidden" />
      </div>

      {/* Time Section */}
      <div className="flex-1 px-8 py-3 rounded-full hover:bg-muted relative group">
        <div className="text-xs font-bold text-foreground">Thời gian</div>
        <div className="text-sm text-muted-foreground truncate">
          Thêm ngày
        </div>
        {/* Divider */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-border group-hover:hidden" />
      </div>

      {/* Guests Section */}
      <div className="flex-[1.2] pl-8 pr-2 py-2 rounded-full hover:bg-muted flex items-center justify-between group">
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
